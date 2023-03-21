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
const schema = joi.object({
  username: joi.string().min(3).max(255).required(),
  password: joi.string().min(6).max(255).required(),
});

exports.userReg = (req, res) => {
  const {username, password} = req.body;

  const validation = schema.validate({username: username, password: password});
  if (!validation.error) {
    const hashedPassword = bcrypt.hashSync(password, 10);

    const addUser = "INSERT INTO user (username, password) VALUES(?,?)";

    db.execute(addUser, [username, hashedPassword], (error, result) => {
      if (error) {
        if (error.errno === -4078) {
          console.log(error);
          res.status(503).send("Can't connect to server right now, please reload page and try again");
        } else if (error.errno === 1062) {
          console.log(error);
          res.status(409).send("Username allready in use");
        } else {
          console.log(error);
          res.status(400).send("Something went wrong, please reload page and try again");
        }
      } else {
        res.status(201).send("Added new user");
      }
    });
  } else {
    res.status(406).send(validation.error.message);
  }
};
