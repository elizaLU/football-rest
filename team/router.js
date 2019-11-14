const { Router } = require('express')
const Team = require('./model')
const City = require('../city/model')

const router = new Router()

router.get('/teams', (req, res, next) => {
  Team.findAll()
    .then(team => res.json(team))
    .catch(next)
})

router.get('/teams/:teamId', (req, res, next) => {
  Team.findByPk(req.params.teamId, { include: [City] })
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
//local: http POST :4000/teams name=eggyolk  
//HEROKU: http POST https://fast-caverns-31315.herokuapp.com/teams name='cats and dogs'
router.post('/teams', (req, res, next) => {
  Team.create(req.body, { include: [City] })
    .then(team => res.json(team))
    .catch(next)
})


router.put('/teams/:teamId', (req, res, next) => {
  Team.findByPk(req.params.teamId, { include: [City] })
    .then(team => {
      if (!team) { res.status(404).json({ message: "Team not found." }).end() }
      else return team.update(req.body)
    })
    .then(updatedTeam => {
      res.status(200).send(updatedTeam)
    })
    .catch(next)
})

router.delete('/teams/:teamId', (req, res, next) => {
  Team.destroy({ where: { id: req.params.teamId } })
    .then((numOfTeamsDeleted) => {
      if (numOfTeamsDeleted === 0) {
        res.status(404).send({ message: 'Team not found' })
      } else {
        res.status(200).send({ message: 'Team deleted' })
      }
    })
    .catch(next)
})




module.exports = router;