// Importer le modèle Doctor depuis le fichier doctor.js
const { Doctor } = require('./pulseX_website/models/schemas');
const bcrypt = require("bcrypt");
const { doctorDB } = require('./db');

// Route de connexion
exports.loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Utiliser la connexion à la base de données des médecins depuis db.js
    await new Promise((resolve) => {
      doctorDB.once('connected', () => {
        resolve();
      });
    });

    // Trouver le docteur dans la base de données des médecins
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(400).send("Adresse e-mail incorrecte");
    }

    // Vérifier si le mot de passe correspond
    const passwordMatch = await bcrypt.compare(password, doctor.password);
    if (!passwordMatch) {
      return res.status(400).send("Mot de passe incorrect");
    }

    // Si tout est correct, renvoyer un message de connexion réussie
    res.status(200).send("Connecté avec succès");
  } catch (err) {
    // En cas d'erreur, renvoyer un message d'erreur avec le code d'erreur
    res.status(500).send({ message: err.message });
  }
};

// Route pour obtenir les paramètres du docteur
exports.getDoctorSettings = async (req, res) => {
  try {
    const { email } = req.body;

    // Utiliser la connexion à la base de données des médecins depuis db.js
    await new Promise((resolve) => {
      doctorDB.once('connected', () => {
        resolve();
      });
    });

    // Trouver les paramètres du docteur dans la base de données des médecins
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(400).send("Adresse e-mail incorrecte");
    }

    // Renvoyer tous les paramètres du docteur
    res.json(doctor);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur de serveur");
  }
};
