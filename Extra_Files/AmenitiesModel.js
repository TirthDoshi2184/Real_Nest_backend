const mongoose = require( 'mongoose' );
const schema = mongoose.Schema

const AmenitiesSchema = new  schema({
    name:{
        type:String,
    },
    status:{
        type:Boolean,
    }
})

module.exports = mongoose.model('Amenities',AmenitiesSchema)