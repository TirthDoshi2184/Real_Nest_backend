const Inquiry = require('../models/InquiryModel');
const User = require('../models/UserModel');
const Flat = require('../models/FlatModel');
const Shop = require('../models/ShopModel');
const Bunglow = require('../models/BunglowModel');
const mongoose = require('mongoose');

// ============================================
// BUYER SIDE CONTROLLERS
// ============================================

// Create a new inquiry (Buyer Side)
exports.createInquiry = async (req, res) => {
  try {
    const {
      propertyId,
      propertyType,
      buyerId,
      buyerName,
      buyerEmail,
      buyerPhone,
      message,
      interestedIn
    } = req.body;

    // Validate required fields
    if (!propertyId || !propertyType || !buyerId || !buyerName || !buyerEmail || !buyerPhone || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(buyerEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Validate phone number (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(buyerPhone)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid 10-digit phone number'
      });
    }

    // Fetch property details based on type
    let property;
    let Model;
    
    switch(propertyType.toLowerCase()) {
      case 'flat':
        Model = Flat;
        break;
      case 'shop':
        Model = Shop;
        break;
      case 'bunglow':
        Model = Bunglow;
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid property type. Must be flat, shop, or bunglow'
        });
    }

    property = await Model.findById(propertyId).populate('user');
    
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Check if buyer is trying to inquire about their own property
    if (property.user._id.toString() === buyerId) {
      return res.status(400).json({
        success: false,
        message: 'You cannot inquire about your own property'
      });
    }

    // Check if inquiry already exists for this property and buyer
    const existingInquiry = await Inquiry.findOne({
      propertyId,
      buyerId,
      status: { $in: ['pending', 'accepted'] }
    });

    if (existingInquiry) {
      return res.status(400).json({
        success: false,
        message: 'You have already sent an inquiry for this property'
      });
    }

    // Create new inquiry
    const newInquiry = new Inquiry({
      propertyId,
      propertyType: propertyType.toLowerCase(),
      propertyTitle: property.title,
      propertyPrice: property.price,
      propertyImage: property.imgUrl,
      propertyLocation: `${property.location}, ${property.city}`,
      buyerId,
      buyerName,
      buyerEmail,
      buyerPhone,
      sellerId: property.user._id,
      sellerName: property.user.fullname,
      message,
      interestedIn: interestedIn || 'buying',
      status: 'pending'
    });

    await newInquiry.save();

    res.status(201).json({
      success: true,
      message: 'Inquiry sent successfully',
      data: newInquiry
    });

  } catch (error) {
    console.error('Create Inquiry Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating inquiry',
      error: error.message
    });
  }
};

// Get all inquiries for buyer (My Inquiries)
exports.getBuyerInquiries = async (req, res) => {
  try {
    const buyerId = req.params.buyerId;

    // Validate buyerId
    if (!mongoose.Types.ObjectId.isValid(buyerId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid buyer ID'
      });
    }

    const inquiries = await Inquiry.find({ buyerId })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });

  } catch (error) {
    console.error('Get Buyer Inquiries Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching buyer inquiries',
      error: error.message
    });
  }
};

// Cancel inquiry (Buyer Side)
exports.cancelInquiry = async (req, res) => {
  try {
    const inquiryId = req.params.id;
    const buyerId = req.body.buyerId;

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(inquiryId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid inquiry ID'
      });
    }

    const inquiry = await Inquiry.findById(inquiryId);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    // Verify that the buyer owns this inquiry
    if (inquiry.buyerId.toString() !== buyerId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: You can only cancel your own inquiries'
      });
    }

    // Check if inquiry can be cancelled
    if (inquiry.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: `Cannot cancel inquiry with status: ${inquiry.status}`
      });
    }

    inquiry.status = 'cancelled';
    inquiry.updatedAt = new Date();
    await inquiry.save();

    res.status(200).json({
      success: true,
      message: 'Inquiry cancelled successfully',
      data: inquiry
    });

  } catch (error) {
    console.error('Cancel Inquiry Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error cancelling inquiry',
      error: error.message
    });
  }
};

