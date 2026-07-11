const express = require("express");
const router = express.Router();

const {
  getBlogs,
  createBlog,
  deleteBlog,
  updateBlog
} = require("../controllers/blogController");

router.get("/", getBlogs);
router.post("/", createBlog);
router.delete("/:id", deleteBlog);
router.put("/:id", updateBlog);

module.exports = router;