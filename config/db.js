// db.js

const mongoose = require('mongoose');

// Connexion à la base de données des médecins
const doctorDB = mongoose.createConnection("mongodb+srv://Doctors:doctor2024@doctors.ihw52o6.mongodb.net/Doctors");

doctorDB.on('connected', () => {
  console.log("Connexion à la base de données des médecins réussie");
});

doctorDB.on('error', (err) => {
  console.error("Erreur de connexion à la base de données des médecins :", err);
});

// Connexion à la base de données des patients
//mongodb+srv://patients:patients@patients.5m4b6xi.mongodb.net/patients
const patientDB = mongoose.createConnection("mongodb+srv://Doctors:doctor2024@doctors.ihw52o6.mongodb.net/patients");

patientDB.on('connected', () => {
  console.log("Connexion à la base de données des patients réussie");
});

patientDB.on('error', (err) => {
  console.error("Erreur de connexion à la base de données des patients :", err);
});

// Connexion à la base de données arduino
//const bpmdb = mongoose.createConnection("mongodb+srv://bpmdb:bpmdb@bpmdb.7o5wts5.mongodb.net/?retryWrites=true&w=majority&appName=bpmdb");
const bpmdb = mongoose.createConnection("mongodb+srv://Doctors:doctor2024@doctors.ihw52o6.mongodb.net/patients");

bpmdb.on('connected', () => {
  console.log("Connexion à la base de données bpm");
});

bpmdb.on('error', (err) => {
  console.error("Erreur de connexion à la base de données bpm :", err);
});

const advicedb = mongoose.createConnection("mongodb+srv://Doctors:doctor2024@doctors.ihw52o6.mongodb.net/Doctors");

advicedb.on('connected', () => {
  console.log("Connexion à la base de données advice reussie");
});

advicedb.on('error', (err) => {
  console.error("Erreur de connexion à la base de données advice :", err);
});

module.exports = {
  doctorDB,
  patientDB,
  bpmdb,
  advicedb,
};
