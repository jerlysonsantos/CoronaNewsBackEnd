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
    latitude:  mongoose.Decimal128,
    longitude:  mongoose.Decimal128
  },
  rank: {
    type: Number,
    default: 0,
  }
});

const Denuncia = mongoose.model('Denuncia', denunciaSchema);
module.exports = Denuncia;
