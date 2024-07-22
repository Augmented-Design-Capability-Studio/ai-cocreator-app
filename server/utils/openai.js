import OpenAI from 'openai';
import fs from 'fs';
import { config } from 'dotenv';
config()

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

export const transcribeAudio = async (filePath) => {
    try {
        const transcription = await openai.audio.transcriptions.create({
            file: fs.createReadStream(filePath),
            model: "whisper-1",
            response_format: "verbose_json",
            timestamp_granularities: ["word"]
        });
        return transcription.text;
    } catch (error) {
        throw new Error('Error transcribing audio:', error);
    }
};

export const generateResponse = async (transcription) => {
    try {
        const response = await openai.completions.create({
            model: 'text-davinci-003',
            prompt: transcription,
            max_tokens: 150,
            n: 1,
            stop: null,
            temperature: 0.7,
        });
        return response.choices[0].text;
    } catch (error) {
        throw new Error('Error generating response:', error);
    }
};
