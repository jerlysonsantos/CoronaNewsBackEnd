const mongoose = require('../../database');

const questSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },

  by: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    require: true,
  },

  levelRequired: {
    type: Number,
    require: true,
  },

  xpEarning: {
    type: Number,
    require: true,
  }
});

const Quest = mongoose.model('Quest', questSchema);
module.exports = Quest;
