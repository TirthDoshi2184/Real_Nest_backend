const router = require('express').Router()
const stateController = require('../controller/StateController')

router.get('/getstate',stateController.getAllState)
router.post('/insertstate',stateController.addState)
router.delete('/deletestate/:id',stateController.deleteState)
router.put('/updatestate/:id',stateController.updateState)
router.get('/singlestate/:id',stateController.getSingleState)

module.exports = router;