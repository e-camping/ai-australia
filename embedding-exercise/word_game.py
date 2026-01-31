from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from typing import List, Dict, Tuple
import traceback
import sys
from io import StringIO
import math
from collections import Counter

app = Flask(__name__)
CORS(app)

# Try to load sentence transformer model (optional advanced feature)
sentence_model = None
np = None
try:
    import numpy as np_import
    from sentence_transformers import SentenceTransformer
    print("Loading sentence transformer model...")
    sentence_model = SentenceTransformer('all-MiniLM-L6-v2')
    np = np_import
    print("✓ Model loaded! Students can use 'model' and 'np' for advanced embeddings.")
except Exception as e:
    print(f"⚠  Sentence transformers not available (optional): {str(e)[:50]}...")
    print("✓ Character-based embeddings will work fine!")

# Diverse word list - different lengths and categories
WORDS = [
    # Animals
    "cat", "dog", "elephant", "giraffe", "lion", "tiger", "bear", "wolf", "fox", "deer",
    # Food
    "pizza", "burger", "sushi", "pasta", "bread", "cheese", "apple", "banana", "orange", "grape",
    # Colors
    "red", "blue", "green", "yellow", "purple", "orange", "pink", "brown", "black", "white",
    # Weather
    "sunny", "rainy", "cloudy", "windy", "snowy", "stormy", "foggy", "hot", "cold", "warm",
    # Emotions
    "happy", "sad", "angry", "excited", "nervous", "calm", "joyful", "worried", "peaceful", "scared",
    # Technology
    "computer", "phone", "tablet", "laptop", "mouse", "keyboard", "monitor", "printer", "camera", "speaker",
    # Sports
    "soccer", "basketball", "baseball", "football", "tennis", "golf", "hockey", "swimming", "running", "boxing",
    # Music
    "guitar", "piano", "drums", "violin", "trumpet", "flute", "saxophone", "harp", "cello", "clarinet",
    # Nature
    "mountain", "river", "ocean", "forest", "desert", "lake", "valley", "hill", "beach", "island",
    # Transportation
    "car", "bus", "train", "plane", "boat", "bicycle", "motorcycle", "truck", "subway", "helicopter"
]

def compute_char_vector(word: str) -> Dict[str, float]:
    """Create a character frequency vector for a word"""
    counter = Counter(word.lower())
    total = len(word)
    return {char: count / total for char, count in counter.items()}

def cosine_similarity(vec1, vec2) -> float:
    """
    Compute cosine similarity between two vectors.
    Works with both dictionaries and numpy arrays.

    Args:
        vec1: First vector (dict or numpy array)
        vec2: Second vector (dict or numpy array)

    Returns:
        float: Cosine similarity (0 to 1)
    """
    # Check if numpy arrays
    if hasattr(vec1, 'shape') and hasattr(vec2, 'shape'):
        # Numpy array version - for sentence transformer embeddings
        if np is not None:
            dot_product = np.dot(vec1, vec2)
            norm1 = np.linalg.norm(vec1)
            norm2 = np.linalg.norm(vec2)
            if norm1 == 0 or norm2 == 0:
                return 0.0
            return float(dot_product / (norm1 * norm2))
        else:
            # Fallback without numpy
            dot_product = sum(a * b for a, b in zip(vec1, vec2))
            norm1 = math.sqrt(sum(a * a for a in vec1))
            norm2 = math.sqrt(sum(b * b for b in vec2))
            if norm1 == 0 or norm2 == 0:
                return 0.0
            return float(dot_product / (norm1 * norm2))
    else:
        # Dictionary version - for character frequency vectors
        all_chars = set(vec1.keys()) | set(vec2.keys())
        dot_product = sum(vec1.get(char, 0) * vec2.get(char, 0) for char in all_chars)
        mag1 = math.sqrt(sum(v ** 2 for v in vec1.values()))
        mag2 = math.sqrt(sum(v ** 2 for v in vec2.values()))
        if mag1 == 0 or mag2 == 0:
            return 0.0
        return dot_product / (mag1 * mag2)

