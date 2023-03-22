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
  id: joi.required(),
});

exports.todoGetId = (req, res) => {
  const {id} = req.params;

  const validation = schema.validate({id: id});
  if (!validation.error) {
    const sqlGet = "SELECT * FROM todo WHERE id = ?";

    db.execute(sqlGet, [id], (error, result) => {
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
          res.status(200).send("You don't have any ToDos");
        } else {
          res.status(200).send(result);
        }
      }
    });
  } else {
    res.status(406).send(validation.error.message);
  }
};
