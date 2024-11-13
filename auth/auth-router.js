require("dotenv").config();
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken.js");
const Users = require("../users/users-model.js");

router.post("/registration", (req, res, _next) => {
  const user = req.body;
  if (user.username && user.email && user.password) {
    const hash = bcrypt.hashSync(user.password, Number(process.env.SALT));
    user.password_hash = hash;
    delete user.password;
    Users.add(user)
      .then((user) => {
        const token = generateToken(user);
        res.status(201).json({ user, token });
      })
      .catch((err) => {
        res.status(500).json({ errorMessage: err.message });
      });
  } else {
    res
      .status(400)
      .json({ errorMessage: "Must include a username and password" });
  }
});

router.post("/login", (req, res, _next) => {
  const { username, password } = req.body;
  Users.getBy({ username })
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password_hash)) {
        const token = generateToken(user);
        res.status(202).json({ user, token });
      } else {
        res.status(401).json({ message: "Authentication failed" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
