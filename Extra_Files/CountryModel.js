const mongoose = require( 'mongoose' );
const schema = mongoose.Schema

const CountryModel  = new schema({
    country: { 
        type : String,
    }
})

module.exports =  mongoose.model('Country', CountryModel)