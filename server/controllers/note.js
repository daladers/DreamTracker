// controllers/noteController.js
const { Op } = require('sequelize');
const db = require('../models');
const note = db.models.note;
const interpretation = db.models.interpretation;

const getNoteInterpretations = async (req, res) => {
    const { note } = req;
  
    if (!note || !note.text) {
      return res.status(400).json({ error: 'Note or note text is missing' });
    }
  
    const wordsInNote = note.text.split(/\s+/); // Split text into words
  
    try {
      const interpretations = await interpretation.findAll({
        where: {
          word: {
            [Op.in]: wordsInNote,
          },
        },
      });
  
      const result = interpretations.map((interpretation) => ({
        word: interpretation.word,
        result: interpretation.result,
      }));
  
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };  
  
const saveNote = async (req, res) => {
    const { text, reactions, date, user_id } = req.body;
    try {
                // Parse the incoming date string to a Date object
                const startOfDay = new Date(date);
                startOfDay.setUTCHours(0, 0, 0, 0); // Set to the start of the day (UTC)
                
                const endOfDay = new Date(date);
                endOfDay.setUTCHours(23, 59, 59, 999); // Set to the end of the day (UTC)

        const existingNote = await note.findOne({
            where: {
                date:  {
                    [Op.between]: [startOfDay.toISOString(), endOfDay.toISOString()]
                },
                user_id: user_id,
            },
        });

        if (existingNote) {
            existingNote.text = text;
            existingNote.reactions = reactions;
            await existingNote.save();
            res.status(200).json(existingNote);
        } else {
            const newNote = await note.create({ text, reactions, date, user_id });
            res.status(201).json(newNote);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getNote = async (req, res) => {
    const { userId, date } = req.query;

    try {
        // Parse the incoming date string to a Date object
        const startOfDay = new Date(date);
        startOfDay.setUTCHours(0, 0, 0, 0); // Set to the start of the day (UTC)
        
        const endOfDay = new Date(date);
        endOfDay.setUTCHours(23, 59, 59, 999); // Set to the end of the day (UTC)

        const notes = await note.findAll({
            where: {
                user_id: userId,
                date: {
                    [Op.between]: [startOfDay.toISOString(), endOfDay.toISOString()]
                },
            },
            attributes: ['text', 'reactions', 'note_id'],
        });

        res.json(notes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = { getNoteInterpretations, saveNote, getNote };
