const express = require("express");

const {friendsGet} = require("../controller/friendControllers/friendsGet");
const {friendAdd} = require("../controller/friendControllers/friendAdd");
const {friendTodo} = require("../controller/friendControllers/friendTodo");
const {friendDelete} = require("../controller/friendControllers/friendDelete");

const friendRoutes = express.Router();

friendRoutes.get("/friend/get", friendsGet);

friendRoutes.get("/friend/:id", friendTodo);

friendRoutes.post("/friend/add", friendAdd);

friendRoutes.delete("/friend/delete/:id", friendDelete);

exports.friendRoutes = friendRoutes;
