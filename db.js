const Sequelize = require('sequelize')

const databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:football-rest@localhost:5432/postgres'
//heroku => app => settings=>reveal config vars => (see that postgres://jnbbxojfjtiegb:fb90b2649e143e4f7dfb57c75da4c7770c36aff1b515632931d7c7fbe03d8f03@ec2-54-246-92-116.eu-west-1.compute.amazonaws.com:5432/d8jm3gub7gn387)
// => heroku won't sync local and remote dbs
const db = new Sequelize(databaseUrl)

db
  .sync({ force: true })
  .then(() => console.log("Database schema updated"))
  .catch(console.error)



module.exports = db