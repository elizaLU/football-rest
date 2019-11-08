const { Router } = require('express')
const User = require('./model')

const router = new Router()

router.post('/signup', (request, response, next) => {
  const { name, password } = request.body
  User
    .create({ name, password })
    .then(user => response.send(user))
    .catch(next)
})

module.exports = router