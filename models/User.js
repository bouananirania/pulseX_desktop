const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    idPulse: { type: String, required: true, unique: true },
    dateOfBirth: { type: Date, required: true },
    bloodType: { type: String, required: true },
    wilaya: { type: String, required: true },
    password: { type: String, required: true },
    PhoneNumber:{ type: Number, required: true }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
