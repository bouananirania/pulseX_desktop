// db.js

const mongoose = require('mongoose');

// Connexion à la base de données des médecins
const doctorDB = mongoose.createConnection("mongodb+srv://Doctors:doctor2024@doctors.ihw52o6.mongodb.net/Doctors", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

doctorDB.on('connected', () => {
  console.log("Connexion à la base de données des médecins réussie");
});

doctorDB.on('error', (err) => {
  console.error("Erreur de connexion à la base de données des médecins :", err);
});

// Connexion à la base de données des patients
const patientDB = mongoose.createConnection("mongodb+srv://patients:patients@patients.5m4b6xi.mongodb.net/patients", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

patientDB.on('connected', () => {
  console.log("Connexion à la base de données des patients réussie");
});

patientDB.on('error', (err) => {
  console.error("Erreur de connexion à la base de données des patients :", err);
});

module.exports = {
  doctorDB,
  patientDB
};
