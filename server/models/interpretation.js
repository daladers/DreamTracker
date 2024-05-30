module.exports = (sequelize, DataTypes) => {
const interpretation = sequelize.define('interpretation', {
  word_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  word: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  result: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'interpretation',
  timestamps: false,
});

return interpretation;
};