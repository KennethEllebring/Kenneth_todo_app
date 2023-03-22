const express = require("express");

const {userLogin} = require("../controller/userControllers/userLogin");
const {userReg} = require("../controller/userControllers/userReg");

const userAuthRoutes = express.Router();

userAuthRoutes.post("/userLogin", userLogin);

userAuthRoutes.post("/userReg", userReg);

exports.userAuthRoutes = userAuthRoutes;
