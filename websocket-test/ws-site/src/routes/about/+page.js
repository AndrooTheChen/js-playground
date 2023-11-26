import { dev } from '$app/environment';

// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
export const csr = dev;

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

import { WebSocket } from 'ws';

const connectToWebSocket = async () => {
  const ws = new WebSocket('ws://localhost:2424');

  ws.onopen = () => {
    console.log('Connected to WebSocket server');

    // Send a message to the server
    ws.send('Hello from SvelteKit!');
  };

  ws.onmessage = (event) => {
    console.log('Received message from server:', event.data);

    // Handle the server's response
  };
};

connectToWebSocket();
