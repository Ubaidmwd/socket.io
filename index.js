const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// io.on("connection", (socket) => {
//   console.log("user connected");
//   setTimeout(() => {
// socket.send("Hello World");
// socket.emit("message", { description: "My event description" });
//   }, 2000);
let activeUsers = 0;
let myName = io.of("/mysapce");
myName.on("connection", (socket) => {
  activeUsers++;
  console.log("user connected");
  socket.emit("message", activeUsers);

  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
});

server.listen(3000, function () {
  console.log(`Listening on port ${3000}`);
});
