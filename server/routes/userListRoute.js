const express = require("express");

const {userList} = require("../controller/userControllers/userList");

const userListRoute = express.Router();

userListRoute.get("/userList/get", userList);

exports.userListRoute = userListRoute;
