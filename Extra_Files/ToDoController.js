const todoschema = require('../models/ToDoModel')

const getAllList = async (req, res) => {

    const lists = await todoschema.find();
    res.status(201).json({
        data: lists,
        message: "Successfully got all the Lists"
    })
}

const addList = async (req, res) => {

    const listDetails = {
        list: req.body.list
    }

    const newList = await todoschema.create(listDetails);
    res.status(201).json({
        data: newList,
        message: 'New List Added'
    })
}

const deleteList = async (req, res) => {
    const id = req.params.id;
    const removeList = await todoschema.findByIdAndDelete(id)
    if (removeList) {
        res.status(200).json({
            data: removeList,
            message: 'Deleted List Successfully'
        })
    }
    else {
        res.status(404).json({
            message: 'No such List found'
        })
    }
}
const updateList = async (req, res) => {

    const id = req.params.id;
    const updatedList = await todoschema.findByIdAndUpdate(id, req.body)
    if (updatedList) {
        res.status(201).json({
            data: updatedList,
            message: "Updated List Successfully"
        })
    }
    else {
        res.status(404).json({
            message: "No Such List Updated"
        })
    }
}



module.exports = {
    getAllList,
    addList,
    deleteList,
    updateList,
}