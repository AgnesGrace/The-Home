const express = require('express');
const fs = require('fs');
const router = express.Router();
const homes = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/homes-basic.json`)
);

const getAllHomes = (req, res) => {
  res.status(200).json({
    requestedAt: req.requestTime,
    results: homes.length,
    status: 'success',
    data: {
      homes,
    },
  });
};
const getHome = (req, res) => {
  const id = +req.params.id;
  const home = homes.find((home) => home.id === id);
  if (!home)
    res.status(404).json({
      status: 'failed',
      message: 'Home not found!',
    });
  res.status(200).json({
    status: 'success',
    data: {
      home,
    },
  });
};

const createHome = (req, res) => {
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

const updateHome = (req, res) => {
  const id = +req.params.id;
  const home = homes.find((home) => home.id === id);

  if (!home)
    res.status(404).json({
      status: 'failed',
      message: 'Home not found!',
    });
  res.status(200).json({
    status: 'success',
    data: {
      message: 'updated',
    },
  });
};

const deleteHome = (req, res) => {
  const id = +req.params.id;
  const home = homes.find((home) => home.id === id);

  if (!home)
    res.status(404).json({
      status: 'failed',
      message: 'Home not found!',
    });
  res.status(204).json({
    status: 'success',
  });
};
router.route('/').get(getAllHomes).post(createHome);
router.route('/:id').get(getHome).patch(updateHome).delete(deleteHome);

module.exports = router;
