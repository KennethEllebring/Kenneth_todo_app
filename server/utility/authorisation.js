const {parseCookie} = require("./utils");

exports.verifyLogin = (req, res, next) => {
  const {loginCookie} = parseCookie(req.headers.cookie);
  if (!loginCookie) return res.status(401).send("You are not logged in");

  next();
};
