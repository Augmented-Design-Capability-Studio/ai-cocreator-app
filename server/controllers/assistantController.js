import { generateResponse } from '../utils/openai.js';

export const generateAssistantResponse = async (req, res) => {
    const { transcription } = req.body;

    try {
        const response = await generateResponse(transcription);
        res.json({ response });
    } catch (error) {
        console.error('Error generating response:', error);
        res.status(500).send('Internal Server Error');
    }
};
