const { User } = require("../db");

async function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const username = req.headers.username;
  const password = req.headers.password;
  const userObject = await User.findOne({ username, password });
  if (!userObject) {
    res.status(401);
    res.json({ message: "invalid username or password" });
  } else {
    // adding userObject to res.locals
    res.locals.userObject = userObject;
    next();
  }
}

module.exports = userMiddleware;
