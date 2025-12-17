const mongoose = require('mongoose')
const schema = mongoose.Schema;

const todoschema = new schema({

    list:{
        type:String
    }
})

module.exports = mongoose.model("todoschema",todoschema)