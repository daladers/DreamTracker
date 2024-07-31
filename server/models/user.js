const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userImage: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '/uploads/default-avatar.png',
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'users',
    timestamps: false,
  });
  user.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  return user;
};
