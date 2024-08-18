const fs = require('fs');

const homes = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/homes-basic.json`)
);

exports.checkRequestBody = (req, res, next) => {
  if (!req.body.name || !req.body.visitDuration) {
    res.status(400).json({
      status: 'fail',
      message: 'Missing home name and visit duration',
    });
  }

  next();
};

exports.checkParamId = (req, res, next, val) => {
  console.log(`Home id is ${val}`);
  if (req.params.id * 1 > homes.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid home id',
    });
  }
  next();
};

exports.getAllHomes = (req, res) => {
  res.status(200).json({
    requestedAt: req.requestTime,
    results: homes.length,
    status: 'success',
    data: {
      homes,
    },
  });
};

exports.getHome = (req, res) => {
  const id = +req.params.id;
  const home = homes.find((home) => home.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      home,
    },
  });
};

exports.createHome = (req, res) => {
  const newId = homes[homes.length - 1].id + 1;
  const newHome = Object.assign({ id: newId }, req.body);
  homes.push(newHome);
  fs.writeFile(
    `${__dirname}/data/homes-basic.json`,
    JSON.stringify(homes),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          newHome,
        },
      });
    }
  );
};

exports.updateHome = (req, res) => {
  const id = +req.params.id;
  const home = homes.find((home) => home.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      message: 'updated',
    },
  });
};

exports.deleteHome = (req, res) => {
  const id = +req.params.id;
  const home = homes.find((home) => home.id === id);

  res.status(204).json({
    status: 'success',
  });
};
