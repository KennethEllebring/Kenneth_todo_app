const dotenv = require("dotenv");
dotenv.config();
const mysql = require("mysql2");
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const {parseCookie} = require("../utility/utils");

exports.todoPost = (req, res) => {
  const {loginCookie} = parseCookie(req.headers.cookie);
  const {todo} = req.body;
  sqlPost = "INSERT INTO todo (username, todo) VALUES (? , ?)";

  db.execute(sqlPost, [loginCookie, todo], (error, result) => {
    if (error) {
      console.log(error);
    }
  });
};
