import express from 'express';
import multer from 'multer';
import { transcribeAudioFile } from '../controllers/transcriptionController.js';

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

const router = express.Router();

router.post('/whisper', upload.single('file'), transcribeAudioFile);

export default router;
