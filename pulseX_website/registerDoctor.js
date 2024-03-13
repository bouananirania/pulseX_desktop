// registerDoctor.js

const bcrypt = require("bcrypt");
const { Doctor } = require('./models/schemas');
const { doctorDB } = require('../db');

async function registerDoctor(req, res) {
  try {
    const { fullName, email, age, wilaya, phone, specialite, password, confirmPassword } = req.body;
    // Vérifier si le mot de passe et le mot de passe de confirmation sont identiques
    if (password !== confirmPassword) {
      return res.status(400).send("Les mots de passe ne correspondent pas");
    }
    // Utiliser la connexion à la base de données des médecins depuis db.js
    await doctorDB.then(() => {
      // Vérifier si le docteur existe déjà dans la base de données
      Doctor.findOne({ email }, async (err, existingDoctor) => {
        if (err) {
          return res.status(500).send("Erreur lors de la recherche du docteur existant");
        }
        if (existingDoctor) {
          return res.status(400).send("Le docteur existe déjà");
        }
        // Hacher le mot de passe avant de l'enregistrer
        const hashedPassword = await bcrypt.hash(password, 10);
        const hashedconfirmPassword = await bcrypt.hash(confirmPassword, 10);
        // Créer un nouveau docteur avec Mongoose
        const newDoctor = new Doctor({ fullName, email, age, wilaya, phone, specialite, password: hashedPassword, confirmPassword: hashedconfirmPassword });
        await newDoctor.save((err, doc) => {
          if (err) {
            return res.status(500).send("Erreur lors de l'enregistrement du nouveau docteur");
          }
          res.status(201).send("Inscription réussie");
        });
      });
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

module.exports = registerDoctor;
