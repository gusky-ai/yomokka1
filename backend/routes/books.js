import express from 'express';
import { selectBook } from '../services/bookSelector.js';

const router = express.Router();

router.post('/recommend', async (req, res) => {
    try {
        const { personalityType, traits, conversationSummary, excludedBooks } = req.body;

        if (!personalityType || !traits) {
            return res.status(400).json({ error: 'Personality type and traits are required' });
        }

        const book = await selectBook(traits, personalityType, conversationSummary, excludedBooks);

        res.json({ book });
    } catch (error) {
        console.error('Book recommendation error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
