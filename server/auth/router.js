const { Router } = require('express')
const { toJWT, toData } = require('./jwt')
const auth = require('./middleware')
const User = require('../../user/model')
const bcrypt = require('bcryptjs')

const router = new Router()

router.get('/secret-endpoint', auth, (req, res) => {
  res.send({
    message: `Thanks for visiting the secret endpoint ${req.user.name}.`,
  })
})

router.post('/login', (req, res) => {
  const name = req.body.name
  const password = req.body.password

  if (!name || !password) {
    res.status(400).send({
      message: 'Please supply a valid name and password'
    })
  }
  else {
    // 1. find user based on name address
    User
      .findOne({
        where: {
          name: name
        }
      })
      .then(entity => {
        if (!entity) {
          res.status(400).send({
            message: 'User with that name does not exist'
          })
        }

        // 2. use bcrypt.compareSync to check the password against the stored hash
        else if (bcrypt.compareSync(req.body.password, entity.password)) {

          // 3. if the password is correct, return a JWT with the userId of the user (user.id)
          res.send({
            jwt: toJWT({ userId: entity.id }),
            //userId: entity.id,
            name: entity.name
          })
        }
        else {
          res.status(400).send({
            message: 'Password or name was incorrect'
          })
        }
      })
      .catch(err => {
        console.error(err)
        res.status(500).send({
          message: 'Something went wrong :)'
        })
      })
  }
})


module.exports = router