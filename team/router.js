const { Router } = require('express')
const Team = require('./model')

const router = new Router()

router.get('/teams', (req, res, next) => {
  Team.findAll()
    .then(team => res.json(team))
    .catch(next)
})

router.post('/teams', (req, res, next) => {
  Team.create(req.body)
    .then(team => res.json(team))
    .catch(next)
})

module.exports = router;