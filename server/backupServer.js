// const express = require("express");
// const server = express();
// const port = 5000;
// const mysql = require("mysql2");
// const dotenv = require("dotenv");
// dotenv.config();
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const bcrypt = require("bcrypt");
// const {parseCookie} = require("./utility/utils");
// const {verifyLogin} = require("./utility/authorisation");

// const db = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
// });

// const joi = require("joi");
// const schema = joi.object({
//   username: joi.string().min(3).max(255).required(),
//   password: joi.string().min(6).max(255).required(),
// });

// server.use(cors({origin: "http://localhost:3000", credentials: true}));
// server.use(express.json());
// server.use(bodyParser.urlencoded({extended: true}));

// server.post("/userLogin", (req, res) => {
// const {username, password} = req.body;
// console.log(username, password);
// const validation = schema.validate({username: username, password: password});
// if (!validation.error) {
//   const loginUser = "SELECT password FROM user WHERE username = ?";

//   db.execute(loginUser, [username], (error, result) => {
//     if (error) {
//       res.status(500).send("Server error, reload and try again");
//     } else {
//       if (result[0] === undefined) {
//         res.status(401).send("Enter a correct username");
//         return;
//       } else {
//         const hashedPassword = result[0].password;

//         bcrypt.compare(password, hashedPassword, function (error, result) {
//           if (result === true) {
//             return res
//               .cookie("loginCookie", username, {
//                 maxAge: 1000 * 60 * 10,
//                 path: "/",
//                 httpOnly: true,
//               })
//               .status(200)
//               .send("You are logged in, here is a cookie");
//           } else if (error) {
//             res.status(400).send(error);
//           } else {
//             res.status(401).send("Wrong password, try again");
//           }
//         });
//       }
//     }
//   });
// } else {
//   console.log(validation.error.message);
//   res.status(406).send(validation.error.message);
// }
// });

// server.post("/userReg", (req, res) => {
// const {username, password} = req.body;

// const validation = schema.validate({username: username, password: password});
// if (!validation.error) {
//   const hashedPassword = bcrypt.hashSync(password, 10);

//   const addUser = "INSERTR INTO user (username, password) VALUES(?,?)";

//   db.execute(addUser, [username, hashedPassword], (error, result) => {
//     if (error) {
//       if (error.errno === -4078) {
//         console.log(error);
//         res.status(503).send("Can't connect to server right now, please reload page and try again");
//       } else if (error.errno === 1062) {
//         console.log(error);
//         res.status(409).send("Username allready in use");
//       } else {
//         console.log(error);
//         res.status(400).send("Something went wrong, please reload page and try again");
//       }
//     } else {
//       console.log(result);
//       res.status(201).send("Added new user");
//     }
//   });
// } else {
//   console.log(validation.error.message);
//   res.status(406).send(validation.error.message);
// }
// });

// server.get("/todo/get", verifyLogin, (req, res) => {
// const {loginCookie} = parseCookie(req.headers.cookie);
// const sqlGet = "SELECT * FROM todo WHERE username = ?";

// db.execute(sqlGet, [loginCookie], (error, result) => {
//   if (error) {
//     if (error.errno === -4078) {
//       console.log(error);
//       res.status(503).send("Can't connect to server right now, please reload page and try again");
//     } else {
//       console.log(error);
//       res.status(400).send("Something went wrong, please reload page and try again");
//     }
//   } else {
//     if (result[0] === undefined) {
//       res.status(200).send("You don't have any ToDos");
//     } else {
//       console.log(result);
//       res.status(200).send(result);
//     }
//   }
// });
// });

// server.get("/todo/get/:id", verifyLogin, (req, res) => {
// const {id} = req.params;
// const sqlGet = "SELECT * FROM todo WHERE id = ?";

// db.execute(sqlGet, [id], (error, result) => {
//   if (error) {
//     if (error.errno === -4078) {
//       console.log(error);
//       res.status(503).send("Can't connect to server right now, please reload page and try again");
//     } else {
//       console.log(error);
//       res.status(400).send("Something went wrong, please reload page and try again");
//     }
//   } else {
//     if (result[0] === undefined) {
//       res.status(200).send("You don't have any ToDos");
//     } else {
//       console.log(result);
//       res.status(200).send(result);
//     }
//   }
// });
// });

// server.patch("/todo/patch/:id", verifyLogin, (req, res) => {
// const {id} = req.params;
// const {username, todo} = req.body;

// const sqlUpdate = "UPDATE todo SET username = ?, todo = ? WHERE id = ?";

// db.execute(sqlUpdate, [username, todo, id], (error, result) => {
//   if (error) {
//     if (error.errno === -4078) {
//       console.log(error);
//       res.status(503).send("Can't connect to server right now, please reload page and try again");
//     } else {
//       console.log(error);
//       res.status(400).send("Something went wrong, please reload page and try again");
//     }
//   } else {
//     if (result[0] === undefined) {
//       res.status(200).send("You don't have any ToDos");
//     } else {
//       console.log(result);
//       res.status(200).send(result);
//     }
//   }
// });
// });

// server.post("/todo/post", verifyLogin, (req, res) => {
//   const {username, todo} = req.body;
//   sqlPost = "INSERT INTO todo (username, todo) VALUES (? , ?)";

//   db.execute(sqlPost, [username, todo], (error, result) => {
//     if (error) {
//       console.log(error);
//     }
//   });
// });

// server.delete("/todo/delete/:id", verifyLogin, (req, res) => {
// const {id} = req.params;
// sqlDelete = "DELETE FROM todo WHERE id = ?";

// db.execute(sqlDelete, [id], (error, result) => {
//   if (error) {
//     console.log(error);
//   }
// });
// });

// server.listen(port, () => console.log(`server running on port ${port}`));
