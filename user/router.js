const { Router } = require('express')
const User = require('./model')
const { toJWT } = require('../server/auth/jwt') //JSON Web Token
const router = new Router()

const bcrypt = require('bcryptjs')

router.post('/signup', (req, res, next) => {
  const user = {
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 10)
  }
  User
    .create(user)
    .then(user => res.send(user))
    .catch(next)
})

router.post('/login', (req, res, next) => {
  const { name, password } = req.body

  User
    .findOne({ where: { name, password } })
    .then(user => {
      if (!user) {
        res.status(400).send('User not found.')
      }
      const { id } = user
      const jwt = toJWT({ userId: id })
      res.send({ jwt })
    })
})

module.exports = router