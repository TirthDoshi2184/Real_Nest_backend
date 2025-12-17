const mongoose = require( 'mongoose' );
const schema = mongoose.Schema

const AreaSchema = new schema({
    area: { 
        type: String,
    },
    city:{
        type : schema.Types.ObjectId,
        ref: "City"
    }
})

module.exports = mongoose.model("Area", AreaSchema)