const Sequelize = require('sequelize')
const db = require('../db')




const City = db.define('city',
  {
    name: {
      type: Sequelize.STRING,
      field: 'city' //column name
    },
    popluation: {
      type: Sequelize.INTEGER,
      field: 'popluation'
    }
  }
)




//console.log("Player from team model:", Player)
module.exports = City