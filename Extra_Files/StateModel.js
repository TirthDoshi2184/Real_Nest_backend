const mongoose = require( 'mongoose' );
const schema = mongoose.Schema

const StateModel = new  schema({
    state:{
        type:String,
    },
    country:{
        type:schema.Types.ObjectId,
        ref:'Country',
    }
})

module.exports = mongoose.model('State',StateModel)