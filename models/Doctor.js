const mongoose = require('mongoose');
const doctorDB = require('../config/db')

const doctorSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    wilaya: { type: String, required: true },
    phone: { type: String, required: true },
    specialite: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true }
});

const Doctor = doctorDB.doctorDB.model('Doctor', doctorSchema);

module.exports = Doctor;
