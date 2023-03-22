const dotenv = require("dotenv");
dotenv.config();
const mysql = require("mysql2");
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const bcrypt = require("bcrypt");
const joi = require("joi");
const jwt = require("jsonwebtoken");

const schema = joi.object({
  username: joi.string().min(3).max(255).required(),
  password: joi.string().min(6).max(255).required(),
});

exports.userLogin = function userLogin(req, res) {
  const {username, password} = req.body;

  const validation = schema.validate({username: username, password: password});
  if (!validation.error) {
    const loginUser = "SELECT password FROM user WHERE username = ?";

    db.execute(loginUser, [username], (error, result) => {
      if (error) {
        res.status(500).send("Server error, reload and try again");
      } else {
        if (result[0] === undefined) {
          res.status(401).send("Enter a correct username");
          return;
        } else {
          const hashedPassword = result[0].password;

          bcrypt.compare(password, hashedPassword, function (error, result) {
            if (result === true) {
              const token = jwt.sign({username: username}, process.env.JWT_SECRET, {expiresIn: "10m"});
              return res
                .cookie("loginCookie", token, {
                  maxAge: 1000 * 60 * 10,
                  path: "/",
                  httpOnly: true,
                })
                .status(200)
                .send("You are logged in, here is a cookie");
            } else if (error) {
              res.status(400).send(error);
            } else {
              res.status(401).send("Wrong password, try again");
            }
          });
        }
      }
    });
  } else {
    res.status(406).send(validation.error.message);
  }
};
