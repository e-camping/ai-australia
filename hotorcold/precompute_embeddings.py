"""
Pre-compute sentence transformer embeddings for all 50,000 words
and save them to a numpy file for fast loading by the backend.
"""

import json
import numpy as np
from sentence_transformers import SentenceTransformer

WORD_FILE = "../hotorcold/src/utils/top_english_words_lower_50000.txt"
OUTPUT_WORDS = "words_50k.json"
OUTPUT_EMBEDDINGS = "embeddings_50k.npy"

# Load words from file
print("Loading words...")
with open(WORD_FILE, "r") as f:
    raw = f.read()

# Parse comma-separated quoted words
words = [w.strip().strip('"').strip("'") for w in raw.split(",")]
words = [w for w in words if w]  # remove empties
print(f"Loaded {len(words)} words")

# Load model
print("Loading sentence transformer model (all-MiniLM-L6-v2)...")
model = SentenceTransformer("all-MiniLM-L6-v2")

# Embed all words in batches
print("Computing embeddings (this may take a few minutes)...")
embeddings = model.encode(words, show_progress_bar=True, batch_size=512)

# Save
print(f"Saving {len(words)} words to {OUTPUT_WORDS}")
with open(OUTPUT_WORDS, "w") as f:
    json.dump(words, f)

print(f"Saving embeddings shape {embeddings.shape} to {OUTPUT_EMBEDDINGS}")
np.save(OUTPUT_EMBEDDINGS, embeddings)

# Save raw binary for Node.js/Vite plugin (float32 little-endian)
OUTPUT_BIN = "embeddings_50k.bin"
print(f"Saving raw binary embeddings to {OUTPUT_BIN}")
embeddings.astype(np.float32).tofile(OUTPUT_BIN)

print("Done!")
