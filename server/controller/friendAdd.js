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
  friendName: joi.string().max(80).required(),
});

exports.friendAdd = (req, res) => {
  const username = req.username;
  const {friendName} = req.body;

  const validation = schema.validate({username: username, friendName: friendName});
  if (!validation.error) {
    const sqlFriend = "INSERT INTO friend (username, friendname) VALUES (? , ?)";

    db.execute(sqlFriend, [username, friendName], (error, result) => {
      if (error) {
        console.log(error);
        res.status(409).send("You are allready friends");
      } else {
        console.log(result);
        res.status(201).send("added new friend");
      }
    });
  } else {
    console.log(validation.error.message);
    res.status(406).send(validation.error.message);
  }
};
