module.exports = (sequelize, DataTypes, models) => {
const note = sequelize.define('note', {
  note_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  reactions: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: models.user,
      key: 'user_id',
    },
  },
}, {
  tableName: 'note',
  timestamps: false,
});

models.user.hasMany(note, { foreignKey: 'user_id' });
note.belongsTo(models.user, { foreignKey: 'user_id' });

return note;
};
