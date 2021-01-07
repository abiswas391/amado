const localStorage = require('localStorage');

const catchAsync = require('../utils/catchAsync');
const Product = require('../models/productModel');
const User = require('../models/userModel');

exports.getOverview = catchAsync(async (req, res, next) => {
  const products = await Product.find().sort({ name: 1 });
  const userName = localStorage.getItem('userName');

  res.status(200).render('overview', {
    title: 'Home',
    products,
    userName
  });
});

// exports.getProducts = (req, res, next) => {
//   res.status(200).render('shop', {
//     title: 'Products'
//   });
// };

exports.getProductDetails = (req, res, next) => {
  res.status(200).render('productDetails', {
    title: 'product Details',
    userName
  });
};

exports.getProductBySlug = catchAsync(async (req, res, next) => {
  const product = await Product.findOne({ slug: req.params.slug });
  // console.log(product.specification);
  const userName = localStorage.getItem('userName');
  // console.log(userName);

  res.status(200).render('productDetails', {
    title: 'Product Details',
    product,
    speci: product.specification,
    userName
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).render('overview', {
    data: {
      title: 'Overview',
      user
    }
  });
});
