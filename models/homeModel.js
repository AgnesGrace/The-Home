const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The home must have a name'],
    unique: true,
    trim: true,
  },
  visitDuration: {
    type: Number,
    required: [true, 'Visit duration is required'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'Home must have a maximum group size'],
  },
  journeyDifficultyLevel: {
    type: String,
    required: [true, 'Home must have a difficulty level'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.9,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  amount: {
    type: Number,
    required: [true, 'Home must have an amout'],
  },
  discount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'Home must have a summary'],
  },
  description: {
    type: String,
    trim: true,
  },
  bgImage: {
    type: String,
    required: [true, 'Home must have a background image'],
  },
  images: {
    type: [String],
  },
  startDates: [Date],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const Home = mongoose.model('Home', homeSchema);

module.exports = Home;