// ============================================
// SELLER SIDE CONTROLLERS
// ============================================

// Get all inquiries for seller (Received Inquiries)
exports.getSellerInquiries = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;

    // Validate sellerId
    if (!mongoose.Types.ObjectId.isValid(sellerId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid seller ID'
      });
    }

    const inquiries = await Inquiry.find({ sellerId })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });

  } catch (error) {
    console.error('Get Seller Inquiries Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching seller inquiries',
      error: error.message
    });
  }
};

// Update inquiry status (Seller Side)
exports.updateInquiryStatus = async (req, res) => {
  try {
    const inquiryId = req.params.id;
    const { status, sellerResponse, sellerId } = req.body;

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(inquiryId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid inquiry ID'
      });
    }

    // Validate status
    const validStatuses = ['pending', 'accepted', 'rejected', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const inquiry = await Inquiry.findById(inquiryId);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    // Verify that the seller owns this inquiry
    if (inquiry.sellerId.toString() !== sellerId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: You can only update inquiries for your properties'
      });
    }

    // Update inquiry
    inquiry.status = status;
    if (sellerResponse) {
      inquiry.sellerResponse = sellerResponse;
      inquiry.respondedAt = new Date();
    }
    inquiry.updatedAt = new Date();

    await inquiry.save();

    res.status(200).json({
      success: true,
      message: 'Inquiry status updated successfully',
      data: inquiry
    });

  } catch (error) {
    console.error('Update Inquiry Status Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating inquiry status',
      error: error.message
    });
  }
};

// Delete inquiry (Seller Side - Soft delete by marking as rejected)
exports.deleteInquiry = async (req, res) => {
  try {
    const inquiryId = req.params.id;
    const sellerId = req.body.sellerId;

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(inquiryId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid inquiry ID'
      });
    }

    const inquiry = await Inquiry.findById(inquiryId);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    // Verify that the seller owns this inquiry
    if (inquiry.sellerId.toString() !== sellerId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: You can only delete inquiries for your properties'
      });
    }

    // Soft delete - mark as rejected
    inquiry.status = 'rejected';
    inquiry.updatedAt = new Date();
    await inquiry.save();

    res.status(200).json({
      success: true,
      message: 'Inquiry deleted successfully',
      data: inquiry
    });

  } catch (error) {
    console.error('Delete Inquiry Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting inquiry',
      error: error.message
    });
  }
};

// ============================================
// COMMON CONTROLLERS
// ============================================

// Get single inquiry by ID
exports.getInquiryById = async (req, res) => {
  try {
    const inquiryId = req.params.id;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(inquiryId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid inquiry ID'
      });
    }

    const inquiry = await Inquiry.findById(inquiryId);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    res.status(200).json({
      success: true,
      data: inquiry
    });

  } catch (error) {
    console.error('Get Inquiry Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching inquiry',
      error: error.message
    });
  }
};

// Get inquiry statistics for seller
exports.getSellerStats = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;

    // Validate sellerId
    if (!mongoose.Types.ObjectId.isValid(sellerId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid seller ID'
      });
    }

    const stats = await Inquiry.aggregate([
      { $match: { sellerId: mongoose.Types.ObjectId(sellerId) } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const total = await Inquiry.countDocuments({ sellerId });

    // Format stats for easier consumption
    const formattedStats = {
      total,
      pending: 0,
      accepted: 0,
      rejected: 0,
      cancelled: 0,
      completed: 0
    };

    stats.forEach(stat => {
      formattedStats[stat._id] = stat.count;
    });

    res.status(200).json({
      success: true,
      data: formattedStats
    });

  } catch (error) {
    console.error('Get Seller Stats Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching seller statistics',
      error: error.message
    });
  }
};