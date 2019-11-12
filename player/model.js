const Sequelize = require('sequelize')
const db = require('../db')
const City = require('../city/model')

const Player = db.define('player',
  {
    name: {
      type: Sequelize.STRING,
      field: 'name' //column name
    },
    number: {
      type: Sequelize.INTEGER,
      field: 'number'
    }
  }
)


Player.belongsTo(City)

module.exports = Player