const router = require('express').Router()
const plotController = require('../controller/PlotController')

router.get('/getplot',plotController.getAllPlots)
router.post('/insertplot',plotController.addPlot)
router.delete('/deleteplot/:id',plotController.deletePlot)
router.put('/updateplot/:id',plotController.updatePlot)
router.get('/singleplot/:id',plotController.getSinglePlot)

module.exports = router;

