const router = require('express').Router();
const sellerController = require('../controller/SellerController');

router.get('/seller/dashboard/:sellerId', sellerController.getSellerDashboard);
router.get('/seller/flats/:sellerId', sellerController.getSellerFlats);
router.get('/seller/shops/:sellerId', sellerController.getSellerShops);
router.get('/seller/bunglows/:sellerId', sellerController.getSellerBunglows);

module.exports = router;