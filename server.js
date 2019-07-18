const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const socketio = require("socket.io");
const jwt = require("jsonwebtoken");
const cors = require("cors");

//api route
const users = require("./api/users");

//keys
const db = require("./config/keys").mongo;
const secret = require("./config/keys").secret;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

mongoose
  .connect(db)
  .then(() => console.log("db connected"))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.use("/api/users", users);

const io = socketio(4000);

io.use((socket, next) => {
  if (socket.handshake.query && socket.handshake.query.token) {
    jwt.verify(socket.handshake.query.token, secret, (err, decoded) => {
      if (err) {
        return next(new Error("Authentication error"));
      } else {
        socket.decoded = decoded;
        next();
      }
    });
  } else {
    return next(new Error("Authentication error"));
  }
}).on("connection", socket => {
  io.emit("message", {
    text: `${socket.decoded.username} connected`,
    date: Date.now(),
    username: "Server"
  });
  socket.on("message", message => {
    io.emit("message", message);
  });
  socket.on("typing", username => {
    io.emit("typing", username);
    console.log("typing", username);
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
