const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')

const middleware = cors()

app.use(middleware)

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

const cityRouter = require('./city/router')
app.use(cityRouter)

const eventRouter = require('./event/router')
app.use(eventRouter)

const userRouter = require('./user/router')
app.use(userRouter)