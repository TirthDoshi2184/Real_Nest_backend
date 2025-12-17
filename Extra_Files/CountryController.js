const countrySchema = require('../models/CountryModel')
const getAllCountry = async(req,res)=>{

    const country = await  countrySchema.find();
    res.status(201).json({
        data:country,
        message:"Successfully got all the country"
    })
}

const addCountry = async(req,res) => {

    const countryDetails = {
       country: req.body.country
    }

    const newCountry = await countrySchema.create(countryDetails);
    res.status(201).json({
        data:newCountry,
        message:'New country Created'
    })
}

const deleteCountry = async(req,res)=>{
    const id = req.params.id;
    const removeCountry = await countrySchema.findByIdAndDelete(id)
    if(removeCountry){
        res.status(200).json({
            data:removeCountry,
            message:'Country Deleted Successfully'
        })
    }
    else{
        res.status(404).json({
            message:'No such Country found'
        })
    }
}
const updateCountry = async (req,res) => {

    const id = req.params.id;
    const updatedCountry = await  countrySchema.findByIdAndUpdate(id ,req.body)
    if(updatedCountry){
        res.status(201).json({
            data:updatedCountry,
            message:"Updated Country Successfully"
        })
    }
    else{
        res.status(404).json({
            message:"No Such Country Updated"
        })
    }
}

const  getSingleCountry = async (req,res)=>{

        const id = req.body.id;
        const country = await countrySchema.findOne(id)
        if(country){
            res.status(200).json({
                data:country,
                message:"country Fetched Successfully"
            })
        }
        else{
            res.status(404).json({
                data:flat,
                message:"country not Fetched Successfully"
            })
        }
    
    }


module.exports = {
   getAllCountry,
   addCountry,
   deleteCountry,
   updateCountry,
   getSingleCountry
}