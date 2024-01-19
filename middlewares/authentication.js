const jwt = require('jsonwebtoken');

exports.isAuthenticated = async (req, res, next) => {
  try {
    // Retrieve the token from the cookie
    const token = req.cookies.token;
    if (!token) {
      // If no token is present, it's unauthorized
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access! Please Login First",
      });
    }

    // Verify the token
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Attach the decoded user information to the request
    req.user = decode;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // If there's an error with token verification, it's unauthorized
    res.status(401).json({
      success: false,
      message: "Unauthorized Access! Please Login First",
    });
  }
};

