const router = require('express').Router()
const countryController = require('../controller/CountryController')

router.get('/getcountry',countryController.getAllCountry)
router.post('/insertcountry',countryController.addCountry)
router.delete('/deletecountry/:id',countryController.deleteCountry)
router.put('/updatecountry/:id',countryController.updateCountry)
router.get('/singlecountry/:id',countryController.getSingleCountry)

module.exports = router;