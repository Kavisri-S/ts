const jwt = require('jsonwebtoken');
const { User } = require('./model');

// Middleware to check token
const tokenCheck = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send(" token missing");

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findOne({ username: verified.user }).select('-password');
    next();
  } catch (err) {
    return res.status(403).send("invalid token");
  }
};

// Middleware to check role
const roleCheck = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) return res.sendStatus(403);
    next();
  };
};

module.exports = { tokenCheck, roleCheck };
