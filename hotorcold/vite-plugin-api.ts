/**
 * Vite plugin that serves the Hot or Cold API endpoints directly
 * from the dev server, eliminating the need for a separate Python backend.
 *
 * Loads pre-computed sentence transformer embeddings and computes
 * cosine similarity rankings in TypeScript.
 */

import type { Plugin } from 'vite';
import type { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import path from 'path';

const EMBEDDING_DIM = 384; // all-MiniLM-L6-v2 dimension

interface EmbeddingData {
  allWords: string[];
  wordToIndex: Map<string, number>;
  gameWords: string[];
  allEmbeddings: Float32Array;
  gameEmbeddings: Float32Array;
  gameNorms: Float32Array;
}

function loadEmbeddingData(rootDir: string): EmbeddingData {
  // 1. Load word list
  const wordsPath = path.join(rootDir, 'words_50k.json');
  const allWords: string[] = JSON.parse(fs.readFileSync(wordsPath, 'utf-8'));
  const wordToIndex = new Map(allWords.map((w, i) => [w, i]));

  // 2. Load embeddings binary (raw float32 little-endian)
  const binPath = path.join(rootDir, 'embeddings_50k.bin');
  const buffer = fs.readFileSync(binPath);
  const allEmbeddings = new Float32Array(
    buffer.buffer,
    buffer.byteOffset,
    buffer.byteLength / 4
  );

  // 3. Parse game words from wordlist.ts
  const wlPath = path.join(rootDir, 'src', 'utils', 'wordlist.ts');
  const wlContent = fs.readFileSync(wlPath, 'utf-8');
  const matches = wlContent.match(/"([^"]+)"/g) || [];
  const rawGameWords = matches.map(m => m.slice(1, -1));

  // 4. Filter to words that have embeddings
  const gameWords: string[] = [];
  const gameWordIndices: number[] = [];
  for (const word of rawGameWords) {
    const idx = wordToIndex.get(word);
    if (idx !== undefined) {
      gameWords.push(word);
      gameWordIndices.push(idx);
    }
  }

  // 5. Extract game embeddings into contiguous array
  const gameEmbeddings = new Float32Array(gameWords.length * EMBEDDING_DIM);
  for (let i = 0; i < gameWords.length; i++) {
    const srcOffset = gameWordIndices[i] * EMBEDDING_DIM;
    gameEmbeddings.set(
      allEmbeddings.subarray(srcOffset, srcOffset + EMBEDDING_DIM),
      i * EMBEDDING_DIM
    );
  }

  // 6. Pre-compute L2 norms for game word embeddings
  const gameNorms = new Float32Array(gameWords.length);
  for (let i = 0; i < gameWords.length; i++) {
    let sum = 0;
    const offset = i * EMBEDDING_DIM;
    for (let j = 0; j < EMBEDDING_DIM; j++) {
      const v = gameEmbeddings[offset + j];
      sum += v * v;
    }
    gameNorms[i] = Math.sqrt(sum);
  }

  return { allWords, wordToIndex, gameWords, allEmbeddings, gameEmbeddings, gameNorms };
}

function computeRankings(data: EmbeddingData, target: string) {
  const targetLower = target.toLowerCase().trim();
  const targetIdx = data.wordToIndex.get(targetLower);
  if (targetIdx === undefined) return null;

  const targetOffset = targetIdx * EMBEDDING_DIM;

  // Compute target norm
  let targetNormSq = 0;
  for (let j = 0; j < EMBEDDING_DIM; j++) {
    const v = data.allEmbeddings[targetOffset + j];
    targetNormSq += v * v;
  }
  const targetNorm = Math.sqrt(targetNormSq);

  // Compute cosine similarity against all game words
  const results: { word: string; similarity: number; rank: number }[] = [];

  for (let i = 0; i < data.gameWords.length; i++) {
    if (data.gameWords[i].toLowerCase() === targetLower) continue;

    let dot = 0;
    const gameOffset = i * EMBEDDING_DIM;
    for (let j = 0; j < EMBEDDING_DIM; j++) {
      dot += data.gameEmbeddings[gameOffset + j] * data.allEmbeddings[targetOffset + j];
    }

    const similarity = dot / (data.gameNorms[i] * targetNorm + 1e-10);
    results.push({
      word: data.gameWords[i],
      similarity: Math.max(0, similarity),
      rank: 0,
    });
  }

  // Sort by similarity descending
  results.sort((a, b) => b.similarity - a.similarity);

  // Assign ranks
  for (let i = 0; i < results.length; i++) {
    results[i].rank = i + 1;
  }

  return results;
}

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

export default function apiPlugin(): Plugin {
  return {
    name: 'hotorcold-api',
    configureServer(server) {
      const rootDir = path.resolve(__dirname);

      // Check that embedding files exist
      const binPath = path.join(rootDir, 'embeddings_50k.bin');
      const wordsPath = path.join(rootDir, 'words_50k.json');

      if (!fs.existsSync(binPath) || !fs.existsSync(wordsPath)) {
        console.error(
          '\n[hotorcold-api] Missing embedding files! Run the precompute step first:\n' +
          '  python3 precompute_embeddings.py\n'
        );
        // Register middleware that returns an error for API routes
        server.middlewares.use((req, res, next) => {
          if (req.url?.startsWith('/api')) {
            sendJson(res, 503, { error: 'Embeddings not loaded. Run precompute_embeddings.py first.' });
            return;
          }
          next();
        });
        return;
      }

      console.log('[hotorcold-api] Loading pre-computed embeddings...');
      const data = loadEmbeddingData(rootDir);
      console.log(`[hotorcold-api] Loaded ${data.allWords.length} total words, ${data.gameWords.length} game words`);

      server.middlewares.use(async (req, res, next) => {
        // GET /api/health
        if (req.url === '/api/health' && req.method === 'GET') {
          sendJson(res, 200, { status: 'ok', words: data.gameWords.length });
          return;
        }

        // GET /api/random-word
        if (req.url === '/api/random-word' && req.method === 'GET') {
          const word = data.gameWords[Math.floor(Math.random() * data.gameWords.length)];
          sendJson(res, 200, { word });
          return;
        }

        // POST /api/rankings
        if (req.url === '/api/rankings' && req.method === 'POST') {
          try {
            const body = await parseJsonBody(req);
            const target = body?.target;
            if (!target) {
              sendJson(res, 400, { error: 'Missing "target" in request body' });
              return;
            }

            const rankings = computeRankings(data, target);
            if (!rankings) {
              sendJson(res, 400, { error: `Word "${target}" not found in embeddings` });
              return;
            }

            sendJson(res, 200, { target: target.toLowerCase().trim(), rankings });
          } catch (e) {
            sendJson(res, 500, { error: 'Internal server error' });
          }
          return;
        }

        next();
      });
    },
  };
}
