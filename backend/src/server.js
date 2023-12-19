// Node server which will handle socket.io connections.
const express = require("express");
const app = express();
const http = require("http").Server(app);
// socket.io server is instance of http 
// socket.io server listen incoming events
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

const users = {};

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("new-user-joined", (name) => {
    console.log("New User : ", name);
    users[socket.id] = name;
    // socket.broadcast.emit is used to broadcast a message to all connected clients except the sender of the original message.
    socket.broadcast.emit("user-joined", name); 
  });

  socket.on("send", (message) => {
    socket.broadcast.emit("received", {
      message: message,
      name: users[socket.id],
    });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });
});

http.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
