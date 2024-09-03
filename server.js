const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');
// console.log(app.get('env'));

dotenv.config({
  path: './config.env',
});

const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then((con) => console.log('Connection successful'));

const port = 3001;
app.listen(port, () => {
  console.log(`App running on port ${port} `);
});
