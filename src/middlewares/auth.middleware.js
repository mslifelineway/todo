const jwt = require("jsonwebtoken");

exports.verifyJwt = (req, res, next) => {
  let token = req.headers.authorization;
  console.log(req.headers, token, "token...");
  if (!token) {
    res.status(401).json({
      message: "Token is missing",
    });
  } else {
    token = token.split(" ")[1];
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      req.user = jwt.decode(token);
      next();
    } catch (error) {
      res.status(401).json({
        message: "Token has expired",
      });
    }
  }
};
