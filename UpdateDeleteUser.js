const express = require('express');
const mongoose = require('mongoose');
const { Doctor, User } = require('./pulseX_website/models/schemas');

// Connect to MongoDB
/*mongoose.connect("mongodb://localhost:27017/app_db")
  .then(() => console.log("Connexion à MongoDB réussie"))
  .catch((err) => console.error("Erreur de connexion à MongoDB :", err));*/

// Delete user
 
exports.delet_user = async (req, res) => {
  try {
    const userId = req.params.userId;
    await User.findByIdAndDelete(userId);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting user');
  }
};

// Update user
exports.update_user =async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating user');
  }
};


