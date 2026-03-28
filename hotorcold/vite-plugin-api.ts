/**
 * Vite plugin that starts a Python score server and proxies API requests to it.
 * The Python server computes sentence-transformer embeddings on demand.
 */

import type { Plugin } from 'vite';
import type { IncomingMessage, ServerResponse } from 'http';
import { spawn, ChildProcess } from 'child_process';
import http from 'http';
import path from 'path';

const PYTHON_PORT = 5001;

function parseJsonBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk: Buffer) => { body += chunk; });
    req.on('end', () => {
      try { resolve(JSON.parse(body)); }
      catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

function sendJson(res: ServerResponse, status: number, data: any) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function proxyToPython(method: string, urlPath: string, body?: any): Promise<{ status: number; data: any }> {
  return new Promise((resolve, reject) => {
    const bodyStr = body ? JSON.stringify(body) : '';
    const options: http.RequestOptions = {
      hostname: 'localhost',
      port: PYTHON_PORT,
      path: urlPath,
      method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(bodyStr),
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode || 200, data: JSON.parse(data) });
        } catch {
          reject(new Error('Invalid JSON from Python server'));
        }
      });
    });

    req.on('error', reject);
    if (bodyStr) req.write(bodyStr);
    req.end();
  });
}

export default function apiPlugin(): Plugin {
  let pythonProcess: ChildProcess | null = null;

  return {
    name: 'hotorcold-api',
    configureServer(server) {
      const rootDir = path.resolve(__dirname);
      const scriptPath = path.join(rootDir, 'score_server.py');

      console.log('[hotorcold-api] Starting Python score server...');
      pythonProcess = spawn('uv', ['run', 'python', scriptPath], {
        cwd: rootDir,
        stdio: ['ignore', 'inherit', 'inherit'],
      });

      pythonProcess.on('error', (err) => {
        console.error('[hotorcold-api] Failed to start Python server:', err.message);
      });

      const cleanup = () => { pythonProcess?.kill(); };
      process.on('exit', cleanup);
      process.on('SIGINT', () => { cleanup(); process.exit(); });
      process.on('SIGTERM', () => { cleanup(); process.exit(); });

      server.middlewares.use(async (req, res, next) => {
        // GET /api/health — check if Python server is ready
        if (req.url === '/api/health' && req.method === 'GET') {
          try {
            const result = await proxyToPython('GET', '/health');
            sendJson(res, result.status, result.data);
          } catch {
            sendJson(res, 503, { error: 'Score server not ready yet' });
          }
          return;
        }

        // POST /api/score — compute cosine distance between target and guess
        if (req.url === '/api/score' && req.method === 'POST') {
          try {
            const body = await parseJsonBody(req);
            const { target, guess } = body;
            if (!target || !guess) {
              sendJson(res, 400, { error: 'Missing "target" or "guess" in request body' });
              return;
            }
            const result = await proxyToPython('POST', '/score', { target, guess });
            sendJson(res, result.status, result.data);
          } catch {
            sendJson(res, 503, { error: 'Score server not available' });
          }
          return;
        }

        next();
      });
    },
  };
}
