const mongoose = require( 'mongoose' );
const { string } = require('zod');
const Schema = mongoose.Schema

const PlotSchema = new Schema({
    area:{
        type:Number,
    },
    price:{
        type:String,
    },
    location:{
        type:String,
    },
    contact:{
        type:Number
    },
    review:{
        type:String
    },
    isAvailableForRent:{
        type:Boolean
    },
    status:{
        type:String
    },
    imgUrl:{
        type:String
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }

})

module.exports = mongoose.model("Plot", PlotSchema)