const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwt = require("jsonwebtoken");
const jwtPassword = process.env.JWT_SECRET;

// User Routes
router.post("/signup", (req, res) => {
  // Implement user signup logic
  const { username, password } = req.headers;

  User.create({
    username,
    password,
  });

  res.json({
    message: "user sign up successful",
  });
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;

  // checking if username and password exist
  const userObject = await User.findOne({ username, password });
  if (!userObject) {
    res.status(401).json({
      message: "invalid credentials",
    });
    return;
  }

  const token = jwt.sign({ username }, jwtPassword);
  res.json({
    message: "sign in successful",
    token,
  });
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const courses = await Course.find();
  res.json(courses);
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const { userObject } = res.locals;
  const courseId = req.params.courseId;
  const course = await Course.findOne({ _id: courseId });
  if (!course) {
    res.status(404).json({
      message: "course not found",
    });
    return;
  }

  userObject.courses.push(course["_id"]);
  userObject.save();

  res.json({
    message: "course purchased successfully",
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const userObject = await res.locals.userObject.populate("courses");
  res.json(userObject.courses);
});

module.exports = router;
