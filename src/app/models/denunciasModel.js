/**
 * Modelo das Denuncias
 */

const mongoose = require('../../database');

const denunciaSchema = new mongoose.Schema({
  by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  location: {
    latitude:  Number,
    longitude:  Number
  },
  lat: Number,
  lng: Number,
  rank: {
    type: Number,
    default: 0,
  },
  whoVote: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  }],
});

const Denuncia = mongoose.model('Denuncia', denunciaSchema);
module.exports = Denuncia;
