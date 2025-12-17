const mongoose = require("mongoose");
const { date } = require("zod");
const schema = mongoose.Schema;

const societySchema =new schema({
    name:{
        type:String
    },
    yearsOld:{
        type:Number,
    },
    possessionDate:{
        type:String
    },
    gardenArea:{
        type:Number
    },
    amenities:{
        type :schema.Types.ObjectId , 
        ref:'Amenities'
    },
    blocks:{
        type:Number
    },
    floors:{
        type:Number
    },
    parkingArea:{
        type:String
    },
    constructionStatus:{
        type:String
    },
    units:{
        type:Number
    },
    user:{
        type :schema.Types.ObjectId, 
        ref:'User',
    },

})

module.exports = mongoose.model("Society",societySchema);