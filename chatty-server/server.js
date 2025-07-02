// server.js

const express = require('express');
const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');
const SocketServer = WebSocket.Server;

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


// Helper Functions
const randomColor = () => {
  let colors = ["red", "purple", "blue", "orange"];
  return colors[Math.floor(Math.random() * colors.length)];
};


wss.broadcast = data => {
  wss.clients.forEach(client => {
    if(client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

const assignColor = (ws) => {
  wss.clients.forEach(client => {
    if(client === ws && client.readyState === WebSocket.OPEN) {
      let color = randomColor();
      client.send(JSON.stringify({type: "incomingColor", color}));
    }
  });
};

wss.on('connection', (ws) => {

  // Assign a random color to the connection
  assignColor(ws);
  let numClients = wss.clients.size;

  // Broadcast the current number of connections to all clients
  wss.broadcast({type: "incomingUsers", users: numClients});

  ws.on('error', error => {
    console.log("An error occured:", error);
  });

  ws.on('message', function incoming(message) {

    let parsedMessage = JSON.parse(message);
    parsedMessage.id = uuidv4();
    switch(parsedMessage.type) {
      case "postMessage":
        // Save any urls as another property if they exist
        let url = parsedMessage.content.match(/http\S+(jpg|png|gif|jpeg)/g);
        if(url && url.length > 0) {
          parsedMessage.urls = url;
          parsedMessage.content = parsedMessage.content.replace(/http\S+(jpg|png|gif|jpeg)/g, "");
        }
        parsedMessage.type = "incomingMessage";
        break;
      case "postNotification":
        parsedMessage.type = "incomingNotification";
        break;
      default:
        console.log("Unknown event type: " +  parsedMessage.type);
    }
    wss.broadcast(parsedMessage);
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {

    // Broadcast the current number of connections to all clients
    let numClients = wss.clients.size;
    wss.broadcast({type: "incomingUsers", users: numClients});
  });
});