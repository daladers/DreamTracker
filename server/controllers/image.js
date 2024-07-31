const path = require('path');
const fs = require('fs').promises;
const db = require('../models');
const User = db.models.user;

const DEFAULT_AVATAR = '/uploads/default-avatar.png';

exports.updateUserImage = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const imagePath = `/uploads/${req.file.filename}`;

    // Delete old image if it exists
    if (user.userImage && user.userImage !== DEFAULT_AVATAR) {
      const oldImagePath = path.join(__dirname, '..', 'public', user.userImage);
      await fs.unlink(oldImagePath).catch(console.error);
    }

    // Update user's image in the database
    await user.update({ userImage: imagePath });

    console.log(`Updated user ${userId} image to:`, imagePath);

    res.json({ 
      message: 'User image updated successfully', 
      imagePath: imagePath
    });
  } catch (error) {
    console.error('Error updating user image:', error);
    res.status(500).json({ message: 'Error updating user image' });
  }
};

exports.getUserImage = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ imagePath: user.userImage || DEFAULT_AVATAR });
  } catch (error) {
    console.error('Error getting user image:', error);
    res.status(500).json({ message: 'Error getting user image' });
  }
};

exports.deleteUserImage = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.userImage && user.userImage !== DEFAULT_AVATAR) {
      const imagePath = path.join(__dirname, '..', 'public', user.userImage);
      try {
        await fs.unlink(imagePath);
      } catch (err) {
        console.error('Error deleting image file:', err);
        // Continue execution even if file deletion fails
      }
    }

    await user.update({ userImage: DEFAULT_AVATAR });

    res.json({ message: 'User image deleted successfully', imagePath: DEFAULT_AVATAR });
  } catch (error) {
    console.error('Error deleting user image:', error);
    res.status(500).json({ message: 'Error deleting user image', error: error.message });
  }
};