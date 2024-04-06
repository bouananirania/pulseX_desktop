const mongoose = require('mongoose');
const Doctor = require('./Doctor');
const {patientDB} =require('../config/db');
const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    idPulse: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    PhoneNumber:{ type: Number, required: true },
    bloodType: { type: String, required: true },
    wilaya: { type: String, required: true },
    password: { type: String, required: true },
    details: { type: String },
    maladie : { type: String, required: true },
    gender :  { type: String, required: true },
    idDoctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    createdat: {
        type: Date,
        default: Date.now 
     }
    
});

const User = patientDB.model('User', userSchema);

module.exports = User;
