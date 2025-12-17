const societySchema = require('../models/SocietyModel')

const getAllSociety = async(req,res)=>{

    const allScoiety = await societySchema.find().populate(['user','amenities'])
    if(allScoiety){
        res.status(201).json({
            data:allScoiety,
            message:"Get Society Successfull"
        })
    }
    else{
        res.status(404).json({
            message:"Society not Fetched"
        })
    }
}

const insertSociety = async(req,res)=>{
    const societyData = {
        name:req.body.name,
        yearsOld:req.body.yearsOld,
        possessionDate:req.body.possessionDate,
        gardenArea:req.body.gardenArea,
        amenities:req.body.amenities,
        block:req.body.block,
        floors:req.body.floors,
        parkingArea:req.body.parkingArea,
        constructionStatus:req.body.constructionStatus,
        units:req.body.units,
        user:req.body.user
    }

    const insertData = await societySchema.create(societyData)
    if(insertData){
        res.status(200).json({
            data:insertData,
            message:"Inserted Society Successfull"
        })
    }
    else{
        res.status(404).json({
            message:"Society not Inserted"
        })
    }
}

const deleteSociety = async(req,res)=>{
    const id = req.params.id;
    const removeSociety = await societySchema.findByIdAndDelete(id)
    if(removeSociety){
        res.status(200).json({
            data:removeSociety,
            message:'Society Deleted Successfully'
        })
    }
    else{
        res.status(404).json({
            message:'No such Society found'
        })
    }
}
const updateSociety = async (req,res) => {

    const id = req.params.id;
    const updatededSociety = await  societySchema.findByIdAndUpdate(id ,req.body)
    if(updatededSociety){
        res.status(201).json({
            data:updatededSociety,
            message:"Society Updated Successfully"
        })
    }
    else{
        res.status(404).json({
            message:"No Such Society Updated"
        })
    }
}
    
const  getSingleSociety = async (req,res)=>{

    const id = req.body.id;
    const society = await societySchema.findOne(id).populate("user")
    if(society){
        res.status(200).json({
            data:society,
            message:"Society Fetched Successfully"
        })
    }
    else{
        res.status(404).json({
            data:user,
            message:"Society not Fetched Successfully"
        })
    }
    
    }






module.exports = {
    insertSociety,
    getAllSociety,
    deleteSociety,
    updateSociety,
    getSingleSociety
}