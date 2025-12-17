const router = require('express').Router()
const cityController = require('../controller/CityController')

router.get('/getcity',cityController.getAllCity)
router.post('/insertcity',cityController.addCity)
router.delete('/deletecity/:id',cityController.deleteCity)
router.put('/updatecity/:id',cityController.updateCity)
router.get('/singlecity/:id',cityController.getSingleCity)

module.exports = router;