const mongoose = require('mongoose');
const cartDetails = require('./cartModel');
const orderSchema = mongoose.Schema(
  {
    orders: [cartDetails.schema],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('orderDetails', orderSchema);
