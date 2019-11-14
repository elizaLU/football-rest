const Sequelize = require('sequelize')
const db = require('../db')




const City = db.define('city',
  {
    name: {
      type: Sequelize.STRING,
      field: 'city' //column name
    },
    population: {
      type: Sequelize.INTEGER,
      field: 'population'
    }
  }
)

module.exports = City