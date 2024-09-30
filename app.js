const express = require('express');
const morgan = require('morgan');

const homeRouter = require('./routes/homeRoute');
const userRouter = require('./routes/userRoute');

const app = express();
//middlewares

app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  console.log('hello from the simple middleware');

  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use(express.static(`${__dirname}/public`));
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to The Home',
  });
});

// app.get('/api/v1/homes', getAllHomes);

// app.get('/api/v1/homes/:id', getHome);

// app.post('/api/v1/homes', createHome);

// app.patch('/api/v1/homes/:id', updateHome);

// app.delete('/api/v1/homes/:id', deleteHome);

//Mount routers
app.use('/api/v1/homes', homeRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  const err = new Error(`Cannot find ${req.originalUrl} on the Home server.`);
  err.status = 'fail';
  err.statusCode = 404;
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Cannot find ${req.originalUrl} on the Home server.`,
  // });

  next(err);
});

app.use((err, _, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
