"""
Hot or Cold Word Guessing Game
The player tries to guess a secret word, receiving feedback based on similarity.
"""

import random
import re


# Word list (at least 20 words)
WORD_LIST = [
    "python", "computer", "keyboard", "program", "function",
    "variable", "database", "internet", "software", "hardware",
    "algorithm", "network", "terminal", "browser", "developer",
    "application", "security", "memory", "processor", "interface",
    "system", "server", "coding", "digital", "technology"
]


def calculate_levenshtein_distance(word1, word2):
    """
    Calculate the Levenshtein distance between two words.
    Returns the minimum number of single-character edits needed.
    """
    word1 = word1.lower()
    word2 = word2.lower()

    # Create a matrix to store distances
    rows = len(word1) + 1
    cols = len(word2) + 1
    distance_matrix = [[0 for _ in range(cols)] for _ in range(rows)]

    # Initialize first row and column
    for i in range(rows):
        distance_matrix[i][0] = i
    for j in range(cols):
        distance_matrix[0][j] = j

    # Calculate distances
    for i in range(1, rows):
        for j in range(1, cols):
            if word1[i-1] == word2[j-1]:
                cost = 0
            else:
                cost = 1

            distance_matrix[i][j] = min(
                distance_matrix[i-1][j] + 1,      # deletion
                distance_matrix[i][j-1] + 1,      # insertion
                distance_matrix[i-1][j-1] + cost  # substitution
            )

    return distance_matrix[rows-1][cols-1]


def calculate_similarity_percentage(guess, target):
    """
    Calculate similarity as a percentage (0-100).
    Uses Levenshtein distance and normalizes by the longer word length.
    """
    distance = calculate_levenshtein_distance(guess, target)
    max_length = max(len(guess), len(target))

    # Avoid division by zero
    if max_length == 0:
        return 100.0

    # Calculate similarity percentage
    similarity = ((max_length - distance) / max_length) * 100
    return round(similarity, 2)


def get_temperature_feedback(similarity):
    """
    Return temperature-based feedback based on similarity percentage.
    """
    if similarity >= 90:
        return "🔥 HOT"
    elif similarity >= 60:
        return "🌤 WARM"
    elif similarity >= 30:
        return "🧊 COLD"
    else:
        return "❄️ ICE COLD"


def is_valid_guess(guess):
    """
    Validate the guess - must be alphabetic and not empty.
    Returns (is_valid, error_message)
    """
    if not guess:
        return False, "Guess cannot be empty!"

    if not re.match(r'^[a-zA-Z]+$', guess):
        return False, "Guess must contain only letters (no numbers or symbols)!"

    if len(guess) < 2:
        return False, "Guess must be at least 2 letters long!"

    return True, ""


def display_instructions():
    """
    Display game instructions at the start.
    """
    print("\n" + "="*60)
    print("🎮  HOT OR COLD - WORD GUESSING GAME  🎮")
    print("="*60)
    print("\nHOW TO PLAY:")
    print("• I've secretly chosen a word")
    print("• Try to guess it one word at a time")
    print("• After each guess, I'll tell you how close you are:\n")
    print("  🔥 HOT (90-100% similar) - You're VERY close!")
    print("  🌤 WARM (60-89% similar) - Getting warmer...")
    print("  🧊 COLD (30-59% similar) - Not quite there")
    print("  ❄️ ICE COLD (0-29% similar) - Way off!\n")
    print("• I'll also show you the exact similarity score (0-100)")
    print("• Keep guessing until you find the exact word!")
    print("="*60 + "\n")


def display_guess_rankings(guesses):
    """
    Display all guesses ranked by similarity score.
    """
    if not guesses:
        return

    print("\n" + "-"*60)
    print("📊 YOUR GUESS RANKINGS (Best to Worst):")
    print("-"*60)

    # Sort guesses by similarity score (descending)
    sorted_guesses = sorted(guesses, key=lambda x: x['similarity'], reverse=True)

    for rank, guess_data in enumerate(sorted_guesses, 1):
        print(f"{rank}. {guess_data['word']:<15} - {guess_data['similarity']:>6.2f}% - {guess_data['feedback']}")

    print("-"*60)


def play_game():
    """
    Main game loop.
    """
    # Select random target word
    target_word = random.choice(WORD_LIST)
    target_length = len(target_word)

    guesses = []
    guess_count = 0
    won = False

    print(f"💡 HINT: The target word has {target_length} letters.\n")

    # Game loop
    while not won:
        # Get player's guess
        guess = input("Enter your guess: ").strip()

        # Validate guess
        is_valid, error_msg = is_valid_guess(guess)
        if not is_valid:
            print(f"❌ {error_msg}")
            continue

        guess = guess.lower()
        guess_count += 1

        # Check if guess is correct
        if guess == target_word:
            print(f"\n🎉 CONGRATULATIONS! You found it! 🎉")
            print(f"The word was: {target_word.upper()}")
            print(f"You guessed it in {guess_count} {'guess' if guess_count == 1 else 'guesses'}!")
            won = True
        else:
            # Calculate similarity and feedback
            similarity = calculate_similarity_percentage(guess, target_word)
            feedback = get_temperature_feedback(similarity)

            # Store guess data
            guesses.append({
                'word': guess,
                'similarity': similarity,
                'feedback': feedback
            })

            # Show feedback
            print(f"\n{feedback} - Similarity: {similarity}%")
            print(f"(Guess #{guess_count})")

            # Show all previous guesses ranked
            display_guess_rankings(guesses)

    return guess_count


def main():
    """
    Main program entry point with replay functionality.
    """
    display_instructions()

    play_again = True

    while play_again:
        total_guesses = play_game()

        # Ask if player wants to play again
        print("\n" + "="*60)
        while True:
            response = input("Would you like to play again? (yes/no): ").strip().lower()
            if response in ['yes', 'y']:
                print("\n" + "="*60)
                print("Starting new game...")
                print("="*60)
                break
            elif response in ['no', 'n']:
                print("\n👋 Thanks for playing! Goodbye!")
                play_again = False
                break
            else:
                print("Please enter 'yes' or 'no'.")


if __name__ == "__main__":
    main()
