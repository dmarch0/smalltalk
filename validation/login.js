const validator = require("validator");
const isEmpty = require("./is-empty");

const validateLoginInput = data => {
  const errors = {};
  const newData = { ...data };

  newData.email = isEmpty(newData.email) ? "" : newData.email;
  newData.password = isEmpty(newData.password) ? "" : newData.password;

  if (!validator.isEmail(newData.email)) {
    errors.email = "Not a valid email";
  }

  if (isEmpty(newData.email)) {
    errors.email = "Email is required";
  }

  if (isEmpty(newData.password)) {
    errors.password = "Password is required";
  }

  return { errors, isValid: isEmpty(errors) };
};

module.exports = validateLoginInput;
