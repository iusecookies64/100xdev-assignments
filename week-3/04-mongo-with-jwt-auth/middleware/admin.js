const jwt = require("jsonwebtoken");
const jwtPassword = process.env.JWT_SECRET;
const { Admin } = require("../db");
// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  try {
    const decoded = jwt.verify(req.headers.authorization, jwtPassword);
    // checking in db if user exist or not
    const username = decoded.username;
    const adminObject = await Admin.findOne({ username });
    if (!adminObject) {
      throw Error("invalid credentials");
    }
    res.locals.adminObject = adminObject;
    next();
  } catch (err) {
    res.status(401).json({
      message: "access denied",
    });
  }
}

module.exports = adminMiddleware;
