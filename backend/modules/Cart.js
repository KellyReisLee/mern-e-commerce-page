const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
  quantity: { type: Number, required: true }
});

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  products: [productSchema]
}, { timestamps: true });

const cartModel = mongoose.model('Cart', cartSchema);

module.exports = cartModel;
