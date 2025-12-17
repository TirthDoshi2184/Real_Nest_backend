const pincodeSchema = require('../models/CityModel')

const getAllPincode = async(req,res)=>{

    const pincode = await  pincodeSchema.find().populate('area');
    res.status(201).json({
        data:pincode,
        message:"Successfully got all the pincode"
    })
}

const addPincode = async(req,res) => {

    const pincodeDetails = {
        pincode : req.body.pincode,
        area : req.body.area
    }

    const newPincode = await pincodeSchema.create(pincodeDetails);
    res.status(201).json({
        data:newPincode,
        message:'New Pincode Created'
    })
}

const deletePincode = async(req,res)=>{
    const id = req.params.id;
    const removePincode = await pincodeSchema.findByIdAndDelete(id)
    if(removePincode){
        res.status(200).json({
            data:removePincode,
            message:'Pincode deleted Successfully'
        })
    }
    else{
        res.status(404).json({
            message:'No such pincode found'
        })
    }
}
const updatePincode = async (req,res) => {

    const id = req.params.id;
    const updatedPincode = await  pincodeSchema.findByIdAndUpdate(id ,req.body)
    if(updatedPincode){
        res.status(201).json({
            data:updatedPincode,
            message:"Updated pincode Successfully"
        })
    }
    else{
        res.status(404).json({
            message:"No Such pincode Updated"
        })
    }
}

const  getSinglePincode = async (req,res)=>{

        const id = req.body.id;
        const pincode = await pincodeSchema.findOne(id)
        if(pincode){
            res.status(200).json({
                data:pincode,
                message:"pincode Fetched Successfully"
            })
        }
        else{
            res.status(404).json({
                message:"pincode not Fetched Successfully"
            })
        }
    
    }


module.exports = {
   getAllPincode,
   addPincode,
   deletePincode,
   updatePincode,
   getSinglePincode
}