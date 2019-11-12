const { Router } = require('express')
const router = new Router()
const bcrypt = require('bcryptjs')
const User = require('./model')

router.post('/signup', (req, res, next) => {
  const { name, password } = req.body;
  console.log("name & pass ", req.body);

  if (!name || !password) {
    res.status(400).send({
      message: 'Please supply a valid name and password'
    })
  }
  const user = {
    name,
    password: bcrypt.hashSync(req.body.password, 10)
  }
  User
    .create(user)
    .then(user => {
      req.user = user
      res.send({ message: "Account created" })
    })
    .catch(next)
})

module.exports = router