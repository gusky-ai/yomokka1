import { books } from '../data/books.js';
import { generatePrescriptionMessage, analyzeConcernType } from './llm.js';

/**
 * Select the best book based on personality and conversation
 * @param {Object} personalityTraits - User's personality traits (-1 to 1)
 * @param {string} personalityType - User's personality type (e.g. "INTJ")
 * @param {string} conversationSummary - Summary of user's concerns
 * @param {Array} excludedBooks - List of excluded book IDs
 * @returns {Promise<Object>} - Selected book with prescription
 */
export async function selectBook(personalityTraits, personalityType, conversationSummary, excludedBooks = []) {
    // 1. Analyze conversation to determine preferred genre (practical vs story)
    const preferredGenre = await analyzeConcernType(conversationSummary);

    // 2. Filter available books
    let availableBooks = books.filter(book => !excludedBooks.includes(book.id));

    // If no books available, reset exclusion (shouldn't happen with large DB)
    if (availableBooks.length === 0) {
        availableBooks = books;
    }

    // 3. Calculate distance for each book
    const scoredBooks = availableBooks.map(book => {
        // Calculate Euclidean distance in 4D space
        const distance = Math.sqrt(
            Math.pow(book.traits.direction - personalityTraits.direction, 2) +
            Math.pow(book.traits.perspective - personalityTraits.perspective, 2) +
            Math.pow(book.traits.material - personalityTraits.material, 2) +
            Math.pow(book.traits.action - personalityTraits.action, 2)
        );

        // Genre bonus: if book genre matches preferred genre, reduce distance (make it more likely to be picked)
        // Reducing distance by 0.5 is significant in this -2 to 2 space
        let finalScore = distance;
        if (book.genre === preferredGenre) {
            finalScore -= 0.5;
        }

        return { ...book, score: finalScore };
    });

    // 4. Sort by score (lower is better/closer)
    scoredBooks.sort((a, b) => a.score - b.score);

    // 5. Select top book
    const selectedBook = scoredBooks[0];

    // 6. Generate prescription message using LLM
    const prescription = await generatePrescriptionMessage(selectedBook, personalityType, conversationSummary);

    return {
        ...selectedBook,
        prescription
    };
}
