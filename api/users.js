const router = require("express").Router();

router.get("/test", (req, res) => {
  res.json({ msg: "users test works" });
});

//@route POST /api/users/register
//@desc register new user
//@access public
router.post("/api/users/register", (req, res) => {});

//@route POST /api/users/login
//@desc login user
//@access public
router.post("/api/users/login", (req, res) => {});

module.exports = router;
