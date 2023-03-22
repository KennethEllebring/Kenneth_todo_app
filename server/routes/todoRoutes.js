const express = require("express");

const {todoGetAll} = require("../controller/todoControllers/todoGetAll");
const {todoGetId} = require("../controller/todoControllers/todoGetId");
const {todoPatch} = require("../controller/todoControllers/todoPatch");
const {todoPost} = require("../controller/todoControllers/todoPost");
const {todoDelete} = require("../controller/todoControllers/todoDelete");

const todoRoutes = express.Router();

todoRoutes.get("/todo/get", todoGetAll);

todoRoutes.get("/todo/get/:id", todoGetId);

todoRoutes.post("/todo/post", todoPost);

todoRoutes.patch("/todo/patch/:id", todoPatch);

todoRoutes.delete("/todo/delete/:id", todoDelete);

exports.todoRoutes = todoRoutes;
