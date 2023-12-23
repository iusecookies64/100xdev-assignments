const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Course, Admin } = require("../db");

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  // checking if username is unique or not
  const checkExistence = await Admin.findOne({ username });
  if (checkExistence) {
    res.status(401);
    res.json({ message: "Username already exist" });
    return;
  }

  const newAdmin = new Admin({ username, password });

  res.json({ message: "Admin created successfully" });
  newAdmin.save();
});

router.post("/courses", adminMiddleware, async (req, res) => {
  const username = req.headers.username;
  const password = req.headers.password;
  const adminObject = res.locals.adminObject; // passed from auth middleware
  const { title, description, price, imageLink } = req.body;
  const course = new Course({
    title,
    description,
    price,
    imageLink,
    published: true,
  });
  adminObject.courses.push(course["_id"]);
  res.json({ message: "course created successfully", courseId: course["_id"] });
  adminObject.save();
  course.save();
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const adminObject = await res.locals.adminObject.populate("courses");
  res.json(adminObject.courses);
});

module.exports = router;
