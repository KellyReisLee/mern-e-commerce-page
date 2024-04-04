const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true, },
  image: { type: String, required: true },
  categories: { type: Array },
  size: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },


}, { timestamps: true })

const productModel = mongoose.model('Product', ProductSchema)

module.exports = productModel;