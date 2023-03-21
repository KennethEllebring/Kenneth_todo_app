const express = require("express");
const cors = require("cors");
const port = 5000;

const {verifyLogin} = require("./utility/authorisation");
const {jwtValidation} = require("./utility/validation");

const {userLogin} = require("./controller/userLogin.js");
const {userReg} = require("./controller/userReg.js");
const {userList} = require("./controller/userList");
const {todoGetAll} = require("./controller/todoGetAll");
const {todoGetId} = require("./controller/todoGetId");
const {todoPatch} = require("./controller/todoPatch");
const {todoPost} = require("./controller/todoPost");
const {todoDelete} = require("./controller/todoDelete");
const {friendsGet} = require("./controller/friendsGet");
const {friendAdd} = require("./controller/friendAdd");
const {friendTodo} = require("./controller/friendTodo");
const {friendDelete} = require("./controller/friendDelete");

const app = express();

app.use(express.json());
app.use(cors({origin: "http://localhost:3000", credentials: true}));

app.post("/userLogin", userLogin);

app.post("/userReg", userReg);

app.get("/userList/get", [verifyLogin, jwtValidation], userList);

app.get("/todo/get", [verifyLogin, jwtValidation], todoGetAll);

app.get("/todo/get/:id", [verifyLogin, jwtValidation], todoGetId);

app.patch("/todo/patch/:id", [verifyLogin, jwtValidation], todoPatch);

app.post("/todo/post", [verifyLogin, jwtValidation], todoPost);

app.delete("/todo/delete/:id", [verifyLogin, jwtValidation], todoDelete);

app.get("/friends/get", [verifyLogin, jwtValidation], friendsGet);

app.post("/friend/add", [verifyLogin, jwtValidation], friendAdd);

app.get("/friend/:id", [verifyLogin, jwtValidation], friendTodo);

app.delete("/friend/delete/:id", [verifyLogin, jwtValidation], friendDelete);

app.listen(port, () => console.log(`server running on port ${port}`));
