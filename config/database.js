const Sequelize = require('sequelize');

module.exports = new Sequelize('codegig', 'postgres', '123456',
{
host: 'localhost',
dialect: 'sqlite',


pool: {
  max: 5,
  min: 0,
  idle: 10000
},

});
