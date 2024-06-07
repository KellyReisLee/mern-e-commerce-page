const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: { type: String, ref: "Product" },
  quantity: {
    type: Number,
  },
});

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  products: [productSchema]
}, { new: true });

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = cartModel;
