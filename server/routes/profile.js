const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const {getUserProfile, updateUserProfile, deleteUserProfile, searchUsers} = require('../controllers/profile');

const router = express.Router();

router.get('/:id', authenticateToken, getUserProfile);
router.put('/:id', authenticateToken, updateUserProfile);
router.delete('/:id', authenticateToken, deleteUserProfile);
router.get('/search', authenticateToken, searchUsers);

module.exports = router;