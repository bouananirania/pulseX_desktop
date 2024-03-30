const mongoose = require('mongoose');
const patientDB = require('../config/db');
const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    idPulse: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    PhoneNumber:{ type: Number, required: true },
    bloodType: { type: String, required: true },
    wilaya: { type: String, required: true },
    password: { type: String, required: true }
    
});

const User = patientDB.patientDB.model('User', userSchema);

module.exports = User;
