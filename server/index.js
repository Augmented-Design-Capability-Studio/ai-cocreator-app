// server.js
import fs from 'fs';
import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import multer from 'multer';
import OpenAI from 'openai';
import { config } from 'dotenv';
config();


const app = express();
const PORT = 3001; // or any port you prefer
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY })

app.use(bodyParser.json());
app.use(cors());

// Multer configuration to save files with correct extension
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split('/')[1];
      cb(null, `${file.fieldname}-${Date.now()}.${extension}`);
    }
  });
  
  const upload = multer({ storage: storage });


app.post('/api/whisper', upload.single('file'), async (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    console.log(req.file)
  
    try {
      const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(req.file.path),
        model: "whisper-1",
        response_format: "verbose_json",
        timestamp_granularities: ["word"]
      });
  
    //   // Clean up the uploaded file after processing
    //   fs.unlinkSync(req.file.path);
  
      console.log(transcription);
  
      res.json(transcription.text);
    } catch (error) {
      console.error('Error transcribing audio:', error);
      res.status(500).send('Internal Server Error');
    }
  });

app.post('/api/assistant', async (req, res) => {
  const { message } = req.body;
  // Call Assistant API with message
  const response = await fetch('ASSISTANT_API_URL', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer YOUR_API_KEY`,
    },
    body: JSON.stringify({ input: message }),
  });
  const data = await response.json();
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
