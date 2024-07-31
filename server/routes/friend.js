// routes/friend.js
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const {addFriend, acceptFriend, listFriends} = require('../controllers/friend');

router.post('/add', authenticateToken, addFriend);
router.post('/accept', authenticateToken, acceptFriend);
router.get('/list', authenticateToken, listFriends);

module.exports = router;
