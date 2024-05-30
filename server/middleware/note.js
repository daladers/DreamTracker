const db = require('../models');

const noteMiddleware = async (req, res, next) => {
    const noteId = req.params.noteId;
    try {
      const note = await db.models.note.findByPk(noteId);
      if (!note) {
        return res.status(404).json({ error: 'Note not found' });
      }
      req.note = note;
      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = {noteMiddleware};