'use strict';

// CLIENT
const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');

socket.on('message', (payload) => {
  console.log('I heard:', payload);
});

socket.on('save', function(data) {
  let payload = JSON.parse(data);
  console.log(`you saved :', ${payload}`);
});

socket.on('error', function() {
  console.log('oops something went wrong!');
});