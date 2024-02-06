const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  addToCart,
  getCart,
  getOrders,
  placeOrder,
} = require('../controllers/userController');

const {protect} = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.post('/addToCart', protect, addToCart);
router.post('/getCart', protect, getCart);
router.post('/getOrders', protect, getOrders);
router.post('/placeOrder', protect, placeOrder);

module.exports = router;
