const mongoose = require('mongoose');
const User = require('./User'); // Importer le modèle User

const measurementSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bpm: Number,
  createdAt: { type: Date, default: Date.now }
});

const Measurement = mongoose.model('Measurement', measurementSchema);

module.exports = Measurement;
