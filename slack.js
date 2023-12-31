const express = require("express");
const app = express();
const socketio = require("socket.io");

app.use(express.static(__dirname + "/public"));
const namespaces = require("./data/namespaces");

const expressServer = app.listen(9000);
const io = socketio(expressServer);

io.on("connection", (socket) => {
  socket.emit("welcome", "Welcome to the server");
  socket.on("clientConnect", () => {
    console.log(socket.id + "is connected!");
  });
  socket.emit("nsList", namespaces);
});
