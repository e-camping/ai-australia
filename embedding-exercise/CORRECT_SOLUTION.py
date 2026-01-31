"""
CORRECT SOLUTION - Semantic Word Ranking with Sentence Transformers

Students must implement BOTH functions:
1. compute_embedding() - Gets neural embedding from sentence transformer
2. rank_words_by_similarity() - Uses embeddings to rank by SEMANTIC similarity

Key Concepts:
1. Semantic Embeddings = Neural network vectors that capture MEANING
2. Related words have similar embeddings ("mouse" + "computer")
3. Cosine Similarity = Measures similarity between embeddings (provided function!)
4. Ranking = Sort by similarity, assign ranks 1, 2, 3, etc.
"""


def compute_embedding(word):
    """
    Create a semantic embedding for a word using sentence transformers.

    This uses a pre-trained neural network to convert the word into
    a high-dimensional vector that captures its MEANING and relationships.

    Args:
        word (str): The word to embed

    Returns:
        numpy array: Semantic embedding vector

    Example:
        compute_embedding("mouse")
        → array([0.234, -0.567, 0.123, ...])  # 384-dimensional vector

    Why it works:
        - Related words have similar vectors
        - "mouse" is close to "computer" (computer peripheral)
        - "piano" is close to "guitar" (musical instruments)
        - Captures meaning, not just characters!
    """
    # Use the sentence transformer model to get semantic embedding
    embedding = model.encode([word])[0]
    return embedding


def rank_words_by_similarity(target, words):
    """
    Rank words by SEMANTIC similarity to target using neural embeddings.

    Args:
        target (str): The target word to compare against
        words (list): List of words to rank

    Returns:
        dict: Dictionary mapping each word to its rank (1 = most similar)

    Example:
        rank_words_by_similarity("computer", ["mouse", "piano", "keyboard"])
        → {"mouse": 1, "keyboard": 2, "piano": 3}

        Note: "mouse" and "keyboard" rank higher because they're
        SEMANTICALLY related to "computer" (peripherals)

    How it works:
        1. Get semantic embedding for target word
        2. For each word, get its semantic embedding
        3. Compute cosine similarity using the provided cosine_similarity() function
        4. Sort words by similarity (highest first)
        5. Assign ranks: 1 for most similar, 2 for second, etc.
        6. Return dictionary {word: rank}
    """
    # Step 1: Get target embedding
    target_emb = compute_embedding(target)

    # Step 2: Compute similarities for all words
    similarities = []

    for word in words:
        # Get semantic embedding for this word
        word_emb = compute_embedding(word)

        # Compute cosine similarity using provided function!
        sim = cosine_similarity(target_emb, word_emb)

        # Store word with its similarity score
        similarities.append((word, float(sim)))

    # Step 3: Sort by similarity (highest similarity first)
    similarities.sort(key=lambda x: x[1], reverse=True)

    # Step 4: Create dictionary with ranks (1 = most similar)
    ranking_dict = {}
    for rank, (word, similarity) in enumerate(similarities, start=1):
        ranking_dict[word] = rank

    # Step 5: Return the dictionary
    return ranking_dict


# ========================================
# ALTERNATIVE: Even More Compact Solution
# ========================================

def compute_embedding_compact(word):
    """Compact version"""
    return model.encode([word])[0]


def rank_words_by_similarity_compact(target, words):
    """Compact version using list comprehension"""
    target_emb = compute_embedding(target)

    # Compute all similarities using provided cosine_similarity function
    similarities = [
        (word, cosine_similarity(target_emb, compute_embedding(word)))
        for word in words
    ]

    # Sort and return dictionary with ranks
    similarities.sort(key=lambda x: x[1], reverse=True)
    return {word: rank for rank, (word, sim) in enumerate(similarities, start=1)}


# ========================================
# Demo and Explanation
# ========================================

