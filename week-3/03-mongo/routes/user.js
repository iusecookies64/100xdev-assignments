const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;

  // checking if user already exist
  const check = await User.findOne({ username });
  if (check) {
    res.status(401).json({ message: "user already exist" });
    return;
  }

  // making new user
  const user = new User({ username, password });
  res.status(200).json({ message: "user sign up successful" });
  user.save();
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const coursesList = await Course.find();
  res.json(coursesList);
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const course = await Course.findOne({ _id: courseId });
  if (!course) {
    res.status(404).json({ message: "course id is not valid" });
    return;
  }

  // getting user document
  const user = res.locals.userObject;

  // adding course id to user courses
  user.courses.push(course["_id"]);
  user.save();

  res.status(200).json({ message: "course purchased successfully" });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const user = await res.locals.userObject.populate("courses");
  res.json(user.courses);
});

module.exports = router;
