const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FlatSchema = new Schema({
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
    
    // EXISTING FIELDS
    type: {
        type: String,
        required: true
    },
    interiorType: {
        type: String,
        required: true
    },
    sqrft: {  // Keep the name as is (your existing field)
        type: Number,  // CHANGED from String to Number
        required: true
    },
    price: {
        type: Number,  // CHANGED from String to Number
        required: true
    },
    status: {
        type: String,
        enum: ['Available', 'Sold', 'Reserved', 'Rented'],
        default: 'Available'
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
    
    // NEW FIELDS for Flat specific
    floorNumber: {
        type: Number,
        default: 0
    },
    totalFloors: {
        type: Number,
        default: 1
    },
    parking: {
        type: Number,
        default: 0
    },
    
    // EXISTING FIELDS
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    review: {
        type: String,
        default: ''
    },
    
    // RENAMED FIELD
    availableForRent: {  // Keep your existing name
        type: Boolean,  // CHANGED from String to Boolean
        default: false
    },
    isAvailableForSale: {  // NEW FIELD
        type: Boolean,
        default: true
    },
    
    society: {
        type: String,  // CHANGED from ObjectId to String (simple text)
        default: ''
    },
    imgUrl: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Flat", FlatSchema);
