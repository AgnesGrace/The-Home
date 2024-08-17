const express = require('express');
const fs = require('fs');
const app = express();
//middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log('hello from the simple middleware');

  next();
});
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to The Home',
  });
});

const homes = JSON.parse(fs.readFileSync(`${__dirname}/data/homes-basic.json`));

const getAllHomes = (req, res) => {
  res.status(200).json({
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
app.route('/api/v1/homes').get(getAllHomes).post(createHome);
app
  .route('/api/v1/homes/:id')
  .get(getHome)
  .patch(updateHome)
  .delete(deleteHome);

// app.get('/api/v1/homes', getAllHomes);

// app.get('/api/v1/homes/:id', getHome);

// app.post('/api/v1/homes', createHome);

// app.patch('/api/v1/homes/:id', updateHome);

// app.delete('/api/v1/homes/:id', deleteHome);

const port = 3001;
app.listen(port, () => {
  console.log(`App running on port ${port} `);
});
