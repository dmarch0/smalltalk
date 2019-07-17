const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    isRequired: true
  },
  username: {
    type: String,
    isRequired: true
  },
  password: {
    type: String,
    isRequired: true
  }
});

module.exports = User = mongoose.model("user", UserSchema);
