const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db");
const jwt = require("jsonwebtoken");
const jwtPassword = process.env.JWT_SECRET;

// Admin Routes
router.post("/signup", (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  Admin.create({
    username,
    password,
  });

  res.json({
    message: "Admin sign up successful",
  });
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  // checking if admin exist in db
  const adminObject = await Admin.findOne({ username, password });
  if (!adminObject) {
    res.json({
      message: "invalid username or password",
    });
    return;
  }

  // signing in the user using jwt and sending back token
  const token = jwt.sign({ username }, jwtPassword);
  res.json({
    message: "sign in successful",
    token,
  });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  const { title, description, price, imageLink } = req.body;
  const adminObject = res.locals.adminObject;
  console.log("admin object from req handler");
  console.log(adminObject);
  const course = new Course({
    title,
    description,
    price,
    imageLink,
    published: true,
  });

  // adding course to admin's list of courses
  adminObject.courses.push(course["_id"]);

  // saving admin andn course objects
  course.save();
  adminObject.save();

  res.json({
    message: "course created successfully",
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const adminObject = await res.locals.adminObject.populate("courses");
  res.json(adminObject.courses);
});

module.exports = router;
