const mongoose = require( 'mongoose' );
const schema = mongoose.Schema

const PincodeModel = new schema({
    pincode: { 
        type: Number
    },
    area: {
        type: schema.Types.ObjectId,
        ref: "Area"
    }
})

module.exports = mongoose.model('Pincode', PincodeModel)