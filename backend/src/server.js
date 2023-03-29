const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: '*',
  }
});

const users = [];

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("new-user-joined", (name) => {
    console.log("New User : ", name);
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });

  socket.on("send", (message) => {
    socket.broadcast.emit("received", {
      message: message,
      name: users[socket.id],
    });
  });
});

http.listen(8000, () => {
  console.log(`Server is listening on port 8000`);
});
