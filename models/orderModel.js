const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  orderedAt: {
    type: Date,
    default: Date.now()
  },
  paymentId: {
    type: String
  },
  paymentStatus: {
    type: String
  },
  paymentMethod: {
    type: String
  },
  replacementValidity: {
    type: Date
  },
  deliveryUser: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  deliveredAt: {
    type: Date
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
