const Sequelize = require('sequelize')
const db = require('../db')
const City = require('../city/model')
const Player = require("../player/model")


const Team = db.define('team',
  {
    name: {
      type: Sequelize.STRING,
      field: 'team_name' //column name
    }
  }
)

Player.belongsTo(Team)

Team.belongsTo(City)
Team.hasMany(Player)


City.hasMany(Team)



//console.log("Team from team model:", Team)
module.exports = Team