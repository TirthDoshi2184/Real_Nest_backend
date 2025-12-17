const stateSchema = require('../models/StateModel')

const getAllState = async(req,res)=>{

    const state = await  stateSchema.find().populate('country');
    res.status(201).json({
        data:state,
        message:"Successfully got all the State"
    })
}

const addState = async(req,res) => {

    const stateDetails = {
       state:req.body.state,
       country:req.body.country
    }

    const newState = await stateSchema.create(stateDetails);
    res.status(201).json({
        data:newState,
        message:'New State Created'
    })
}

const deleteState = async(req,res)=>{
    const id = req.params.id;
    const removeState = await stateSchema.findByIdAndDelete(id)
    if(removeState){
        res.status(200).json({
            data:removeState,
            message:'State deleted Successfully'
        })
    }
    else{
        res.status(404).json({
            message:'No such State found'
        })
    }
}
const updateState = async (req,res) => {

    const id = req.params.id;
    const updatedState = await  stateSchema.findByIdAndUpdate(id ,req.body)
    if(updatedState){
        res.status(201).json({
            data:updatedState,
            message:"Updated State Successfully"
        })
    }
    else{
        res.status(404).json({
            message:"No Such State Updated"
        })
    }
}

const  getSingleState = async (req,res)=>{

        const id = req.body.id;
        const state = await stateSchema.findOne(id)
        if(state){
            res.status(200).json({
                data:state,
                message:"State Fetched Successfully"
            })
        }
        else{
            res.status(404).json({
                message:"State not Fetched Successfully"
            })
        }
    
    }


module.exports = {
   getAllState,
   addState,
   deleteState,
   updateState,
   getSingleState
}