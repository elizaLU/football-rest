const Sequelize = require('sequelize')
const db = require('../db')

const Team = db.define('team',
  {
    name: {
      type: Sequelize.STRING,
      field: 'team_name' //column name
    }
  },
  // {
  //   timestamps: false
  // }
  //,{ tableName: 'Teams' } db table name
)

//console.log("Team from team model:", Team)
module.exports = Team