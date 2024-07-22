import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import http from 'http';
import setupWebSocketServer from './websockets/websocketServer.js';
import transcriptionRoutes from './routes/transcriptionRoutes.js';
import assistantRoutes from './routes/assistantRoutes.js';

config();

const app = express();
const PORT = 3001; // or any port you prefer

app.use(express.json());
app.use(cors());

app.use('/api', transcriptionRoutes);
app.use('/api', assistantRoutes);

// Setting up the HTTP server and WebSocket server
const server = http.createServer(app);
setupWebSocketServer(server);

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
