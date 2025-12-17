const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  // Property Information
  propertyId: {
    type: String,
    required: true
  },
  propertyType: {
    type: String,
    required: true,
    enum: ['flat', 'shop', 'bunglow']
  },
  propertyTitle: {
    type: String,
    required: true
  },
  propertyPrice: {
    type: Number,
    required: true
  },
  propertyImage: {
    type: String
  },
  propertyLocation: {
    type: String
  },
  
  // Buyer Information
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  buyerName: {
    type: String,
    required: true
  },
  buyerEmail: {
    type: String,
    required: true
  },
  buyerPhone: {
    type: String,
    required: true
  },
  
  // Seller Information
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sellerName: {
    type: String,
    required: true
  },
  
  // Inquiry Details
  message: {
    type: String,
    required: true
  },
  interestedIn: {
    type: String,
    enum: ['buying', 'renting', 'both'],
    default: 'buying'
  },
  
  // Status Management
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'],
    default: 'pending'
  },
  
  // Response from seller
  sellerResponse: {
    type: String,
    default: ''
  },
  respondedAt: {
    type: Date
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
inquirySchema.index({ buyerId: 1, createdAt: -1 });
inquirySchema.index({ sellerId: 1, createdAt: -1 });
inquirySchema.index({ propertyId: 1 });
inquirySchema.index({ status: 1 });

module.exports = mongoose.model('Inquiry', inquirySchema);