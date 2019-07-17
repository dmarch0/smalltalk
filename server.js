const express = require("express");
const mongoose = require("mongoose");

//api route
const users = require("./api/users");

//db key
const db = require("./config/keys").mongo;

const app = express();

mongoose
  .connect(db)
  .then(() => console.log("db connected"))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.use("/api/users", users);

app.get("/", (req, res) => {
  res.json({ msg: "test" });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
