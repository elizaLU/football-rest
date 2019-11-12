const { Router } = require('express')
const router = new Router()
const bcrypt = require('bcryptjs')
const User = require('./model')

router.post('/signup', (req, res, next) => {
  const name = req.body.name
  const password = req.body.password
  if (!name || !password) {
    res.status(400).send({
      message: 'Please supply a valid name and password'
    })
  }
  const user = {
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 10)
  }
  User
    .create(user)
    .then(user => {
      res.send({ message: "Account created" })
      req.user = user
    })
    .catch(next)
})

module.exports = router