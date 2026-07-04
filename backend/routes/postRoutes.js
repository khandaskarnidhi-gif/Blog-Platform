const express = require("express");
const router = express.Router();

const {
  createPost,
  getAllPosts,
  getMyPosts,
  getSinglePost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const { protect } = require("../middleware/authMiddleware");

// Public Route
router.get("/", getAllPosts);

router.get("/my-posts", protect, getMyPosts);

router.get("/:id", getSinglePost);

// Protected Route
router.post("/", protect, createPost);

router.put("/:id", protect, updatePost);

router.delete("/:id", protect, deletePost);

module.exports = router;