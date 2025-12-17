const router = require('express').Router()
const amenitiesController = require('../controller/AmenitiesController')

router.get('/getamenities',amenitiesController.getAmenities)
router.post('/insertamenities',amenitiesController.addAmenities)
router.put('/updateamenities',amenitiesController.updateAmenities)
router.delete('/deleteamenities',amenitiesController.deleteAmenities)
router.get('/getsingleamenities',amenitiesController.getSingleAmenities)

module.exports = router