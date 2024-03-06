const express = require('express');
const mongoose = require('mongoose');
const { Doctor, User } = require('./pulseX_website/models/schemas');
const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/app_db")
  .then(() => console.log("Connexion à MongoDB réussie"))
  .catch((err) => console.error("Erreur de connexion à MongoDB :", err));

// Route to handle user creation
module.exports  = async function (req, res) {
  try {
    // Extract user data from request body
    const { fullName, email, idPulse, dateOfBirth, bloodType, wilaya, password, confirmPassword } = req.body;

    // Create a new user instance
    const newUser = new User({
      fullName,
      email,
      idPulse,
      dateOfBirth: new Date(dateOfBirth),
      bloodType,
      wilaya,
      password,
      confirmPassword
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating user');
  }
};


