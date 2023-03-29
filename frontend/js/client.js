const socket = io("http://localhost:8000");
const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");

const name = prompt("Enter Your Name to join : ");
console.log("name from client.js : " + name);
socket.emit("new-user-joined", name);
