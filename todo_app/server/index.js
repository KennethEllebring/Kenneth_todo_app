const express = require("express");
const server = express();
const port = 5050;
const {users} = require("./bd");

server.use(express.json());

server.get("/", (req, res) => {
  console.log(users);
  const allUsers = JSON.stringify(users);
  res.status(200).send(`Got your GET request, here is all users: ${allUsers}`);
});

server.post("/", (req, res) => {
  res.status(200).send("Got your POST request");
});

server.patch("/", (req, res) => {
  res.status(200).send("Got your PATCH request");
});

server.delete("/", (req, res) => {
  res.status(200).send("Got your DELETE request");
});

server.listen(port, console.log(`Servern lyssnar på port ${port}`));
