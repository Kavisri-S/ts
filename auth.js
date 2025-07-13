const router = require('express').Router();
const { User } = require('./model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

router.post('/signup', async (req, res) => {
  const exists = await User.findOne({ username: req.body.username });
  if (exists) return res.status(400).json({ error: "Username already exists" });

  const newUser = new User(req.body);
  await newUser.save();
  res.json({ message: `${newUser.username} registered successfully` });
});

router.post('/signin', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send("Unauthorized");
  }

  const token = jwt.sign({ user: username }, process.env.SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
