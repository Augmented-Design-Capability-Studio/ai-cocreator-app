import { Server as WebSocketServer } from 'socket.io';
import { generateResponse } from '../utils/openai.js';

const setupWebSocketServer = (server) => {
    const io = new WebSocketServer(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('pauseAssistant', () => {
            console.log('Assistant paused');
            io.emit('assistantPaused');
        });

        socket.on('requestResponse', async (data) => {
            const { query } = data;

            try {
                const response = await generateResponse(query);
                io.emit('responseGenerated', { response });
            } catch (error) {
                console.error('Error generating response:', error);
                socket.emit('error', 'Internal Server Error');
            }
        });

        socket.on('sendResponse', (data) => {
            const { response } = data;
            io.emit('responseSent', { response });
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};

export default setupWebSocketServer;
