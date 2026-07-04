const Post = require("../models/Post");

// Create Post
const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Please provide title and content",
      });
    }

    const post = await Post.create({
      title,
      content,
      author: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Posts
const getAllPosts = async (req, res) => {
  try {
    // Query Parameters
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const search = req.query.search || "";

    // Search Filter
    const filter = {
      title: {
        $regex: search,
        $options: "i",
      },
    };

    // Total Posts
    const totalPosts = await Post.countDocuments(filter);

    // Fetch Posts
    const posts = await Post.find(filter)
      .populate("author", "username email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      totalPosts,
      posts,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Logged-in User Posts
const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({
      author: req.user._id,
    })
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Post
const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "username email"
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      post,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Post
const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Ownership Check
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this post",
      });
    }

    post.title = title || post.title;
    post.content = content || post.content;

    await post.save();

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Ownership Check
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this post",
      });
    }

    await post.deleteOne();

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getMyPosts,
  getSinglePost,
  updatePost,
  deletePost,
};