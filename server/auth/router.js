const { Router } = require('express')
const { toJWT, toData } = require('./jwt')

const router = new Router()

//POST /login

module.exports = router