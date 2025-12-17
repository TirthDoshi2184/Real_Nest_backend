const router = require('express').Router()
const areaController = require('../controller/AreaController')

router.get('/getarea',areaController.getAllArea)
router.post('/insertarea',areaController.addArea)
router.delete('/deletearea/:id',areaController.deleteArea)
router.put('/updatearea/:id',areaController.updateArea)
router.get('/singlearea/:id',areaController.getSingleArea)

module.exports = router;