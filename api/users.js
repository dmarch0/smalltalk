const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const User = require("../models/user");

const secret = require("../config/keys").secret;

router.get("/test", (req, res) => {
  res.json({ msg: "users test works" });
});

//@route POST /api/users/register
//@desc register new user
//@access public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.status(200).json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route POST /api/users/login
//@desc login user
//@access public
router.post("/login", (req, res) => {
  console.log("listening");
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        bcrypt
          .compare(req.body.password, user.password)
          .then(isMatch => {
            if (isMatch) {
              const payload = {
                id: user.id,
                username: user.username
              };

              jwt.sign(payload, secret, { expiresIn: 3600 }, (err, token) =>
                res.json({ success: true, token: token })
              );
            } else {
              errors.password = "Password incorrect";
              return res.status(400).json(errors);
            }
          })
          .catch(err => console.log(err));
      } else {
        return res.status(400).json({ email: "Email not found" });
      }
    })
    .catch(err => res.status(400).json({ email: "Email not found" }));
});

module.exports = router;
