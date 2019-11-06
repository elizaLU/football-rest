const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()
app.use(jsonParser)

const port = process.env.PORT || 4000

app.listen(port, () => console.log(`RESTful API listening on port ${port}`))

// const db = require('./db')
// const Team = require('./team/model')

const teamRouter = require('./team/router')
app.use(teamRouter)

const playerRouter = require('./player/router')
app.use(playerRouter)