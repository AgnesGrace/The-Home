const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const Home = require('../models/homeModel');

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

const homes = JSON.parse(
  fs.readFileSync(`${__dirname}/homes-basic.json`, 'utf-8'),
);

/**
 * Import dev data to the db
 */
const importData = async () => {
  try {
    await Home.create(homes);
    console.log('Data successfully loadded');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Home.deleteMany();
    console.log('data deleted successfully');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};
console.log(process.argv);
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
