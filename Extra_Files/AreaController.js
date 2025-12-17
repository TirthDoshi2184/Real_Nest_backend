const areaSchema = require('../models/AreaModel')

const getAllArea = async(req,res)=>{

    const area = await  areaSchema.find().populate('city');
    res.status(201).json({
        data:area,
        message:"Successfully got all the Area"
    })
}

const addArea = async(req,res) => {

    const areaDetails = {
        area:req.body.area,
        city:req.body.city,
    }

    const newArea = await areaSchema.create(areaDetails);
    res.status(201).json({
        data:newArea,
        message:'New Area Created'
    })
}

const deleteArea = async(req,res)=>{
    const id = req.params.id;
    const removeArea = await reaSchema.findByIdAndDelete(id)
    if(removeArea){
        res.status(200).json({
            data:removeArea,
            message:'Area deleted Successfully'
        })
    }
    else{
        res.status(404).json({
            message:'No such Area found'
        })
    }
}
const updateArea = async (req,res) => {

    const id = req.params.id;
    const updatedArea = await  areaSchema.findByIdAndUpdate(id ,req.body)
    if(updatedArea){
        res.status(201).json({
            data:updatedArea,
            message:"Updated Area Successfully"
        })
    }
    else{
        res.status(404).json({
            message:"No Such Area Updated"
        })
    }
}

const  getSingleArea = async (req,res)=>{

        const id = req.body.id;
        const area = await areaSchema.findOne(id)
        if(area){
            res.status(200).json({
                data:area,
                message:"Area Fetched Successfully"
            })
        }
        else{
            res.status(404).json({
                message:"Area not Fetched Successfully"
            })
        }
    
    }


module.exports = {
   getAllArea,
   addArea,
   deleteArea,
   updateArea,
   getSingleArea
}