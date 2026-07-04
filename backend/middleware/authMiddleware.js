const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  try {
    // Check Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user without password
      req.user = await User.findById(decoded.id).select("-password");

      return next();
    }

    return res.status(401).json({
      success: false,
      message: "Not authorized. No token provided.",
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized. Invalid token.",
    });
  }
};

module.exports = {
  protect,
};