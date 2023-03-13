/////////////////// Server ///////////////////
const express = require("express");
const server = express();
const port = 5050;
const cors = require("cors");

/////////////////// Password Encryption ///////////////////
const bcrypt = require("bcrypt");

/////////////////// User Validation ///////////////////
const joi = require("joi");
const schema = joi.object({
  username: joi.string().min(3).max(255).required(),
  password: joi.string().min(6).max(255).required(),
});

/////////////////// Cookie Gifter ///////////////////

const {generateToken, verifyToken} = require("./authorisation.js");

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
server.use(cors({origin: "http://localhost:3000", credentials: true}));

/////////////////// User endpoints ///////////////////
server.post("/userLogin", (req, res) => {
  const {username, password} = req.body;
  console.log(username, password);
  const validation = schema.validate({username: username, password: password});
  if (!validation.error) {
    const loginUser = "SELECT password FROM user where username = ?";

    pool.execute(loginUser, [username], (error, result) => {
      if (error) {
        res.status(500).send("Server error, reload and try again");
      } else {
        if (result[0] === undefined) {
          res.status(400).send("Enter a correct username");
          return;
        } else {
          const hashedPassword = result[0].password;

          bcrypt.compare(password, hashedPassword, function (error, result) {
            if (result === true) {
              return res
                .cookie("loginCookie", generateToken(username), {
                  maxAge: 1000 * 60 * 60,
                  path: "/",
                  httpOnly: true,
                })
                .status(200)
                .send("You are logged in, here is a cookie");
            } else if (error) {
              res.status(400).send(error);
            } else {
              res.status(401).send("Wrong password, try again");
            }
          });
        }
      }
    });
  } else {
    console.log(validation.error.message);
    res.status(406).send(validation.error.message);
  }
});

server.post("/userReg", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const validation = schema.validate({username: username, password: password});
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

server.post("/todoGetAll", verifyToken, (req, res) => {
  const username = req.body.username;

  const allTodo = "select todo from todo where username = ?";

  pool.execute(allTodo, [username], (error, result) => {
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
        res.status(200).send("You don't have any ToDos =,(");
      } else {
        console.log(result);
        const answer = JSON.stringify(result);
        res.status(200).send(answer);
      }
    }
  });
});

server.get("/todoGet", verifyToken, (req, res) => {
  // TODO:
  res.status(200).send(`Got your GET request`);
});

server.post("/todoPost", verifyToken, (req, res) => {
  // TODO:
  res.status(200).send("Got your POST request to /addTodo");
});

server.patch("/todoEdit", verifyToken, (req, res) => {
  // TODO:
  res.status(200).send("Got your PATCH request");
});

server.delete("/todoDelete", verifyToken, (req, res) => {
  // TODO:
  res.status(200).send("Got your DELETE request");
});

/////////////////// Friend endpoints ///////////////////
server.get("/friendGet", verifyToken, (req, res) => {
  // TODO:
  res.status(200).send("Got your POST request to /addTodo");
});

server.post("/friendAdd", verifyToken, (req, res) => {
  // TODO:
  res.status(200).send("Got your POST request to /addTodo");
});

server.delete("/friendDelete", verifyToken, (req, res) => {
  // TODO:
  res.status(200).send("Got your DELETE request to /friendDelete");
});

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
