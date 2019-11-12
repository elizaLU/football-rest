const { Router } = require('express')
const City = require('./model')
const Team = require('../team/model')

const router = new Router()

router.get('/cities', (req, res, next) => {
  City.findAll()
    .then(city => res.json(city))
    .catch(next)
})

//http POST :4000/cities name=Rotterdam  population=10000
router.post('/cities', (req, res, next) => {
  City.create(req.body)
    .then(city => res.json(city))
    .catch(next)
})

router.get('/cities/:cityId', (req, res, next) => {
  City.findByPk(req.params.cityId,  { include: [Team] })
    .then(city => {
      if (city) {
        city
          .update(req.body)
          .then(city => res.json(city))
      } else {
        res.status(404).json({ message: "City not found" }).end()
      }
    })
    .catch(next)
})

router.put('/cities/:cityId', (req, res, next) => {
  City.findByPk(req.params.cityId, { include: [Team] })
    .then(city => {
      if (!city) { res.status(404).json({ message: "City not found." }).end() }
      else return city.update(req.body)
    })
    .then(updatedCity => {
      res.status(200).send(updatedCity)
    })
    .catch(next)
})
//http DELETE :4000/cities/2 
router.delete('/cities/:cityId', (req, res, next) => {
  City.destroy({ where: { id: req.params.cityId } })
    .then((numOfCitiesDeleted) => {
      if (numOfCitiesDeleted === 0) {
        res.status(404).send({ message: 'City not found' })
      } else {
        res.status(200).send({ message: 'City deleted' })
      }
    })
    .catch(next)
})




module.exports = router;