const Home = require('../models/homeModel');

// const homes = JSON.parse(
//   fs.readFileSync(`${__dirname}/../data/homes-basic.json`),
// );

// exports.checkRequestBody = (req, res, next) => {
//   if (!req.body.name || !req.body.visitDuration) {
//     res.status(400).json({
//       status: 'fail',
//       message: 'Missing home name and visit duration',
//     });
//   }

//   next();
// };

// exports.checkParamId = (req, res, next, val) => {
//   console.log(`Home id is ${val}`);
//   if (req.params.id * 1 > homes.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid home id',
//     });
//   }
//   next();
// };

exports.getAllHomes = async (req, res) => {
  try {
    //Build the query first
    const queryObj = { ...req.query };
    const excludedQueryFields = ['fields', 'page', 'limit', 'sort'];
    excludedQueryFields.forEach((queryEl) => delete queryObj[queryEl]);
    console.log(queryObj);
    const query = Home.find(queryObj);

    // Execute the query
    const homes = await query;

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
  // const newId = homes[homes.length - 1].id + 1;
  // const newHome = Object.assign({ id: newId }, req.body);
  // homes.push(newHome);
  // fs.writeFile(
  //   `${__dirname}/data/homes-basic.json`,
  //   JSON.stringify(homes),
  //   (err) => {
  //     res.status(201).json({
  //       status: 'success',
  //       data: {
  //         newHome,
  //       },
  //     });
  //   },
  // );
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
