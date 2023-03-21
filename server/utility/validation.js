const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const {parseCookie} = require("./utils");
const JWT_SECRET = process.env.JWT_SECRET;

exports.jwtValidation = function jwtValidation(req, res, next) {
  const {loginCookie} = parseCookie(req.headers.cookie);

  try {
    const decode = jwt.verify(loginCookie, JWT_SECRET);
    const username = decode.username;
    req.username = username;
    next();
  } catch (err) {
    res.status(401).send("Invalid token");
  }
};
