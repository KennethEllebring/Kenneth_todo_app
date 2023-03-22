const dotenv = require("dotenv");
dotenv.config();
const mysql = require("mysql2");
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const joi = require("joi");
const schema = joi.object({
  username: joi.string().max(255).required(),
  todo: joi.string().min(1).max(500).required(),
});

exports.todoPost = (req, res) => {
  const username = req.username;
  const {todo} = req.body;

  const validation = schema.validate({username: username, todo: todo});
  if (!validation.error) {
    const sqlPost = "INSERT INTO todo (username, todo) VALUES (? , ?)";

    db.execute(sqlPost, [username, todo], (error, result) => {
      if (error) {
        console.log(error);
      }
    });
  } else {
    res.status(406).send(validation.error.message);
  }
};
