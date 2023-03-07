/*
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    order: {  type: String },
    total: { type: String }
});

mongoose.model('Order', orderSchema);

*/

// models/Order.js

const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  total: {
    type: Number,
    required: true
  },
  order: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', OrderSchema);
