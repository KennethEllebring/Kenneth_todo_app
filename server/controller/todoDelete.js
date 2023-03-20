const dotenv = require("dotenv");
dotenv.config();
const mysql = require("mysql2");
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

exports.todoDelete = (req, res) => {
  const {id} = req.params;
  sqlDelete = "DELETE FROM todo WHERE id = ?";

  db.execute(sqlDelete, [id], (error, result) => {
    if (error) {
      console.log(error);
    }
  });
};
