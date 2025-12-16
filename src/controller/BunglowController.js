const bunglowSchema = require('../models/BunglowModel');
const multer = require('multer');
const cloudinary = require('./CloudinaryUtil');

// Multer configuration (same as your flat controller)
const storage = multer.diskStorage({
    destination: "./upload/",
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
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
}).single("image");  // CHANGED from "makaanFile" to "image"

const getAllBunglow = async (req, res) => {
    try {
        const bunglows = await bunglowSchema.find().populate('user');
        res.status(200).json({
            success: true,
            data: bunglows,
            message: "Successfully got all the Bunglows"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching bunglows",
            error: error.message
        });
    }
};

const addBunglow = async (req, res) => {
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

        let imageUrl = null;

        // Store local path (your current approach)
        if (req.file) {
            imageUrl = req.file.path;
            
            // OR upload to Cloudinary (uncomment if using Cloudinary)
            /*
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'real-estate/bungalows'
            });
            imageUrl = result.secure_url;
            */
        }

        const bunglowDetails = {
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            interiorType: req.body.interiorType,
            area: Number(req.body.area),
            price: Number(req.body.price),
            location: req.body.location,
            address: req.body.address,
            city: req.body.city,
            pincode: req.body.pincode,
            bedrooms: Number(req.body.bedrooms) || 0,
            bathrooms: Number(req.body.bathrooms) || 0,
            parking: Number(req.body.parking) || 0,
            amenities: req.body.amenities || '',
            review: req.body.review || '',
            status: req.body.status || 'Available',
            imgUrl: imageUrl,
            isAvailableForRent: req.body.isAvailableForRent === 'true',
            isAvailableForSale: req.body.isAvailableForSale === 'true',
            user: req.body.user
        };

        const newBunglow = await bunglowSchema.create(bunglowDetails);

        return res.status(201).json({
            success: true,
            data: newBunglow,
            message: 'New Bunglow Created Successfully'
        });

    } catch (error) {
        console.error('Error creating bunglow:', error);
        return res.status(500).json({
            success: false,
            message: 'Error creating bunglow',
            error: error.message
        });
    }
};

const deleteBunglow = async (req, res) => {
    try {
        const id = req.params.id;
        const removeBunglow = await bunglowSchema.findByIdAndDelete(id);
        
        if (removeBunglow) {
            res.status(200).json({
                success: true,
                data: removeBunglow,
                message: 'Bunglow Deleted Successfully'
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'No such Bunglow found'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting bunglow',
            error: error.message
        });
    }
};

const updateBunglow = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedBunglow = await bunglowSchema.findByIdAndUpdate(
            id, 
            req.body,
            { new: true }  // Returns updated document
        );
        
        if (updatedBunglow) {
            res.status(200).json({
                success: true,
                data: updatedBunglow,
                message: "Bunglow Updated Successfully"
            });
        } else {
            res.status(404).json({
                success: false,
                message: "No Such Bunglow Found"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating bunglow",
            error: error.message
        });
    }
};

const getSingleBunglow = async (req, res) => {
    try {
        const id = req.params.id;  // CHANGED from req.body.id to req.params.id
        const bunglow = await bunglowSchema.findById(id).populate('user');
        
        if (bunglow) {
            res.status(200).json({
                success: true,
                data: bunglow,
                message: "Bunglow Fetched Successfully"
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Bunglow not Found"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching bunglow",
            error: error.message
        });
    }
};

module.exports = {
    addBunglow,
    getAllBunglow,
    deleteBunglow,
    getSingleBunglow,
    updateBunglow
};

