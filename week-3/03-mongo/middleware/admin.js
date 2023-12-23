const { Admin } = require("../db");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const username = req.headers.username;
  const password = req.headers.password;
  const adminObject = await Admin.findOne({ username, password });
  if (!adminObject) {
    res.status(401);
  } else {
    // passing admin object to res.locals
    res.locals.adminObject = adminObject;
    next();
  }
}

module.exports = adminMiddleware;
