const Sequelize = require('sequelize')
const db = require('../db')
const City = require('../city/model')
const Player = require("../player/model")
const Event = require("../event/model")


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

Team.belongsToMany(Event, {
  through: 'TeamEvents'
})
Event.belongsToMany(Team, {
  through: 'Team'
})

City.hasMany(Team)


module.exports = Team