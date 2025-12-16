const shopSchema = require('../models/ShopModel');
const multer = require('multer');
const cloudinary = require('./CloudinaryUtil');

// Multer configuration
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
}).single("image");

const getShops = async (req, res) => {
    try {
        const allShops = await shopSchema.find().populate('user');
        res.status(200).json({
            success: true,
            data: allShops,
            message: "All Shops Fetched Successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching shops",
            error: error.message
        });
    }
};

const addShops = async (req, res) => {
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

        if (req.file) {
            imageUrl = req.file.path;
        }

        const newShop = {
            title: req.body.title,
            description: req.body.description,
            shopType: req.body.shopType,
            interiorType: req.body.interiorType,
            sqrft: Number(req.body.sqrft),
            location: req.body.location,
            address: req.body.address,
            city: req.body.city,
            pincode: req.body.pincode,
            shopNumber: req.body.shopNumber || '',
            commercialComplex: req.body.commercialComplex || '',
            floorNumber: Number(req.body.floorNumber) || 0,
            frontageSize: Number(req.body.frontageSize) || 0,
            price: Number(req.body.price),
            user: req.body.user,
            review: req.body.review || '',
            status: req.body.status || 'Available',
            isAvailableForRent: req.body.isAvailableForRent === 'true',
            isAvailableForSale: req.body.isAvailableForSale === 'true',
            imgUrl: imageUrl,
        };

        const shop = await shopSchema.create(newShop);

        return res.status(201).json({
            success: true,
            data: shop,
            message: "Shop added Successfully"
        });

    } catch (error) {
        console.error('Error adding shop:', error);
        return res.status(500).json({
            success: false,
            message: "Error adding shop",
            error: error.message
        });
    }
};

const deleteShop = async (req, res) => {
    try {
        const id = req.params.id;
        const removeShop = await shopSchema.findByIdAndDelete(id);
        
        if (removeShop) {
            res.status(200).json({
                success: true,
                data: removeShop,
                message: 'Shop Deleted Successfully'
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'No such Shop found'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting shop',
            error: error.message
        });
    }
};

const updateShop = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedShop = await shopSchema.findByIdAndUpdate(
            id, 
            req.body,
            { new: true }
        );
        
        if (updatedShop) {
            res.status(200).json({
                success: true,
                data: updatedShop,
                message: "Shop Updated Successfully"
            });
        } else {
            res.status(404).json({
                success: false,
                message: "No Such Shop Found"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating shop",
            error: error.message
        });
    }
};

const getSingleShop = async (req, res) => {
    try {
        const id = req.params.id;  // CHANGED from req.body.id
        const shop = await shopSchema.findById(id).populate('user');
        
        if (shop) {
            res.status(200).json({
                success: true,
                data: shop,
                message: "Shop Fetched Successfully"
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Shop not Found"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching shop",
            error: error.message
        });
    }
};

module.exports = {
    getShops,
    addShops,
    updateShop,
    deleteShop,
    getSingleShop
};