const mongoose = require('mongoose');
const bpmdb = require('../config/db');
const User = require('./User'); 

const measurementSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bpm: Number,
  createdAt: { type: Date, default: Date.now }
});

const Measurement = bpmdb.bpmdb.model('Measurement', measurementSchema);

module.exports = Measurement;
