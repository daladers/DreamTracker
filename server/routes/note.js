const express = require('express');
const { getNoteInterpretations, saveNote, getNote } = require('../controllers/note');
const { authenticateToken, authorizeNoteAccess } = require('../middleware/auth');
const { noteMiddleware } = require('../middleware/note');

const router = express.Router();

router.post('/save', saveNote);
router.get('/getNote', authenticateToken, getNote);
router.get('/getInterpretation/:noteId', authenticateToken, authorizeNoteAccess, noteMiddleware, getNoteInterpretations);

module.exports = router;
