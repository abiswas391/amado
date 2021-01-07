const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const User = require('../../models/userModel');
const Product = require('../../models/productModel');
dotenv.config();

mongoose.connect(
  'mongodb://127.0.0.1:27017/',
  {
    // dbName: 'event_db',
    dbName: 'amado',
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  },
  (err) => (err ? console.log(err) : console.log('Connected to database..'))
);

const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/products.json`, 'utf-8')
);

const importData = async () => {
  try {
    await User.create(users, { validateBeforeSave: false });
    await Product.create(products, { validateBeforeSave: false });
    console.log('The data has been successfully loaded!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    console.log('The data has been deleted succesfully!!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

// console.log(process.argv);
