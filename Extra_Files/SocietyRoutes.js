const societyController = require('../controller/SocietyController')
const router = require('express').Router();

router.get('/getsociety',societyController.getAllSociety);
router.post('/insertsociety',societyController.insertSociety);
router.delete('/deletesociety/:id',societyController.deleteSociety)
router.put('/updatesociety/:id',societyController.updateSociety)
router.get('/singlesociety/:id',societyController.getSingleSociety)

module.exports = router;