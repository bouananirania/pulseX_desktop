const mongoose = require('mongoose');
const {bpmdb} = require('../config/db');
const User = require("./User");

const bpmSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    idPulse: { type: String, required: true, unique: true },
    bpm: { type: Number}
})
const bpm = bpmdb.model('bpm', bpmSchema);
module.exports = bpm;