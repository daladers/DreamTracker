// controllers/friendController.js
const db = require('../models');
const Friend = db.models.friend;

exports.addFriend = async (req, res) => {
  const { friendId } = req.body;
  try {
    const existingFriendship = await Friend.findOne({
      where: { userId: req.user.user_id, friendId }
    });
    if (existingFriendship) {
      return res.status(400).json({ message: 'Friend request already sent' });
    }
    await Friend.create({ userId: req.user.user_id, friendId });
    res.status(201).json({ message: 'Friend request sent' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.acceptFriend = async (req, res) => {
  const { friendId } = req.body;
  try {
    const friendship = await Friend.findOne({
      where: { userId: friendId, friendId: req.user.user_id, status: 'pending' }
    });
    if (!friendship) {
      return res.status(404).json({ message: 'Friend request not found' });
    }
    friendship.status = 'accepted';
    await friendship.save();
    res.status(200).json({ message: 'Friend request accepted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listFriends = async (req, res) => {
  try {
    const friends = await Friend.findAll({
      where: { 
        userId: req.user.user_id,
        status: 'accepted'
      },
      include: [{
        model: db.models.user,
        as: 'friend'
      }]
    });
    res.json(friends);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
