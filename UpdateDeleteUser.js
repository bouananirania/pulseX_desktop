// userEndpoints.js

const express = require('express');
const { patientDB } = require('./db'); // Importer la connexion à la base de données des patients
const { User } = require('./pulseX_website/models/schemas');

// Delete user
exports.delet_user = async (req, res) => {
  try {
    const userId = req.params.userId;
    // Utiliser la connexion à la base de données des patients pour accéder au modèle User
    await patientDB.then(() => {
      User.findByIdAndDelete(userId, (err, doc) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error deleting user');
        } else {
          res.status(204).send();
        }
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting user');
  }
};

// Update user
exports.update_user = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating user');
  }
};
