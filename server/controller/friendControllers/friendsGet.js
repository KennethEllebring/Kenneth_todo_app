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
});

exports.friendsGet = (req, res) => {
  const username = req.username;

  const validation = schema.validate({username: username});
  if (!validation.error) {
    const sqlFriendsGet = "SELECT id, friendname FROM friend WHERE username = ?";

    db.execute(sqlFriendsGet, [username], (error, result) => {
      if (error) {
        if (error.errno === -4078) {
          console.log(error);
          res.status(503).send("Can't connect to server right now, please reload page and try again");
        } else {
          console.log(error);
          res.status(400).send("Something went wrong, please reload page and try again");
        }
      } else {
        if (result[0] === undefined) {
          res.status(200).send("You don't have any Friends");
        } else {
          res.status(200).send(result);
        }
      }
    });
  } else {
    res.status(406).send(validation.error.message);
  }
};
