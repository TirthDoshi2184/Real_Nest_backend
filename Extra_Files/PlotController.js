const plotSchema = require('../models/PlotModel')

const getAllPlots = async(req,res)=>{

    const plots = await  plotSchema.find().populate('user');
    res.status(201).json({
        data:plots,
        message:"Successfully got all the Plots"
    })
}

const addPlot = async(req,res) => {

    const plotDetails = {
        
        area:req.body.area,
        price:req.body.price,
        location:req.body.location,
        contact:req.body.contact,
        review:req.body.review,
        user:req.body.user,
        isAvailableForRent:req.body.isAvailableForRent,
        status:req.body.status,
        imgUrl: result.secure_url, // Cloudinary image URL

    }

    const newPlot = await plotSchema.create(plotDetails);
    res.status(201).json({
        data:newPlot,
        message:'New Plot Created'
    })
}

const deletePlot = async(req,res)=>{
    const id = req.params.id;
    const removePlot = await plotSchema.findByIdAndDelete(id)
    if(removePlot){
        res.status(200).json({
            data:removePlot,
            message:'Deleted Plot Successfully'
        })
    }
    else{
        res.status(404).json({
            message:'No such Plot found'
        })
    }
}
const updatePlot = async (req,res) => {

    const id = req.params.id;
    const updatedPlot = await  plotSchema.findByIdAndUpdate(id ,req.body)
    if(updatedPlot){
        res.status(201).json({
            data:updatePlot,
            message:"Updated plot Successfully"
        })
    }
    else{
        res.status(404).json({
            message:"No Such Plot Updated"
        })
    }
}

const  getSinglePlot = async (req,res)=>{

        const id = req.body.id;
        const plot = await plotSchema.findOne(id)
        if(plot){
            res.status(200).json({
                data:plot,
                message:"Plot Fetched Successfully"
            })
        }
        else{
            res.status(404).json({
                data:plot,
                message:"Plot not Fetched Successfully"
            })
        }
    
    }


module.exports = {
    getAllPlots,
    addPlot,
    deletePlot,
    updatePlot,
    getSinglePlot
}