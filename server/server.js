const express = require('express');
const app = express();
const http = require('http');
const webSocket = require('ws').WebSocket


const server = http.createServer(app)

const wss = new webSocket.Server({server})

const clients = new Set();

wss.on('connection', (ws) => {
    clients.add(ws)
    ws.send("Started")
    ws.on('message', (message) => {
        console.log('received: %s', message);
        for(let client of clients) {
            console.log('received: %s', message);
            client.send(`${message}`)
        }
        // ws.send(`${message}`);
    })
})



server.listen(process.env.PORT || 8998, () => {
    console.log(`Server started on port ${server.address().port} :)`)
})