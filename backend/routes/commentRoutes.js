const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  addComment,
  getComments,
  deleteComment,
} = require("../controllers/commentController");

// Public
router.get("/:postId", getComments);

// Protected
router.post("/:postId", protect, addComment);

router.delete("/:commentId", protect, deleteComment);

module.exports = router;