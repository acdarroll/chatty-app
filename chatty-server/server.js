// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

const sendAllClients = data => {
  wss.clients.forEach(client => {
    client.send(JSON.stringify(data));
  });
};

wss.on('connection', (ws) => {
  console.log('Client connected');

  let numClients = wss.clients.size;
  sendAllClients({type: "incomingUsers", users: numClients});

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    let parsedMessage = JSON.parse(message);
    parsedMessage.id = uuidv4();
    switch(parsedMessage.type) {
      case "postMessage":
        parsedMessage.type = "incomingMessage";
        break;
      case "postNotification":
        parsedMessage.type = "incomingNotification";
        break;
      default:
        console.log("Unknown event type: " +  parsedMessage.type);
    }
    sendAllClients(parsedMessage);
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    let numClients = wss.clients.size;
    sendAllClients({type: "incomingUsers", users: numClients});
  });
});