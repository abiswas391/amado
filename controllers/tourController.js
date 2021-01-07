const catchAsync = require('../utils/catchAsync');
const Tour = require('../models/tourModel');

exports.getAllTours = catchAsync(async (req, res, next) => {
  let finalQuery = Tour.find();

  const queryObj = { ...req.query };

  const excludeItems = ['sort', 'fields', 'limit', 'page'];

  excludeItems.forEach((item) => {
    delete queryObj[item];
  });

  const queryStr = JSON.stringify(queryObj);

  const regex = /\bgte|lte|gt|lt\b/g;

  const result = JSON.parse(queryStr.replace(regex, (str) => `$${str}`));
  finalQuery = finalQuery.find(result);

  let sortBy;
  if (req.query.sort) {
    sortBy = JSON.stringify(req.query.sort).split(',').join(' ');
    finalQuery = finalQuery.sort(JSON.parse(sortBy));
  }

  if (req.query.fields) {
    // console.log(req.query);
    // console.log(req.query.fields);
    // console.log(
    //   JSON.parse(JSON.stringify(req.query.fields.split(',').join(' ')))
    // );
    finalQuery = finalQuery.select(
      JSON.parse(JSON.stringify(req.query.fields.split(',').join(' ')))
    );
  } else {
    finalQuery = finalQuery.select('-__v');
  }

  if (req.query.page) {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 3;
    const skip = (page - 1) * limit;

    finalQuery = finalQuery.limit(limit).skip(skip);
  }

  const tours = await finalQuery;

  res.status(200).json({
    data: {
      results: tours.length,
      status: 'success',
      tours
    }
  });

  // finalQuery.exec(function (err, tours) {
  //   res.status(200).json({
  //     data: {
  //       results: tours.length,
  //       status: 'success',
  //       tours
  //     }
  //   });
  // });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const user = await Tour.findById(req.params.id);
  // console.log(user);

  res.status(200).json({
    data: {
      status: 'success',
      user
    }
  });
});
