const jwt = require('jsonwebtoken');
const db = require('../models');
const Note = db.models.note;

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const authorizeNoteAccess = async (req, res, next) => {
  const { noteId } = req.params;

  const note = await Note.findByPk(noteId);

  if (!note || note.user_id !== req.user.user_id) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  req.note = note;
  next();
};

module.exports = { authenticateToken, authorizeNoteAccess };
