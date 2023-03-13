const dotenv = require("dotenv");
dotenv.config();

const SECRET_TOKEN = process.env.SECRET_TOKEN;
if (!SECRET_TOKEN) throw new Error("Du måste ange en SECRET_TOKEN i .env-filen!");

const {parseCookies} = require("./utils");

exports.generateToken = () => {
  return SECRET_TOKEN;
};

exports.verifyToken = (req, res, next) => {
  const {loginCookie} = parseCookies(req.headers.cookie);
  if (loginCookie !== SECRET_TOKEN) return res.status(401).send("You are not logged in");

  next();
};
