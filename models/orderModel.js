const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  orderedAt: {
    type: Date,
    default: Date.now()
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
