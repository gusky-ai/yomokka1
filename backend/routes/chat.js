import express from 'express';
import { generateChatResponse } from '../services/llm.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { message, personalityType, history } = req.body;

        if (!message || !personalityType) {
            return res.status(400).json({ error: 'Message and personality type are required' });
        }

        const response = await generateChatResponse(message, personalityType, history || []);

        res.json({ message: response });
    } catch (error) {
        console.error('Chat route error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
