const { Router } = require('express')
const Player = require('./model')
const Team = require('../team/model')

const router = new Router()

router.get('/players', (req, res, next) => {
  Player.findAll()
    .then(player => res.json(player))
    .catch(next)
})

//http POST :4000/players/ name=Roman  number=23
router.post('/players', (req, res, next) => {
  Player.create(req.body)
    .then(player => res.json(player))
    .catch(next)
})

router.get('/players/:playerId', (req, res, next) => {
  Player.findByPk(req.params.playerId,  { include: [Team] })
    .then(player => {
      if (player) {
        player
          .update(req.body)
          .then(player => res.json(player))
      } else {
        res.status(404).json({ message: "player not found" }).end()
      }
    })
    .catch(next)
})

router.put('/players/:playerId', (req, res, next) => {
  Player.findByPk(req.params.playerId,  { include: [Team] })
    .then(player => {
      if (!player) { res.status(404).json({ message: "Player not found." }).end() }
      else return player.update(req.body)
    })
    .then(updatedPlayer => {
      res.status(200).send(updatedPlayer)
    })
    .catch(next)
})
//http DELETE :4000/players/2 
router.delete('/players/:playerId', (req, res, next) => {
  console.log('REQ PARAMS:', req.params)
  Player.destroy({ where: { id: req.params.playerId } })
    .then((numOfPlayersDeleted) => {
      if (numOfPlayersDeleted === 0) {
        res.status(404).send({ message: 'Player not found' })
      } else {
        res.status(200).send({ message: 'Player deleted' })
      }
    })
    .catch(next)
})




module.exports = router;