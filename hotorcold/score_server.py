#!/usr/bin/env python3
"""
Embedding score server for Hot or Cold game.
Computes cosine distance between two words using sentence-transformers.
Run via: uv run python score_server.py
"""

import json
from http.server import HTTPServer, BaseHTTPRequestHandler
from sentence_transformers import SentenceTransformer
import numpy as np

print("Loading sentence transformer model...", flush=True)
model = SentenceTransformer('all-MiniLM-L6-v2')
print("Model loaded. Score server ready.", flush=True)


class ScoreHandler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        pass  # suppress default access log

    def send_json(self, status: int, data: dict):
        body = json.dumps(data).encode()
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path == '/health':
            self.send_json(200, {'status': 'ok'})
        else:
            self.send_json(404, {'error': 'Not found'})

    def do_POST(self):
        if self.path == '/score':
            try:
                length = int(self.headers.get('Content-Length', 0))
                body = json.loads(self.rfile.read(length))
                target = str(body['target']).lower().strip()
                guess = str(body['guess']).lower().strip()

                embeddings = model.encode([target, guess])
                t = embeddings[0] / (np.linalg.norm(embeddings[0]) + 1e-10)
                g = embeddings[1] / (np.linalg.norm(embeddings[1]) + 1e-10)
                similarity = float(np.dot(t, g))
                distance = round(max(0.0, 1.0 - similarity), 4)

                print(f'[score] {target!r} vs {guess!r} → distance={distance}', flush=True)
                self.send_json(200, {'distance': distance})
            except Exception as e:
                print(f'[score] ERROR: {e}', flush=True)
                self.send_json(500, {'error': str(e)})
        else:
            self.send_json(404, {'error': 'Not found'})


if __name__ == '__main__':
    port = 5001
    server = HTTPServer(('localhost', port), ScoreHandler)
    print(f"Listening on http://localhost:{port}", flush=True)
    server.serve_forever()
