const Sequelize = require('sequelize')
const db = require('../db')
const Team = require('../team/model')
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

Player.belongsTo(Team)
Player.belongsTo(City)
//Team.hasMany(Player)

//console.log("Player from team model:", Player)
module.exports = Player