// models/schemas.js

const mongoose = require('mongoose');

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

const Doctor = mongoose.model('Doctor', doctorSchema);

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    idPulse: { type: String, required: true, unique: true },
    dateOfBirth: { type: Date, required: true },
    bloodType: { type: String, required: true },
    wilaya: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword:{ type: String, required: true }
});

const User = mongoose.model("User", userSchema);

module.exports = {Doctor, User}; 
