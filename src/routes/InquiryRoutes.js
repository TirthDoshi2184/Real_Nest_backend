const express = require('express');
const router = express.Router();
const inquiryController = require('../controller/InquiryController');

// ============================================
// BUYER ROUTES
// ============================================

// Create new inquiry (Buyer sends inquiry to seller)
router.post('/create', inquiryController.createInquiry);

// Get all inquiries made by a buyer
router.get('/buyer/:buyerId', inquiryController.getBuyerInquiries);

// Cancel inquiry (Buyer cancels their own inquiry)
router.put('/cancel/:id', inquiryController.cancelInquiry);

// ============================================
// SELLER ROUTES
// ============================================

// Get all inquiries received by a seller
router.get('/seller/:sellerId', inquiryController.getSellerInquiries);

// Update inquiry status (Seller accepts/rejects inquiry)
router.put('/update/:id', inquiryController.updateInquiryStatus);

// Delete/Reject inquiry (Seller deletes inquiry)
router.delete('/delete/:id', inquiryController.deleteInquiry);

// Get seller statistics
router.get('/seller/:sellerId/stats', inquiryController.getSellerStats);

// ============================================
// COMMON ROUTES
// ============================================

// Get single inquiry by ID
router.get('/:id', inquiryController.getInquiryById);

module.exports = router;