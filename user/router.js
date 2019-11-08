const { Router } = require('express')
const User = require('./model')
const router = new Router()

const bcrypt = require('bcryptjs')

router.post('/signup', (req, res, next) => {
  const user = {
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 10)
  }
  User
    .create(user)
    .then(user => res.send({ message: "Account created" }))
    .catch(next)
})

module.exports = router