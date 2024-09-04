const Home = require('../models/homeModel');
const ApiFeatures = require('../utils/apiFeatures');
exports.getAllHomes = async (req, res) => {
  try {
    // Execute the query
    const features = new ApiFeatures(Home.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();

    const homes = await features.query;

    res.status(200).json({
      requestedAt: req.requestTime,
      results: homes.length,
      status: 'success',
      data: {
        homes,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getHome = async (req, res) => {
  try {
    const id = req.params.id;
    const home = await Home.findById(id);

    res.status(200).json({
      status: 'success',
      data: {
        home,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.createHome = async (req, res) => {
  try {
    const newHome = await Home.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        newHome,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.updateHome = async (req, res) => {
  try {
    const updatedHome = await Home.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        updatedHome,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.deleteHome = async (req, res) => {
  try {
    await Home.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getHomesStats = async (_, res) => {
  try {
    const stats = await Home.aggregate([
      {
        $match: { ratingsAverage: { $lte: 4.5 } },
      },
      {
        $group: {
          _id: '$journeyDifficultyLevel',
          num: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgAmount: { $avg: '$amount' },
          maxAmount: { $max: '$amount' },
        },
      },
    ]);
    res.status(200).json({
      status: 'success',
      data: stats,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
