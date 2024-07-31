// models/friend.js
module.exports = (sequelize, DataTypes) => {
    const Friend = sequelize.define('friend', {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      friendId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
        defaultValue: 'pending',
      },
    }, {
      tableName: 'friends',
      timestamps: false,
    });
  
    Friend.associate = (models) => {
      Friend.belongsTo(models.user, { as: 'friend', foreignKey: 'friendId' });
    };
  
    return Friend;
  };
  