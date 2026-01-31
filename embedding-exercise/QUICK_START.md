# Quick Start Guide

## 1. Start the Server

```bash
python3 word_game.py
```

You should see:
```
Starting Word Similarity Learning Platform...
Loaded 100 words
Created 5 test cases
 * Running on http://127.0.0.1:5000
```

## 2. Open in Browser

Go to: **http://localhost:5000**

## 3. The Exercise

Students implement this function:

```python
def rank_words_by_similarity(target, words):
    """
    Returns: dict with {word: rank} where rank 1 = most similar
    """
    # Student code here
```

## 4. What Students Must Do

1. **Create text embeddings** for each word using `compute_char_vector(word)`
2. **Compute similarity** between each word and target using `cosine_similarity(vec1, vec2)`
3. **Sort by similarity** (highest first)
4. **Return dictionary** with {word: rank}

## 5. See the Correct Answer

View the complete solution with explanations:

```bash
python3 CORRECT_SOLUTION.py
```

Or run the quick test:

```bash
./test_solution.sh
```

## 6. Key Concepts

### What is Text Embedding?

A **text embedding** is a numerical representation of text:

```python
"cat" → {'c': 0.33, 'a': 0.33, 't': 0.33}  # This IS the embedding!
"car" → {'c': 0.33, 'a': 0.33, 'r': 0.33}  # Another embedding!
```

### What is Cosine Similarity?

Measures how similar two embeddings are (0 to 1):

```python
similarity("cat", "car") = 0.67  # High (share 'c', 'a')
similarity("cat", "dog") = 0.0   # Low (no shared letters)
```

### What is the Output?

A dictionary ranking all words from most to least similar:

```python
{
    "cat": 1,      # Most similar (same word!)
    "car": 2,      # Very similar
    "bat": 3,      # Similar
    ...
    "computer": 100  # Least similar
}
```

## 7. Test Cases

The platform tests 5 scenarios:

1. **"cat"** - Short, simple word
2. **"computer"** - Long word
3. **"sunny"** - Word with repeated letters
4. **"pizza"** - Food word
5. **"guitar"** - Music word

## 8. How Grading Works

For each test:
- ✅ **Exact matches**: Words with correct rank
- ✅ **Rank closeness**: How close ranks are on average
- ✅ **Top 10 accuracy**: Top 10 words correct

Pass if: Exact > 50% OR Closeness > 80% OR Top 10 >= 80%

## 9. Getting Hints

Click "Get Hint" in the UI for progressive hints (5 levels):
1. How to create embeddings
2. Computing similarity
3. Storing results
4. Creating the dictionary
5. Complete algorithm

## 10. Example Output

When you submit the correct solution, you'll see:

```
✅ Test 1: Find words similar to 'cat'
   Exact matches: 100.0%
   Top 10 accuracy: 100.0%

   Your Top 5:
   - cat (rank 1)
   - car (rank 2)
   - pasta (rank 3)
   - tablet (rank 4)
   - camera (rank 5)
```

## Files Overview

- **word_game.py** - Flask backend with grading system
- **templates/exercise.html** - CodeHS-style UI
- **CORRECT_SOLUTION.py** - Complete solution with explanations
- **test_solution.sh** - Quick test script
- **README.md** - Full documentation

## Ready to Start?

1. Run: `python3 word_game.py`
2. Open: http://localhost:5000
3. Start coding!

---

**Remember**: The `compute_char_vector()` function creates the **text embedding**! That's the key concept.
