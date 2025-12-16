const flatSchema = require('../models/FlatModel');
const shopSchema = require('../models/ShopModel');
const bunglowSchema = require('../models/BunglowModel');
const inquirySchema = require('../models/InquiryModel');

const getSellerDashboard = async (req, res) => {
    try {
        const sellerId = req.params.sellerId;

        // Count properties by type
        const flatsCount = await flatSchema.countDocuments({ user: sellerId });
        const shopsCount = await shopSchema.countDocuments({ user: sellerId });
        const bunglowsCount = await bunglowSchema.countDocuments({ user: sellerId });
        
        // Get inquiries count
        const inquiriesCount = await inquirySchema.countDocuments({ sellerId: sellerId });

        // Get recent properties (last 5)
        const recentFlats = await flatSchema.find({ user: sellerId })
            .sort({ createdAt: -1 }).limit(2).lean();
        const recentShops = await shopSchema.find({ user: sellerId })
            .sort({ createdAt: -1 }).limit(2).lean();
        const recentBunglows = await bunglowSchema.find({ user: sellerId })
            .sort({ createdAt: -1 }).limit(1).lean();
        
        // Add type to each property
        const flatsWithType = recentFlats.map(f => ({ ...f, propertyType: 'Flat' }));
        const shopsWithType = recentShops.map(s => ({ ...s, propertyType: 'Shop' }));
        const bunglowsWithType = recentBunglows.map(b => ({ ...b, propertyType: 'Bunglow' }));
        
        const recentProperties = [...flatsWithType, ...shopsWithType, ...bunglowsWithType]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5);

        // Get recent inquiries (last 5)
        const recentInquiries = await inquirySchema.find({ sellerId: sellerId })
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json({
            success: true,
            data: {
                totalProperties: flatsCount + shopsCount + bunglowsCount,
                flats: flatsCount,
                shops: shopsCount,
                bunglows: bunglowsCount,
                totalViews: 0, // Will calculate if you add views field
                totalInquiries: inquiriesCount,
                totalWishlisted: 0, // Will calculate if you add wishlist
                recentProperties: recentProperties,
                recentInquiries: recentInquiries
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching dashboard data",
            error: error.message
        });
    }
};

const getSellerFlats = async (req, res) => {
    try {
        const sellerId = req.params.sellerId;
        const flats = await flatSchema.find({ user: sellerId })
            .populate('user')
            .populate('society')
            .sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            data: flats,
            message: "Seller flats fetched successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching flats",
            error: error.message
        });
    }
};

const getSellerShops = async (req, res) => {
    try {
        const sellerId = req.params.sellerId;
        const shops = await shopSchema.find({ user: sellerId })
            .populate('user')
            .sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            data: shops,
            message: "Seller shops fetched successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching shops",
            error: error.message
        });
    }
};

const getSellerBunglows = async (req, res) => {
    try {
        const sellerId = req.params.sellerId;
        const bunglows = await bunglowSchema.find({ user: sellerId })
            .populate('user')
            .sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            data: bunglows,
            message: "Seller bunglows fetched successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching bunglows",
            error: error.message
        });
    }
};

module.exports = {
    getSellerDashboard,
    getSellerFlats,
    getSellerShops,
    getSellerBunglows
};