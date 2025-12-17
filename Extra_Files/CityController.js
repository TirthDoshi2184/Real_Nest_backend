const citySchema = require('../models/CityModel')

const getAllCity = async(req,res)=>{

    const city = await  citySchema.find().populate('state');
    res.status(201).json({
        data:city,
        message:"Successfully got all the City"
    })
}

const addCity = async(req,res) => {

    const cityDetails = {
        city:req.body.city,
        state:req.body.state,
    }

    const newCity = await citySchema.create(cityDetails);
    res.status(201).json({
        data:newCity,
        message:'New City Created'
    })
}

const deleteCity = async(req,res)=>{
    const id = req.params.id;
    const removeCity = await citySchema.findByIdAndDelete(id)
    if(removeCity){
        res.status(200).json({
            data:removeCity,
            message:'City deleted Successfully'
        })
    }
    else{
        res.status(404).json({
            message:'No such City found'
        })
    }
}
const updateCity = async (req,res) => {

    const id = req.params.id;
    const updatedCity = await  citySchema.findByIdAndUpdate(id ,req.body)
    if(updatedCity){
        res.status(201).json({
            data:updatedCity,
            message:"Updated City Successfully"
        })
    }
    else{
        res.status(404).json({
            message:"No Such City Updated"
        })
    }
}

const  getSingleCity = async (req,res)=>{

        const id = req.body.id;
        const city = await stateSchema.findOne(id)
        if(city){
            res.status(200).json({
                data:city,
                message:"City Fetched Successfully"
            })
        }
        else{
            res.status(404).json({
                message:"City not Fetched Successfully"
            })
        }
    
    }


module.exports = {
   getAllCity,
   addCity,
   deleteCity,
   updateCity,
   getSingleCity
}