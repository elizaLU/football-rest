const { Router } = require('express')
const Event = require('./model')
const Team = require('../team/model')
const auth = require('../server/auth/middleware')
const router = new Router()

router.get('/events', (req, res, next) => {
  Event.findAll()
    .then(event => res.json(event))
    .catch(next)
})

//http POST :4000/events/name=Match date='07-11-2019' decription='match for life'
router.post('/events', (req, res, next) => {
  Event.create(req.body)
    .then(event => res.json(event))
    .catch(next)
})

router.get('/events/:eventId', (req, res, next) => {
  Event.findByPk(req.params.eventId, { include: [Team] })
    .then(event => {
      if (event) {
        event
          .update(req.body)
          .then(event => res.json(event))
      } else {
        res.status(404).json({ message: "Event not found" }).end()
      }
    })
    .catch(next)
})

router.put('/events/:eventId', (req, res, next) => {
  Event.findByPk(req.params.eventId)
    .then(event => {
      if (!event) { res.status(404).json({ message: "event not found." }).end() }
      else return event.update(req.body) //without return, it doesn't log updated event tot he console
    })
    .then(updatedEvent => {
      res.status(200).send(updatedEvent)
    })
    .catch(next)
})
//http DELETE :4000/events/2 
router.delete('/events/:eventId', auth,
  (req, res, next) => {
    Event.findByPk(req.params.eventId)
      .then(team => {
        if (!team) {
          res.status(404).end()
        }
      })
    Event.destroy({
      where: {
        id: req.params.eventId,
      }
    })
      .then((number) => {
        res.send({ id: Number(req.params.eventId) }).status(401).end()
      })
      .catch(next);
  }
)


module.exports = router;