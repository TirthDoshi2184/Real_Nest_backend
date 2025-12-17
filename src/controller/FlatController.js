const flatschema = require('../models/FlatModel');
const multer = require('multer');
const cloudinary = require('./CloudinaryUtil');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: "./upload/",
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype == "image/png" || 
            file.mimetype == "image/jpg" || 
            file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
}).single("image");

const getAllFlat = async (req, res) => {
    try {
        const flats = await flatschema.find().populate(['user', 'society']);
        res.status(201).json({
            success: true,
            data: flats,
            message: "Successfully got all the flats"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching flats",
            error: error.message
        });
    }
};

const addFlat = async (req, res) => {
    try {
        await new Promise((resolve, reject) => {
            upload(req, res, (err) => {
                if (err) {
                    console.error('Multer upload error:', err);
                    return reject(err);
                }
                resolve();
            });
        });

        console.log('Request body:', req.body);
        console.log('Request file:', req.file);

        // Get user ID from localStorage/auth
        // For now, you need to pass a valid user ID from frontend
        const userId = req.body.user;
        
        // Validate user ID
        if (!userId || userId === 'null' || userId === 'undefined') {
            return res.status(400).json({
                success: false,
                message: 'User ID is required. Please login again.'
            });
        }

        let imageUrl = null;

if (req.file) {
    try {
        const cloudinaryResult = await cloudinary.uploadimg(req.file);
        imageUrl = cloudinaryResult.secure_url; // Use secure_url from Cloudinary
        
        // Optional: Delete local file after successful upload
        fs.unlinkSync(req.file.path);
    } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        return res.status(500).json({
            success: false,
            message: 'Failed to upload image to Cloudinary',
            error: uploadError.message
        });
    }
}
        // Prepare flat details - FIXED FIELD MAPPING
        const flatDetails = {
    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
    interiorType: req.body.interiorType,
    sqrft: Number(req.body.sqrft),
    price: Number(req.body.price),
    status: req.body.status || 'Available',
    location: req.body.location,
    address: req.body.address,
    city: req.body.city,
    pincode: req.body.pincode,
    floorNumber: Number(req.body.floorNumber) || 0,
    totalFloors: Number(req.body.totalFloors) || 1,
    parking: Number(req.body.parking) || 0,
    society: req.body.society || '',
    user: userId,
    review: req.body.review || '',
    availableForRent: req.body.availableForRent === 'true',
    isAvailableForSale: req.body.isAvailableForSale === 'true',  // ✅ Add this
    imgUrl: imageUrl,
};

        console.log('Flat details to save:', flatDetails);

        const newFlat = await flatschema.create(flatDetails);

        return res.status(201).json({
            success: true,
            data: newFlat,
            message: 'New Flat Created Successfully'
        });

    } catch (error) {
        console.error('Error processing property data:', error);
        return res.status(500).json({
            success: false,
            message: 'Error processing property data',
            error: error.message
        });
    }
};

const deleteFlat = async (req, res) => {
    try {
        const id = req.params.id;
        const removeFlat = await flatschema.findByIdAndDelete(id);
        
        if (removeFlat) {
            res.status(200).json({
                success: true,
                data: removeFlat,
                message: 'Deleted Successfully'
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'No such flat found'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting flat',
            error: error.message
        });
    }
};

const updateFlat = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedFlat = await flatschema.findByIdAndUpdate(
            id, 
            req.body,
            { new: true }
        );
        
        if (updatedFlat) {
            res.status(201).json({
                success: true,
                data: updatedFlat,
                message: "Updated Successfully"
            });
        } else {
            res.status(404).json({
                success: false,
                message: "No Such Flat Updated"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating flat",
            error: error.message
        });
    }
};

const getSingleFlat = async (req, res) => {
    try {
        const id = req.params.id;
        const flat = await flatschema.findById(id).populate("society").populate("user",'fullname email role');
        
        if (flat) {
            res.status(200).json({
                success: true,
                data: flat,
                message: "Flat Fetched Successfully"
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Flat not Fetched Successfully"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching flat",
            error: error.message
        });
    }
};

const getSocietyByFlatId = async (req, res) => {
    try {
        const flatId = req.params.flatId;
        console.log(flatId);

        const society = await flatschema.findById(flatId).populate('society').populate({
            path: 'society',
            populate: {
                path: 'amenities',
                model: 'Amenities'
            }
        });
        
        console.log(society);
        
        if (society) {
            res.status(200).json({
                success: true,
                data: society.society,
                message: "Society Fetch Successfully"
            });
        } else {
            res.status(404).json({
                success: false,
                data: null,
                message: "Society Not Found"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching society",
            error: error.message
        });
    }
};

module.exports = {
    getAllFlat,
    addFlat,
    deleteFlat,
    updateFlat,
    getSingleFlat,
    getSocietyByFlatId
};