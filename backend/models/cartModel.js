const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
  name: String,
  quantity: Number,
});
// const cartDetails = mongoose.model('cartDetails', cartSchema);
// module.exports = {cartDetails};

module.exports = mongoose.model('cartDetails', cartSchema);
