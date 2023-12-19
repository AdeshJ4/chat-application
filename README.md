ChatWithMe - A real-time chat application leveraging Node.js and Socket.IO for seamless, instant communication 

Features :
● Engage in one-on-one conversations or participate in group chats for versatile communication.
● Receive real-time notifications when a new user joins, providing their name along with an accompanying message ringtone.
● Get notified when a user disconnects, accompanied by their name and a distinctive message ringtone.
● Experience message ringtone notifications for incoming messages, as well as when users join or leave the chat, enhancing the interactive chat experience




Socket.IO
---------

-> Socket.IO is a javascript library that enables real-time, bidirectional and event-based communication 
   between the client and server.

-> It is built on top of the WebSocket protocol, which is a technology that enables full-duplex communication 
   over a single TCP connection.

-> It consists of two parts: It includes both a client-side library that runs in the browser and a server-side library for Node.js  
that can be used together to enable real-time communication between the client and the server.


-> On the server-side, Socket.IO provides a Node.js library that allows developers to handle client 
   connections, send and receive messages, and broadcast events to multiple clients.

-> The server-side library can be used in conjunction with other Node.js libraries to build powerful 
   real-time applications.

-> On the client-side, Socket.IO provides a JavaScript API that allows developers to establish a connection 
   with the server, send and receive messages, and handle events. The client-side library can be used in a 
   variety of environments, such as web browsers and mobile applications.


Bidirectional : if client have something to share(update) with server then it can share to server and if server has
                something to share then it can share with  


WebSocket Protocol:

-> WebSocket is a communication protocol that provides a full-duplex communication channel over a single, long-lived TCP connection.
-> It enables real-time, bidirectional communication between a client and a server.
-> With WebSocket, both the client and server can send messages to each other independently.
-> Events like "message received," "connection opened," and "connection closed" are fundamental to WebSocket communication.
-> WebSocket protocol and the EventEmitter class in Node.js's serve different purposes, but they both involve event-driven
programming concepts. 


***Server-side code***
----------------------

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io').(http);

io.on('connection', (socket)=>{
    console.log('a user connected');

    socket.on('chat message', (msg)=>{
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });

    socket.on('disconnect',()=>{
        console.log('user disconnected')
    });
});

http.listen(3000, ()=>{
    console.log('Listing on : 3000')
})


***Client Side code***
----------------------

import io from 'socket.io-client';

const socket = io();

socket.on('connect', ()=>{
    console.log('Connected to server');
});

socket.on('disconnect', ()=>{
    console.log('DisConnected from server');
});

socket.on('chat message', (msg)=>{
    console.log('Received Message: ' + msg);
});

const sendMessage = () =>{
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    if(message !== ''){
        socket.emit('chat message', message);
        messageInput.value = '';
    }
};




 
