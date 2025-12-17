const router = require('express').Router()
const todolist = require('../controller/ToDoController')

router.get('/lists',todolist.getAllList)
router.post('/addlist',todolist.addList)
router.delete('/delete/:id',todolist.deleteList)
router.delete('/update/:id',todolist.updateList)



module.exports = router;