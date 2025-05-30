const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  price: { type: Number, required: true },
  countInStock: { type: Number, required: true },
});

module.exports = mongoose.model('Product', productSchema);
