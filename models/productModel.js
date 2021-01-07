const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product must have a name'],
    trim: true,
    minLength: 5,
    maxLength: 20
  },
  description: {
    type: String,
    required: [true, 'A product must have a description']
  },
  price: {
    type: Number,
    required: [true, 'A product must have a price']
  },
  color: {
    type: String,
    required: [true, 'A product must have a color']
  },
  warranty: Number,
  available: {
    type: Boolean,
    required: [true, 'A product must have a availibility']
  },
  images: {
    type: [String]
  },
  specification: {
    type: Array
  },
  subRefId: {
    type: String
  },
  user: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ],
  averageRating: {
    type: Number,
    default: 4.5
  },
  averageRatingQuantity: {
    type: Number,
    default: 0
  },
  slug: String
});

productSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
