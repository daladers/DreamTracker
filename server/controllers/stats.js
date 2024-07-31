const { Op } = require('sequelize');
const db = require('../models');
const Note = db.models.note;

const getStats = async (req, res) => {
  const { startDate, endDate, user_id } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({ error: 'Start date and end date are required' });
  }

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    start.setUTCHours(0, 0, 0, 0);
    end.setUTCHours(23, 59, 59, 999);

    const notes = await Note.findAll({
      where: {
        date: {
          [Op.between]: [start.toISOString(), end.toISOString()],
        },
        user_id: user_id
      },
      attributes: ['text', 'reactions', 'note_id'],
    });

    const reactionCounts = notes.reduce((acc, note) => {
      if (!note.reactions) return acc;

      let reactions;
      try {
        reactions = JSON.parse(note.reactions);
        if (!Array.isArray(reactions)) {
          reactions = [reactions];
        }
      } catch (e) {
        reactions = [note.reactions];
      }

      reactions.forEach(reaction => {
        if (!reaction) return;
        acc[reaction] = (acc[reaction] || 0) + 1;
      });

      return acc;
    }, {
      'satisfaction': 0,
      'love': 0,
      'haha': 0,
      'sad': 0,
      'angry': 0,
      'surprise': 0
    });

    const totalNotes = notes.length;

    res.json({ reactionCounts, totalNotes });
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {getStats};