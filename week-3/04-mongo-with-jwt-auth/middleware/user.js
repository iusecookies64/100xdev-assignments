const jwt = require("jsonwebtoken");
const jwtPassword = process.env.JWT_SECRET;
const { User } = require("../db");

async function userMiddleware(req, res, next) {
  // Implement user auth logic
  try {
    const decoded = jwt.verify(req.headers.authorization, jwtPassword);
    const userObject = await User.findOne({ username: decoded.username });
    if (!userObject) {
      console.log("invalid token");
      throw Error("invalid credentials");
    }

    res.locals.userObject = userObject;
    next();
  } catch (err) {
    console.log("ye kya hogaya");
    res.status(401).json({
      message: "invalid token",
    });
  }
}

module.exports = userMiddleware;
