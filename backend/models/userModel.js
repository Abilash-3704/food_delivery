const mongoose = require('mongoose');
const cartDetails = require('./cartModel');
const orderDetails = require('./orderSchema');

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    orders: {
      type: [orderDetails.schema],
    },
    cart: {
      type: [cartDetails.schema],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', userSchema);
