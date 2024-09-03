const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The home must have a name'],
    unique: true,
  },
  visitDuration: {
    type: Number,
  },
});
const Home = mongoose.model('Home', homeSchema);

module.exports = Home;