if __name__ == "__main__":
    try:
        from sentence_transformers import SentenceTransformer
        import numpy as np

        # Define cosine_similarity for demo (matches the one provided to students)
        def cosine_similarity(vec1, vec2):
            """Compute cosine similarity between two vectors"""
            if hasattr(vec1, 'shape') and hasattr(vec2, 'shape'):
                dot_product = np.dot(vec1, vec2)
                norm1 = np.linalg.norm(vec1)
                norm2 = np.linalg.norm(vec2)
                if norm1 == 0 or norm2 == 0:
                    return 0.0
                return float(dot_product / (norm1 * norm2))
            return 0.0

        print("=" * 70)
        print("SEMANTIC TEXT EMBEDDING DEMONSTRATION")
        print("=" * 70)

        # Load model
        print("\nLoading SentenceTransformer model...")
        model = SentenceTransformer('all-MiniLM-L6-v2')
        print("✓ Model loaded!\n")

        # Example 1: Understanding semantic embeddings
        print("1. Creating Semantic Embeddings")
        print("-" * 70)

        target = "computer"
        test_words = ["mouse", "keyboard", "piano", "guitar", "orange"]

        print(f"\nTarget word: '{target}'")
        target_embedding = compute_embedding(target)
        print(f"Embedding shape: {target_embedding.shape}")
        print(f"Embedding (first 10 values): {target_embedding[:10]}")
        print("\nThis vector captures the MEANING of 'computer'!\n")

        print("Similarity to target (using cosine_similarity function):")
        for word in test_words:
            embedding = compute_embedding(word)
            similarity = cosine_similarity(target_embedding, embedding)

            # Determine relationship
            if similarity > 0.5:
                relationship = "HIGHLY related"
            elif similarity > 0.3:
                relationship = "Somewhat related"
            else:
                relationship = "Not related"

            print(f"'{word}':")
            print(f"  Similarity: {similarity:.4f} - {relationship}")

        # Example 2: Complete ranking showing semantic relationships
        print("\n\n2. Complete Word Ranking (Semantic Similarity)")
        print("-" * 70)

        target = "piano"
        words = ["guitar", "violin", "drums", "computer", "mouse", "table", "happy"]

        print(f"\nTarget: '{target}'")
        print(f"Words to rank: {words}\n")

        rankings = rank_words_by_similarity(target, words)

        print("Final Rankings (by SEMANTIC SIMILARITY):")
        for word in sorted(rankings, key=rankings.get):
            rank = rankings[word]
            embedding = compute_embedding(word)
            similarity = cosine_similarity(compute_embedding(target), embedding)
            print(f"  Rank {rank}: '{word}' (similarity: {similarity:.4f})")

        # Example 3: Why semantic embeddings work
        print("\n" + "=" * 70)
        print("WHY SEMANTIC EMBEDDINGS WORK")
        print("=" * 70)
        print("""
1. NEURAL NETWORK TRAINING:
   - Trained on billions of words from books, articles, etc.
   - Learned that "mouse" and "computer" appear together often
   - Captures relationships between words

2. MEANING, NOT CHARACTERS:
   - "mouse" has 0 characters in common with "computer"
   - But semantically they're HIGHLY related (computer peripheral)
   - Character similarity would rank "mouse" very low
   - Semantic similarity ranks "mouse" very high!

3. EXAMPLES OF CAPTURED RELATIONSHIPS:
   - Computer peripherals: mouse, keyboard, monitor
   - Musical instruments: piano, guitar, violin
   - Weather: sunny, rainy, cloudy
   - Food: pizza, pasta, burger

4. THIS IS REAL NLP:
   - Same technology used in Google Search, ChatGPT, etc.
   - Sentence Transformers is industry-standard
   - Much more powerful than character-based similarity!
        """)

        # Example 4: Show the difference
        print("=" * 70)
        print("CHARACTER vs SEMANTIC SIMILARITY")
        print("=" * 70)

        target = "computer"
        test_words = ["mouse", "trumpet", "commuter"]

        print(f"\nTarget: '{target}'\n")

        print("CHARACTER SIMILARITY (shares letters):")
        for word in test_words:
            shared_chars = len(set(word) & set(target))
            print(f"  '{word}': {shared_chars} shared characters")

        print("\nSEMANTIC SIMILARITY (meaning):")
        for word in test_words:
            embedding = compute_embedding(word)
            target_emb = compute_embedding(target)
            similarity = cosine_similarity(target_emb, embedding)
            print(f"  '{word}': {similarity:.4f} similarity")

        print("\nNotice:")
        print("  - 'commuter' shares many CHARACTERS with 'computer'")
        print("  - But 'mouse' is SEMANTICALLY closer (related concept)")
        print("  - Semantic embeddings capture MEANING, not just letters!")

        print("\n" + "=" * 70)
        print("KEY TAKEAWAY: Use the provided cosine_similarity() function!")
        print("=" * 70)
        print("\nStudents have access to:")
        print("  - model.encode([word])[0]  → Get embedding")
        print("  - cosine_similarity(emb1, emb2) → Compute similarity (PROVIDED!)")
        print("\nNo need to manually compute dot products and norms!")

    except ImportError:
        print("=" * 70)
        print("ERROR: sentence-transformers not installed")
        print("=" * 70)
        print("\nInstall with:")
        print("  pip install sentence-transformers torch numpy")
        print("\nThis will enable semantic embeddings!")
