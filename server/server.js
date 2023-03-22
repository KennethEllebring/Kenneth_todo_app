const express = require("express");
const cors = require("cors");
const port = 5000;

const {verifyLogin} = require("./utility/authorisation");
const {jwtValidation} = require("./utility/validation");
const {userAuthRoutes} = require("./routes/userAuthRoutes");
const {friendRoutes} = require("./routes/friendRoutes");
const {todoRoutes} = require("./routes/todoRoutes");
const {userListRoute} = require("./routes/userListRoute");

const app = express();

app.use(express.json());
app.use(cors({origin: "http://localhost:3000", credentials: true}));

app.use("/", userAuthRoutes);

app.use("/", [verifyLogin, jwtValidation], friendRoutes);

app.use("/", [verifyLogin, jwtValidation], todoRoutes);

app.use("/", [verifyLogin, jwtValidation], userListRoute);

app.listen(port, () => console.log(`server running on port ${port}`));
