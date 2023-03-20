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

exports.friendAdd = (req, res) => {
  const {loginCookie} = parseCookie(req.headers.cookie);
  const {friendName} = req.body;
  console.log(loginCookie + friendName);
  sqlFriend = "INSERT INTO friend (username, friendname) VALUES (? , ?)";

  db.execute(sqlFriend, [loginCookie, friendName], (error, result) => {
    if (error) {
      console.log(error);
      res.status(409).send("You are allready friends");
    } else {
      console.log(result);
      res.status(201).send("added new friend");
    }
  });
};
