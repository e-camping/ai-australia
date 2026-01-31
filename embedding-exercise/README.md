# Word Similarity Ranking - CodeHS Style Learning Platform

An interactive coding exercise platform where students learn to implement word similarity ranking using character-based text embeddings. Students write their own code and get instant feedback through an auto-grading system - just like CodeHS!

## Features

- **CodeHS-Style Interface**: Clean, professional layout with instructions panel and code editor
- **Auto-Grading System**: Instant feedback on 5 test cases with detailed results
- **Multiple Test Cases**: Students must handle different target words correctly
- **Detailed Feedback**: See ranking accuracy, expected vs actual results, and error messages
- **Progressive Hints**: 5-level hint system to guide students through the problem
- **Diverse Word List**: 100 words across 10 categories (animals, food, colors, weather, etc.)
- **Real Text Embeddings**: Uses character frequency vectors and cosine similarity

## Installation

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Run the Flask server:
```bash
python3 word_game.py
```

3. Open your browser to:
```
http://localhost:5000
```

## The Exercise

Students must implement a function that:
1. Takes a target word and a list of words
2. Computes character frequency vectors (text embeddings) for each word
3. Calculates cosine similarity between each word and the target
4. Returns a **dictionary** with {word: rank} where rank 1 = most similar

### Function Signature
```python
def rank_words_by_similarity(target, words):
    """
    Rank words by similarity to target word using character embeddings.

    Args:
        target (str): The target word to compare against
        words (list): List of words to rank

    Returns:
        dict: Dictionary mapping each word to its rank
              Example: {"cat": 1, "car": 2, "dog": 3}
              where 1 is most similar to target
    """
    # Student implementation here
```

### Available Helper Functions
- `compute_char_vector(word)`: Returns a dictionary of character frequencies
- `cosine_similarity(vec1, vec2)`: Computes cosine similarity between two vectors (0-1)

## Test Cases

The platform tests student code against 5 different scenarios:
1. Finding words similar to "cat" (short, common word)
2. Finding words similar to "computer" (longer, technology word)
3. Finding words similar to "sunny" (weather word with repeated letters)
4. Finding words similar to "pizza" (food word)
5. Finding words similar to "guitar" (music word)

## Grading Criteria

For each test case, the system evaluates:
- **Exact Rank Matches**: Percentage of words with exactly the correct rank
- **Rank Closeness**: How close the ranks are on average (considers rank differences)
- **Top 10 Accuracy**: Percentage of top 10 words that are in the expected top 10
- **Average Rank Difference**: Average number of positions off

Students pass a test if:
- Exact match accuracy > 50%, OR
- Rank closeness > 80%, OR
- Top 10 accuracy >= 80%

This flexible grading accounts for near-ties in similarity scores.

## Example Solution

```python
def rank_words_by_similarity(target, words):
    """
    Rank words by similarity to target word using character embeddings.
    Returns dictionary with {word: rank}
    """
    similarities = []

    for word in words:
        # Compute character vectors (TEXT EMBEDDINGS)
        target_vec = compute_char_vector(target)
        word_vec = compute_char_vector(word)

        # Compute similarity between embeddings
        sim = cosine_similarity(target_vec, word_vec)

        # Store word with its similarity score
        similarities.append((word, sim))

    # Sort by similarity (highest first)
    similarities.sort(key=lambda x: x[1], reverse=True)

    # Create dictionary with ranks (1 = most similar)
    ranking_dict = {}
    for rank, (word, similarity) in enumerate(similarities, start=1):
        ranking_dict[word] = rank

    return ranking_dict
```

**See [CORRECT_SOLUTION.py](CORRECT_SOLUTION.py) for the complete working solution with detailed explanations!**

## Yes, This Uses TEXT EMBEDDINGS!

**Text embeddings** are numerical representations of text. This exercise uses **character frequency vectors** as embeddings:

1. **Character Frequency Vector (The Embedding)**:
   - For "cat": `{'c': 0.33, 'a': 0.33, 't': 0.33}`
   - For "car": `{'c': 0.33, 'a': 0.33, 'r': 0.33}`
   - This dictionary IS the text embedding!

2. **Cosine Similarity (Distance Metric)**:
   - Measures angle between two embedding vectors
   - Returns 0-1 (1 = identical, 0 = completely different)
   - "cat" vs "car": 0.67 (share 'c' and 'a' in embeddings)
   - "cat" vs "dog": 0.0 (no shared characters in embeddings)

3. **Why This Is Text Embedding**:
   - ✅ Converts text → numerical vectors (embeddings)
   - ✅ Similar words have similar embeddings
   - ✅ Can compute distances between embeddings
   - ✅ Used for ranking/similarity tasks

While more advanced systems use neural networks (Word2Vec, BERT), the **concept is the same**: text → numbers → similarity!

## Educational Value

This exercise teaches:
- **Text embeddings** and vector representations
- **Cosine similarity** and distance metrics
- **Algorithm implementation** with complex data structures
- **Sorting** and list comprehension in Python
- **Working with tuples** and lambda functions

## API Endpoints

- `GET /api/get_exercise` - Get exercise details and instructions
- `POST /api/submit_solution` - Submit code and get grading results
- `POST /api/get_hint` - Get progressive hints (levels 1-5)
- `GET /api/test_cases` - Get test case information

## Testing Your Solution Locally

You can test solutions programmatically:

```python
import requests

code = '''
def rank_words_by_similarity(target, words):
    # Your implementation
    pass
'''

response = requests.post('http://localhost:5000/api/submit_solution',
                        json={'code': code})
result = response.json()
print(f"Passed: {result['passed']}/{result['total']}")
```

## Hint System

The platform provides 5 progressive hints:
1. **Level 1**: How to create character vectors
2. **Level 2**: Computing similarity scores
3. **Level 3**: Storing results as tuples
4. **Level 4**: Sorting and extracting words
5. **Level 5**: Complete algorithm overview

## Technical Details

- **Backend**: Flask REST API (pure Python, no ML dependencies)
- **Frontend**: Vanilla JavaScript with professional CSS
- **Word List**: 100 diverse words across 10 categories
- **Similarity Metric**: Cosine similarity on character frequency vectors
- **Grading**: Flexible accuracy thresholds to account for near-ties

## Sample Test Results

```
Status: success
Passed: 5/5

✓ Test 1: Find words similar to 'cat'
  Ranking Accuracy: 100.0%
  Top 10 Accuracy: 100.0%

✓ Test 2: Find words similar to 'computer'
  Ranking Accuracy: 100.0%
  Top 10 Accuracy: 100.0%

... (3 more tests)
```

## Why CodeHS Style?

This platform mimics CodeHS because:
- Clear separation between instructions and code editor
- Instant auto-grading with detailed feedback
- Professional UI that students recognize
- Progressive hints to guide learning
- Multiple test cases for thorough validation
- Real-world programming exercise

## License

MIT License - Free to use for education!

## Perfect For

- High school computer science classes
- College NLP/ML introductory courses
- Coding bootcamps
- Self-paced learning
- Teaching text similarity concepts
- Python programming practice
