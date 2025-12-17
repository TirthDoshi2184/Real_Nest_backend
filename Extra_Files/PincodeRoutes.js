const router = require('express').Router()
const pincodeController = require('../controller/PincodeController')

router.get('/getpincode',pincodeController.getAllPincode)
router.post('/insertpincode',pincodeController.addPincode)
router.delete('/deletepincode/:id',pincodeController.deletePincode)
router.put('/updatepincode/:id',pincodeController.updatePincode)
router.get('/singlepincode/:id',pincodeController.getSinglePincode)

module.exports = router;