# Pre-compute correct answers for test cases
TEST_CASES = [
    {"target": "cat", "description": "Find words similar to 'cat'"},
    {"target": "computer", "description": "Find words similar to 'computer'"},
    {"target": "sunny", "description": "Find words similar to 'sunny'"},
    {"target": "pizza", "description": "Find words similar to 'pizza'"},
    {"target": "guitar", "description": "Find words similar to 'guitar'"}
]

def generate_correct_answer(target: str, word_list: List[str]) -> Dict[str, int]:
    """Generate the correct ranking using sentence transformers (semantic similarity)"""
    if sentence_model is None or np is None:
        # Fallback to character-based if sentence transformers not available
        print("Warning: Using character-based similarity for answers (sentence transformers not available)")
        similarities = []
        for word in word_list:
            vec1 = compute_char_vector(word)
            vec2 = compute_char_vector(target)
            sim = cosine_similarity(vec1, vec2)
            similarities.append((word, sim))
    else:
        # Use sentence transformers for SEMANTIC similarity
        # This captures word relationships (e.g., "mouse" + "computer")
        target_embedding = sentence_model.encode([target])[0]

        similarities = []
        for word in word_list:
            word_embedding = sentence_model.encode([word])[0]

            # Compute cosine similarity between semantic embeddings
            sim = np.dot(target_embedding, word_embedding) / (
                np.linalg.norm(target_embedding) * np.linalg.norm(word_embedding)
            )
            similarities.append((word, float(sim)))

    # Sort by similarity (descending)
    similarities.sort(key=lambda x: x[1], reverse=True)

    # Create dictionary with word: rank
    ranking_dict = {}
    for rank, (word, sim) in enumerate(similarities, start=1):
        ranking_dict[word] = rank

    return ranking_dict

# Pre-compute correct answers
for test_case in TEST_CASES:
    test_case['expected_output'] = generate_correct_answer(test_case['target'], WORDS)

@app.route('/')
def index():
    return render_template('exercise.html')

@app.route('/api/get_exercise', methods=['GET'])
def get_exercise():
    """Return the exercise details"""
    return jsonify({
        'words': WORDS,
        'test_cases': [
            {
                'target': tc['target'],
                'description': tc['description']
            } for tc in TEST_CASES
        ],
        'instructions': '''
# Word Similarity Ranking Exercise

## Your Task
Implement semantic word ranking using sentence transformers (neural embeddings)!

## Functions You Must Implement

### 1. compute_embedding(word)
Create a semantic embedding vector for a word using the sentence transformer model.

**Use:** `model.encode([word])[0]` to get the embedding
**Returns:** numpy array (the neural embedding vector)

This captures MEANING, not just characters! "mouse" + "computer" = related!

### 2. rank_words_by_similarity(target, words)
Rank words by SEMANTIC similarity to target using neural embeddings.

**Returns:** Dictionary with {word: rank} where 1 = most similar
**Example:** For "computer": {"mouse": 1, "keyboard": 2, ...}

## Available Tools
- `model` - SentenceTransformer model (USE THIS for embeddings!)
- `np` - numpy for numerical operations
- `math` - mathematical operations
- `Counter` - from collections (if needed)
- `cosine_similarity(vec1, vec2)` - compute similarity between vectors

## Algorithm Steps
1. Get target embedding: `model.encode([target])[0]`
2. For each word, get its embedding: `model.encode([word])[0]`
3. Compute cosine similarity between embeddings using numpy
4. Sort by similarity (highest first)
5. Return dictionary {word: rank}

## Why Sentence Transformers?
- Captures SEMANTIC relationships (meaning)
- "mouse" is similar to "computer" (related concepts)
- "piano" is similar to "guitar" (both musical instruments)
- Much better than character-based similarity!
        '''
    })

@app.route('/api/test_cases', methods=['GET'])
def get_test_cases():
    """Return test case information without answers"""
    return jsonify({
        'test_cases': [
            {
                'target': tc['target'],
                'description': tc['description'],
                'word_count': len(WORDS)
            } for tc in TEST_CASES
        ]
    })

