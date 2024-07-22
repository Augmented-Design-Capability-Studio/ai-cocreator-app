import fs from 'fs';
import { transcribeAudio } from '../utils/openai.js';

export const transcribeAudioFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    console.log(req.file);

    try {
        const transcription = await transcribeAudio(req.file.path);
        fs.unlinkSync(req.file.path); // Clean up the uploaded file after processing
        res.json(transcription);
    } catch (error) {
        console.error('Error transcribing audio:', error);
        res.status(500).send('Internal Server Error');
    }
};
