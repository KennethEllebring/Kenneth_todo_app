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
  id: joi.number().required(),
});

exports.friendDelete = (req, res) => {
  const {id} = req.params;
  const validation = schema.validate({id: id});
  if (!validation.error) {
    const sqlDelete = "DELETE FROM friend WHERE id = ?";

    db.execute(sqlDelete, [id], (error, result) => {
      if (error) {
        console.log(error);
      }
    });
  } else {
    console.log(validation.error.message);
    res.status(406).send(validation.error.message);
  }
};