@app.route('/api/submit_solution', methods=['POST'])
def submit_solution():
    """Submit and grade the student's solution"""
    data = request.json
    code = data.get('code', '')

    # Capture stdout first
    old_stdout = sys.stdout
    sys.stdout = output = StringIO()

    # Create a safe namespace for execution
    namespace = {
        'math': math,
        'Counter': Counter,
        'cosine_similarity': cosine_similarity,
        'model': sentence_model,
        'np': np,
    }

    # Check if sentence transformers is available
    if sentence_model is None:
        sys.stdout = old_stdout
        return jsonify({
            'status': 'error',
            'message': 'Sentence transformers model not loaded. Install dependencies: pip install sentence-transformers torch',
            'passed': 0,
            'total': len(TEST_CASES),
            'test_results': []
        }), 400

    try:
        # Execute the student's code
        exec(code, namespace)

        # Check if BOTH required functions exist
        if 'compute_embedding' not in namespace:
            sys.stdout = old_stdout
            return jsonify({
                'status': 'error',
                'message': 'Function "compute_embedding" not found in your code. You must implement this function!',
                'passed': 0,
                'total': len(TEST_CASES),
                'test_results': []
            }), 400

        if 'rank_words_by_similarity' not in namespace:
            sys.stdout = old_stdout
            return jsonify({
                'status': 'error',
                'message': 'Function "rank_words_by_similarity" not found in your code',
                'passed': 0,
                'total': len(TEST_CASES),
                'test_results': []
            }), 400

        student_compute_embedding = namespace['compute_embedding']
        student_func = namespace['rank_words_by_similarity']

        # Add student's compute_embedding to namespace so rank_words_by_similarity can use it
        namespace['compute_embedding'] = student_compute_embedding

        # Run all test cases
        test_results = []
        passed_count = 0

        for i, test_case in enumerate(TEST_CASES):
            target = test_case['target']
            expected = test_case.get('expected_output')
            if expected is None:
                raise ValueError(f"No expected_output for test case {i+1}: {target}")

            try:
                # Run student's function
                student_result = student_func(target, WORDS.copy())

                # Validate output type
                if not isinstance(student_result, dict):
                    test_results.append({
                        'test_number': i + 1,
                        'target': target,
                        'description': test_case['description'],
                        'passed': False,
                        'error': f'Expected a dictionary, got {type(student_result).__name__}',
                        'expected_length': len(expected),
                        'actual_length': 0
                    })
                    continue

                # Check if all words are present
                if len(student_result) != len(expected):
                    test_results.append({
                        'test_number': i + 1,
                        'target': target,
                        'description': test_case['description'],
                        'passed': False,
                        'error': f'Expected {len(expected)} words in dictionary, got {len(student_result)}',
                        'expected_length': len(expected),
                        'actual_length': len(student_result)
                    })
                    continue

                # Check if all words from WORDS are in the result
                missing_words = set(WORDS) - set(student_result.keys())
                if missing_words:
                    test_results.append({
                        'test_number': i + 1,
                        'target': target,
                        'description': test_case['description'],
                        'passed': False,
                        'error': f'Missing {len(missing_words)} words from dictionary. Example: {list(missing_words)[:3]}',
                        'expected_length': len(expected),
                        'actual_length': len(student_result)
                    })
                    continue

                # Calculate ranking accuracy
                # Count how many words have the exact correct rank
                exact_matches = sum(1 for word in WORDS if student_result.get(word) == expected.get(word))
                exact_accuracy = exact_matches / len(WORDS)

                # Calculate how close ranks are on average
                rank_differences = []
                for word in WORDS:
                    student_rank = student_result.get(word, 999)
                    expected_rank = expected.get(word, 999)
                    rank_differences.append(abs(student_rank - expected_rank))

                avg_rank_diff = sum(rank_differences) / len(rank_differences)
                rank_closeness = max(0, 1 - (avg_rank_diff / 50))  # 50 positions off = 0% closeness

                # Check top 10
                student_top_10 = sorted(student_result.items(), key=lambda x: x[1])[:10]
                student_top_10_words = set([word for word, rank in student_top_10])

                expected_top_10 = sorted(expected.items(), key=lambda x: x[1])[:10]
                expected_top_10_words = set([word for word, rank in expected_top_10])

                top_10_overlap = len(student_top_10_words & expected_top_10_words)
                top_10_accuracy = top_10_overlap / 10

                # Pass if very close on ranks OR top 10 is mostly correct
                passed = exact_accuracy > 0.5 or rank_closeness > 0.8 or top_10_accuracy >= 0.8

                if passed:
                    passed_count += 1

                # Get top 5 words for display
                student_top_5 = sorted(student_result.items(), key=lambda x: x[1])[:5]
                expected_top_5 = sorted(expected.items(), key=lambda x: x[1])[:5]

                test_results.append({
                    'test_number': i + 1,
                    'target': target,
                    'description': test_case['description'],
                    'passed': passed,
                    'exact_accuracy': round(exact_accuracy * 100, 1),
                    'rank_closeness': round(rank_closeness * 100, 1),
                    'top_10_accuracy': round(top_10_accuracy * 100, 1),
                    'avg_rank_diff': round(avg_rank_diff, 1),
                    'your_top_5': [f"{word} (rank {rank})" for word, rank in student_top_5],
                    'expected_top_5': [f"{word} (rank {rank})" for word, rank in expected_top_5],
                    'expected_length': len(expected),
                    'actual_length': len(student_result)
                })

            except Exception as e:
                test_results.append({
                    'test_number': i + 1,
                    'target': target,
                    'description': test_case['description'],
                    'passed': False,
                    'error': f'Runtime error: {str(e)}',
                    'traceback': traceback.format_exc()
                })

        sys.stdout = old_stdout
        console_output = output.getvalue()

        # Determine overall status
        all_passed = passed_count == len(TEST_CASES)
        status = 'success' if all_passed else 'partial'

        return jsonify({
            'status': status,
            'passed': passed_count,
            'total': len(TEST_CASES),
            'test_results': test_results,
            'console_output': console_output,
            'message': f'✓ Passed {passed_count}/{len(TEST_CASES)} test cases' if passed_count > 0 else 'No tests passed. Check your implementation.'
        })

    except SyntaxError as e:
        sys.stdout = old_stdout
        return jsonify({
            'status': 'error',
            'message': f'Syntax Error: {str(e)}',
            'traceback': traceback.format_exc(),
            'passed': 0,
            'total': len(TEST_CASES),
            'test_results': []
        }), 400

    except Exception as e:
        sys.stdout = old_stdout
        return jsonify({
            'status': 'error',
            'message': f'Error: {str(e)}',
            'traceback': traceback.format_exc(),
            'passed': 0,
            'total': len(TEST_CASES),
            'test_results': []
        }), 400

