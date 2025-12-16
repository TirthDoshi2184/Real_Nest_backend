const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShopSchema = new Schema({
    // NEW FIELDS - Add these
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    shopType: {  // NEW FIELD
        type: String,
        required: true
    },
    
    // EXISTING FIELDS
    interiorType: {
        type: String,
        required: true
    },
    sqrft: {
        type: Number,  // CHANGED from String to Number
        required: true
    },
    location: {
        type: String,
        required: true
    },
    
    // NEW FIELDS - Add these
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    
    // NEW FIELDS for Shop specific
    shopNumber: {
        type: String,
        default: ''
    },
    commercialComplex: {
        type: String,
        default: ''
    },
    floorNumber: {
        type: Number,
        default: 0
    },
    frontageSize: {
        type: Number,
        default: 0
    },
    
    // EXISTING FIELDS
    price: {
        type: Number,  // CHANGED from String to Number
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    review: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['Available', 'Sold', 'Reserved', 'Rented'],
        default: 'Available'
    },
    imgUrl: {
        type: String
    },
    isAvailableForRent: {
        type: Boolean,  // CHANGED from String to Boolean
        default: false
    },
    isAvailableForSale: {  // NEW FIELD
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Shops", ShopSchema);
