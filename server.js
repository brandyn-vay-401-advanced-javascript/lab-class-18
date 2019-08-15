'use strict';

const io = require('socket.io')(3000);
const express = require('express');

const app = express();

app.use('/docs', express.static('docs'));

io.on('connection', (socket) => {
  console.log('Connected Yo', socket.id);

  socket.on('save', (payload) => {
    console.log('broadcasting');
    socket.broadcast.emit('message', payload);
  });
  
});

/**
 *
 *
 * @param {*} buffer
 */
let dispatchEvent = (buffer) => {
  let text = buffer.toString().trim();
  let [event, payload] = text.split(/\s+(.*)/);

  if (allowedEvents.includes(event)){

    let eventPayload = {event, payload};
    for (let socket in socketPool) {
      socketPool[socket].write(JSON.stringify(eventPayload));
    }
  }
  else {
    console.log(`IGNORE ${event}`);
  }
};