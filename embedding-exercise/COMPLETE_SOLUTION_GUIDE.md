# Complete Solution Guide - Semantic Word Ranking

## The Correct Solution (Sentence Transformers)

Here's the complete, correct code using **sentence transformers** for semantic similarity:

```python
import numpy as np

def compute_embedding(word):
    """Get semantic embedding using sentence transformers"""
    return model.encode([word])[0]

def rank_words_by_similarity(target, words):
    """Rank words by SEMANTIC similarity using neural embeddings"""
    target_emb = compute_embedding(target)
    similarities = []

    for word in words:
        word_emb = compute_embedding(word)
        # Compute cosine similarity
        sim = np.dot(target_emb, word_emb) / (
            np.linalg.norm(target_emb) * np.linalg.norm(word_emb)
        )
        similarities.append((word, sim))

    similarities.sort(key=lambda x: x[1], reverse=True)

    ranking_dict = {}
    for rank, (word, similarity) in enumerate(similarities, start=1):
        ranking_dict[word] = rank

    return ranking_dict
```

## Why Sentence Transformers?

### SEMANTIC Similarity (What We Want)

With sentence transformers, we capture **word relationships**:

```
Target: "computer"

Top Rankings:
1. "mouse" - computer peripheral (RELATED!)
2. "keyboard" - computer peripheral (RELATED!)
3. "monitor" - computer peripheral (RELATED!)
...
99. "pizza" - completely unrelated
100. "happy" - completely unrelated
```

### CHARACTER Similarity (What We DON'T Want)

With character-based similarity, we only match letters:

```
Target: "computer"

Top Rankings:
1. "computer" - exact match
2. "commuter" - shares many letters (NOT RELATED!)
3. "trumpet" - shares "ump", "t", "r" (NOT RELATED!)
...
Mouse ranks LOW because it shares NO characters!
```

## The Key Difference

| Aspect | Character Similarity | Semantic Similarity |
|--------|---------------------|---------------------|
| **"mouse" + "computer"** | 0.0 (no shared chars) | 0.65 (highly related!) |
| **"commuter" + "computer"** | 0.8 (many shared chars) | 0.15 (not related) |
| **What it captures** | Letter overlap | MEANING & relationships |
| **Use case** | Spelling correction | Search, recommendations, NLP |

## Test Case Example: "computer"

### Expected Results (Semantic):

```python
{
    "mouse": 1,      # Computer peripheral
    "keyboard": 2,   # Computer peripheral
    "monitor": 3,    # Computer peripheral
    "laptop": 4,     # Type of computer
    "phone": 5,      # Electronic device
    "tablet": 6,     # Electronic device
    ...
    "pizza": 95,     # Unrelated
    "sunny": 96,     # Unrelated
    "happy": 97      # Unrelated
}
```

## What Students Must Implement

### Function 1: compute_embedding(word)

```python
def compute_embedding(word):
    """
    Get semantic embedding from sentence transformer model.

    Args:
        word (str): Word to embed

    Returns:
        numpy array: 384-dimensional semantic vector

    Usage:
        model.encode([word])[0]
    """
    return model.encode([word])[0]
```

**What this does:**
- Uses a pre-trained neural network
- Converts word → 384-dimensional vector
- Vector captures MEANING, not just characters
- Similar words have similar vectors

### Function 2: rank_words_by_similarity(target, words)

```python
def rank_words_by_similarity(target, words):
    """
    Rank words by semantic similarity to target.

    Args:
        target (str): Target word
        words (list): Words to rank

    Returns:
        dict: {word: rank} where 1 = most similar
    """
    target_emb = compute_embedding(target)
    similarities = []

    for word in words:
        word_emb = compute_embedding(word)

        # Compute cosine similarity
        sim = np.dot(target_emb, word_emb) / (
            np.linalg.norm(target_emb) * np.linalg.norm(word_emb)
        )

        similarities.append((word, sim))

    # Sort by similarity (highest first)
    similarities.sort(key=lambda x: x[1], reverse=True)

    # Assign ranks
    ranking_dict = {}
    for rank, (word, similarity) in enumerate(similarities, start=1):
        ranking_dict[word] = rank

    return ranking_dict
```

## Available Tools

Students have access to:
- **`model`** - SentenceTransformer('all-MiniLM-L6-v2')
- **`np`** - numpy for numerical operations
- **`math`** - math operations
- **`Counter`** - from collections
- **`cosine_similarity()`** - helper function (optional)

## Step-by-Step Algorithm

1. **Import numpy**: `import numpy as np`

2. **Implement compute_embedding**:
   ```python
   return model.encode([word])[0]
   ```

3. **Get target embedding**:
   ```python
   target_emb = compute_embedding(target)
   ```

4. **Loop through words** and compute similarities:
   ```python
   for word in words:
       word_emb = compute_embedding(word)
       sim = np.dot(target_emb, word_emb) / (
           np.linalg.norm(target_emb) * np.linalg.norm(word_emb)
       )
       similarities.append((word, sim))
   ```

5. **Sort by similarity** (descending):
   ```python
   similarities.sort(key=lambda x: x[1], reverse=True)
   ```

6. **Assign ranks**:
   ```python
   ranking_dict = {}
   for rank, (word, sim) in enumerate(similarities, start=1):
       ranking_dict[word] = rank
   return ranking_dict
   ```

## Testing Your Solution

1. **In browser**: http://localhost:5000
2. **Command line**: `./test_solution.sh`
3. **Demo**: `python3 CORRECT_SOLUTION.py`

## Expected Test Results

All tests should pass with high accuracy:

```
✅ Test 1: Find words similar to 'cat'
   Top 5: dog, tiger, lion, fox, bear (animals!)

✅ Test 2: Find words similar to 'computer'
   Top 5: mouse, keyboard, monitor, laptop, tablet (tech!)

✅ Test 3: Find words similar to 'sunny'
   Top 5: rainy, cloudy, windy, warm, cold (weather!)

✅ Test 4: Find words similar to 'pizza'
   Top 5: pasta, burger, bread, cheese, sushi (food!)

✅ Test 5: Find words similar to 'guitar'
   Top 5: piano, violin, drums, trumpet, flute (instruments!)
```

## Why This Matters

This is **REAL NLP** technology:
- Used in Google Search (find relevant documents)
- Used in recommendation systems (similar products)
- Used in ChatGPT (understand meaning)
- Used in translation (match meanings across languages)

Students learn:
- How neural embeddings work
- Semantic similarity vs character similarity
- Industry-standard NLP techniques
- Working with sentence transformers

## Troubleshooting

### Sentence Transformers Not Loading

If you see:
```
⚠ Sentence transformers not available (optional)
```

The platform will fall back to character-based similarity for grading, but students should still implement the semantic version using `model` and `np`.

### Installing Dependencies

```bash
pip install sentence-transformers torch numpy
```

Note: There may be torch version conflicts. The platform handles this gracefully.

---

**Copy the code above into the editor at http://localhost:5000 and click Submit!**
