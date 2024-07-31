const db = require('../models');
const User = db.models.user;

const DEFAULT_AVATAR = '/uploads/default-avatar.png';

exports.getUserProfile = async (req, res) => {
    try {
        console.log('getUserProfile called for user_id:', req.user.user_id);
        
        const user = await User.findByPk(req.user.user_id, {
            attributes: ['username', 'email', 'name', 'userImage']
        });
        
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('User found in database:', user.toJSON());

        const responseData = {
            username: user.username,
            email: user.email,
            name: user.name,
            userImage: user.userImage || DEFAULT_AVATAR
        };

        console.log('Sending response:', responseData);

        res.json(responseData);
    } catch (error) {
        console.error('Error in getUserProfile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
      console.log('updateUserProfile called with data:', req.body);
  
      const user = await User.findByPk(req.user.user_id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const updatedUser = await user.update({
        username: req.body.username,
        name: req.body.name,
        bio: req.body.bio,
        userImage: req.body.profileImage || user.userImage || DEFAULT_AVATAR
      });
      
      console.log('Updated user in database:', updatedUser.toJSON());

        const responseData = {
            username: updatedUser.username,
            email: updatedUser.email,
            name: updatedUser.name,
            userImage: updatedUser.userImage
        };

        console.log('Sending response:', responseData);

        res.json(responseData);
    } catch (error) {
        console.error('Error in updateUserProfile:', error);
        res.status(400).json({ error: error.message });
    }
};

exports.deleteUserProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.user_id);
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }
        await user.destroy();
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.searchUsers = async (req, res) => {
    const { query } = req.query;
    try {
        const users = await User.findAll({
        where: {
            [db.Sequelize.Op.or]: [
            { username: { [db.Sequelize.Op.like]: `%${query}%` } },
            { email: { [db.Sequelize.Op.like]: `%${query}%` } },
            { name: { [db.Sequelize.Op.like]: `%${query}%` } }
            ]
        },
        attributes: ['username', 'email', 'name', 'userImage']
        });
        res.json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
