const socket = io("http://localhost:8000");
const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");
var audio = new Audio("audios/ting.mp3");

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if (position == "left") {
    audio.play();
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});

const name = prompt("Enter Your Name to join : ");
socket.emit("new-user-joined", name);

socket.on("user-joined", (name) => {
  console.log("User Joined from client :", name);
  append(`${name} joined the chat.`, "left");
});

socket.on("received", (data) => {
  append(`${data.name}: ${data.message}`, "left");
});

// if user leave the chat then it will appear on the left side
socket.on("left", (name) => {
  append(`${name}: left the chat`, "left");
});
