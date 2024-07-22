import express from 'express';
import { generateAssistantResponse } from '../controllers/assistantController.js';

const router = express.Router();

router.post('/generate-response', generateAssistantResponse);

export default router;
