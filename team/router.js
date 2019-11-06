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

router.get('/teams/:teamId', (req, res, next) => {
  Team.findByPk(req.params.teamId)
    .then(team => {
      if (team) {
        team
          .update(req.body)
          .then(team => res.json(team))
      } else {
        res.status(404).json({ message: "Team not found" }).end()
      }
    })
    .catch(next)
})

module.exports = router;