const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BunglowSchema = new Schema({
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
    
    // EXISTING FIELDS - Keep as is
    type: {
        type: String,
        required: true
    },
    interiorType: {
        type: String,
        required: true
    },
    area: {
        type: Number,  // CHANGED from String to Number
        required: true
    },
    price: {
        type: Number,  // CHANGED from String to Number
        required: true
    },
    
    // NEW FIELDS - Add these
    location: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: String,  // CHANGED from ObjectId to String
        required: true
    },
    bedrooms: {
        type: Number,
        default: 0
    },
    bathrooms: {
        type: Number,
        default: 0
    },
    parking: {
        type: Number,
        default: 0
    },
    
    // EXISTING FIELDS
    amenities: {
        type: String,  // CHANGED from ObjectId to String (simple text)
        default: ''
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
    
    // RENAMED FIELD
    isAvailableForRent: {
        type: Boolean,  // CHANGED from String to Boolean
        default: false
    },
    isAvailableForSale: {  // NEW FIELD
        type: Boolean,
        default: true
    },
    
    // NEW FIELD - Add user reference
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true  // Adds createdAt and updatedAt
});

module.exports = mongoose.model("Bunglow", BunglowSchema);
