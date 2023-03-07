/////////////////// Server ///////////////////
const express = require("express");
const server = express();
const port = 5050;

/////////////////// Password Encryption ///////////////////
const bcrypt = require("bcrypt");

/////////////////// User Validation ///////////////////
const joi = require("joi");
const schema = joi.object({
  username: joi.string().min(3).max(255).required(),
  password: joi.string().min(6).max(255).required(),
});

/////////////////// Cookie Parser ///////////////////
// const cookieParser = require("cookie-parser");

/////////////////// Database Connection ///////////////////
const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

/////////////////// Server use/middlewares ///////////////////
server.use(express.json());

/////////////////// User endpoints ///////////////////
server.get("/userLogin", (req, res) => {
  res.status(200).send(`Got your GET request`);
});

server.post("/userReg", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const validation = schema.validate({username: username, password: password});
  console.log(username, password);
  if (!validation.error) {
    const hashedPassword = bcrypt.hashSync(password, 10);

    const addUser = "insert into user (username, password) values(?,?)";

    pool.execute(addUser, [username, hashedPassword], (error, result) => {
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
        console.log(result);
        res.status(201).send("Added new user");
      }
    });
  } else {
    console.log(validation.error.message);
    res.status(406).send(validation.error.message);
  }
});

/////////////////// TODO endpoints ///////////////////
server.get("/todoGet", (req, res) => {
  res.status(200).send(`Got your GET request`);
});

server.get("/todoGetAll", (req, res) => {
  res.status(200).send(`Got your GET request`);
});

server.post("/todoPost", (req, res) => {
  res.status(200).send("Got your POST request to /addTodo");
});

server.patch("/todoEdit", (req, res) => {
  res.status(200).send("Got your PATCH request");
});

server.delete("/todoDelete", (req, res) => {
  res.status(200).send("Got your DELETE request");
});

/////////////////// Friend endpoints ///////////////////
server.get("/friendGet", (req, res) => {
  res.status(200).send("Got your POST request to /addTodo");
});

server.post("/friendAdd", (req, res) => {
  res.status(200).send("Got your POST request to /addTodo");
});

server.delete("/friendDelete", (req, res) => {
  res.status(200).send("Got your DELETE request to /friendDelete");
});

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
