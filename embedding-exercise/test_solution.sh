#!/bin/bash
# Quick test script for the correct solution using sentence transformers

echo "=========================================="
echo "Testing the Correct Solution"
echo "=========================================="
echo ""

python3 << 'EOF'
import requests

# The correct solution using SENTENCE TRANSFORMERS (semantic embeddings)
correct_solution = '''
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
'''

try:
    response = requests.post('http://127.0.0.1:5000/api/submit_solution',
                            json={'code': correct_solution},
                            headers={'Content-Type': 'application/json'})
    result = response.json()

    print(f"Status: {result['status'].upper()}")
    print(f"Passed: {result['passed']}/{result['total']} tests\n")

    if result['status'] == 'success':
        print("✅ ALL TESTS PASSED!")
        print("\nThis solution correctly implements:")
        print("  1. compute_embedding() - Gets neural embeddings from model")
        print("  2. rank_words_by_similarity() - Ranks by SEMANTIC similarity")
        print("  3. Uses sentence transformers for meaning-based ranking")
        print("\nExample: 'mouse' ranks high for 'computer' (related concepts)")
    else:
        print("❌ Some tests failed")

    print("\n" + "=" * 60)
    for test in result['test_results']:
        status = "✅" if test['passed'] else "❌"
        print(f"\n{status} Test {test['test_number']}: {test['description']}")
        if test.get('exact_accuracy'):
            print(f"   Exact matches: {test['exact_accuracy']}%")
            print(f"   Top 10 accuracy: {test['top_10_accuracy']}%")
        if test.get('your_top_5'):
            print(f"   Top 5 words: {', '.join([w.split(' ')[0] for w in test['your_top_5']])}")

except Exception as e:
    print(f"❌ Error: {e}")
    print("\nMake sure:")
    print("  1. Flask server is running: python3 word_game.py")
    print("  2. Dependencies installed: pip install -r requirements.txt")
    print("  3. Sentence transformers model loaded successfully")

EOF
