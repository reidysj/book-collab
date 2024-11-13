require("dotenv").config();
const jwt = require("jsonwebtoken");
module.exports = function generateToken(user) {
  const payload = {
    userId: user.user_id,
    username: user.username,
  };
  const options = {
    expiresIn: user.rememberMe ? "30d" : "2h",
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
};
