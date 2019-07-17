const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const socketio = require("socket.io");
const jwt = require("jsonwebtoken");
const cors = require("cors");

//api route
const users = require("./api/users");

//db key
const db = require("./config/keys").mongo;

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

const io = socketio();

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
