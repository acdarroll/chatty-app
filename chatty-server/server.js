// server.js

const express = require('express');
const WebSocket = require('ws');
const uuidv4 = require('uuid/v4');
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

const randomColor = () => {
  let colors = ["red", "purple", "blue", "orange"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const sendAllClients = data => {
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
  console.log('Client connected');

  assignColor(ws);
  let numClients = wss.clients.size;
  sendAllClients({type: "incomingUsers", users: numClients});

  ws.on('error', error => {
    console.log("An error occured:", error);
  });

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    let parsedMessage = JSON.parse(message);
    parsedMessage.id = uuidv4();
    switch(parsedMessage.type) {
      case "postMessage":
        let url = parsedMessage.content.match(/http\S*[(jpg)(png)(gif)(jpeg)]/g);
        if(url && url.length > 0) {
          parsedMessage.urls = url;
          parsedMessage.content = parsedMessage.content.replace(/http\S*[(jpg)(png)(gif)(jpeg)]?/g, "");
        }
        console.log("Urls:", parsedMessage.urls);
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