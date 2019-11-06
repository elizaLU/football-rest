const { Router } = require('express')
const Team = require('./model')

const router = new Router()

router.get('/teams', (req, res, next) => {
  Team.findAll()
    .then(team => res.json(team))
    .catch(next)
})
//local: http POST :4000/teams name=eggyolk  
//HEROKU: http POST https://fast-caverns-31315.herokuapp.com/teams name='cats and dogs'
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


.put('/teams/:teamId', (req, res) => {
  Team.findByPk(req.params.teamId)
    .then(team => {
      if (!team) { res.status(404).json({ message: "Team not found." }).end()}
      else return team.update(req.body)
    })
    .then(updatedTeam => {
      res.status(200).send(updatedTeam)
    })
})


module.exports = router;