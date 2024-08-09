import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Ensure this URL is correct

socket.on('connect', () => {
  console.log('Connected to WebSocket server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from WebSocket server');
});

// Example of handling incoming messages
socket.on('message', (data) => {
  console.log('Message received:', data);
});