@app.route('/api/get_hint', methods=['POST'])
def get_hint():
    """Provide hints based on test results"""
    data = request.json
    hint_level = data.get('level', 1)

    hints = {
        1: "Start with compute_embedding(word): Use model.encode([word])[0] to get the neural embedding. This returns a numpy array representing the word's meaning.",
        2: "For compute_embedding: Simply return model.encode([word])[0]. The model does all the work! This creates a semantic embedding that captures word meaning and relationships.",
        3: "For rank_words_by_similarity: Get target embedding first. Then loop through each word, get its embedding, and compute cosine similarity using numpy: np.dot(emb1, emb2) / (np.linalg.norm(emb1) * np.linalg.norm(emb2))",
        4: "Store (word, similarity) tuples, then sort by similarity descending: similarities.sort(key=lambda x: x[1], reverse=True). Use enumerate(similarities, start=1) to assign ranks.",
        5: "Complete solution:\n\ndef compute_embedding(word):\n    return model.encode([word])[0]\n\ndef rank_words_by_similarity(target, words):\n    target_emb = compute_embedding(target)\n    similarities = []\n    for word in words:\n        word_emb = compute_embedding(word)\n        sim = np.dot(target_emb, word_emb) / (np.linalg.norm(target_emb) * np.linalg.norm(word_emb))\n        similarities.append((word, sim))\n    similarities.sort(key=lambda x: x[1], reverse=True)\n    return {word: rank for rank, (word, sim) in enumerate(similarities, 1)}"
    }

    return jsonify({
        'hint': hints.get(hint_level, hints[5])
    })

if __name__ == '__main__':
    print("Starting Word Similarity Learning Platform...")
    print(f"Loaded {len(WORDS)} words")
    print(f"Created {len(TEST_CASES)} test cases")
    app.run(debug=True, port=5000)
