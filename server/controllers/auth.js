const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.models.user;

exports.register = async (req, res) => {
  const { username, email, password, name, userImage } = req.body;
  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await User.create({ username, email, password, name, userImage });
    const token = jwt.sign(
      { user_id: user.user_id, username: user.username, name: user.name, userImage: user.userImage },
      process.env.JWT_SECRET,
      { expiresIn: '14d' }
    );
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { user_id: user.user_id, username: user.username, name: user.name, userImage: user.userImage },
      process.env.JWT_SECRET,
      { expiresIn: '14d' }
    );
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
