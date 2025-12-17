const mongoose = require( 'mongoose' );
const schema = mongoose.Schema

const CityModel = new  schema({
    city: { 
        type : String,
    },
    state:{
        type: schema.Types.ObjectId,
        ref:'State'
    }
})

module.exports= mongoose.model('City',CityModel)