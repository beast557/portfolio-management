const Sequelize = require('sequelize');

const sequelize = new Sequelize('portfolio', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  logging: false
});

module.exports = sequelize;
