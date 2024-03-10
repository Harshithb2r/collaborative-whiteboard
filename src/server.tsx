import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';

const PORT: number = 5000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket: Socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    socket.on('draw', (data: any) => {
        // Broadcast drawing data to all clients except the sender
        socket.broadcast.emit('draw', data);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
