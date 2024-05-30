const Sequelize = require('sequelize');
const config = require('../config/config')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
});

const db = {
  sequelize,
  Sequelize,
  models: {}
};

// Import models
db.models.user = require('./user')(sequelize, Sequelize.DataTypes);
db.models.note = require('./note')(sequelize, Sequelize.DataTypes,  db.models);
db.models.interpretation = require('./interpretation')(sequelize, Sequelize.DataTypes);

module.exports = db;
