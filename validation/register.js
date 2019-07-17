const validator = require("validator");
const isEmpty = require("./is-empty");

const validateRegisterInput = data => {
  const errors = {};
  const newData = { ...data };
  newData.email = isEmpty(newData.email) ? "" : newData.email;
  newData.username = isEmpty(newData.username) ? "" : newData.username;
  newData.password = isEmpty(newData.password) ? "" : newData.password;
  newData.password2 = isEmpty(newData.password2) ? "" : newData.password2;
  if (!validator.isEmail(newData.email)) {
    errors.email = "Not a valid email";
  }

  if (isEmpty(newData.email)) {
    errors.email = "Email is required";
  }

  if (!validator.isLength(newData.username, { min: 2, max: 30 })) {
    errors.userame = "Username must be between 2 and 30 symbols";
  }

  if (!validator.isLength(newData.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 symbols";
  }

  if (!validator.equals(newData.password, newData.password2)) {
    errors.password2 = "Passwords must match";
  }

  return { errors, isValid: isEmpty(errors) };
};

module.exports = validateRegisterInput;
