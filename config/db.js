// db.js

const mongoose = require('mongoose');

// Connexion à la base de données des médecins
const doctorDB = mongoose.createConnection("mongodb+srv://Doctors:doctor2024@doctors.ihw52o6.mongodb.net/?retryWrites=true&w=majority&appName=Doctors");

doctorDB.on('connected', () => {
  console.log("Connexion à la base de données des médecins réussie");
});

doctorDB.on('error', (err) => {
  console.error("Erreur de connexion à la base de données des médecins :", err);
});

// Connexion à la base de données des patients
const patientDB = mongoose.createConnection("mongodb+srv://patients:patients@patients.5m4b6xi.mongodb.net/?retryWrites=true&w=majority&appName=patients");

patientDB.on('connected', () => {
  console.log("Connexion à la base de données des patients réussie");
});

patientDB.on('error', (err) => {
  console.error("Erreur de connexion à la base de données des patients :", err);
});

// Connexion à la base de données arduino
//const bpmdb = mongoose.createConnection("mongodb+srv://bpmdb:bpmdb@bpmdb.7o5wts5.mongodb.net/?retryWrites=true&w=majority&appName=bpmdb");
const bpmdb = mongoose.createConnection("mongodb+srv://bpmdb:bpmdb@bpmdb.7o5wts5.mongodb.net/?retryWrites=true&w=majority&appName=bpmdb");

bpmdb.on('connected', () => {
  console.log("Connexion à la base de données des patients réussie");
});

bpmdb.on('error', (err) => {
  console.error("Erreur de connexion à la base de données des patients :", err);
});

module.exports = {
  doctorDB,
  patientDB,
  bpmdb,
};
