
// Importer le modèle Doctor depuis le fichier doctor.js
const { Doctor } = require('../models/Doctor');
const bcrypt = require("bcrypt");
const { doctorDB } = require('../config/db');

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
     // Générer un nouveau jeton JWT pour le médecin
    const token = generateJWT(doctor._id);
    // Si tout est correct, renvoyer un message de connexion réussie
    res.status(200).send("Connecté avec succès", token);
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
       // Vérifier si le token JWT est présent dans les en-têtes de la requête
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Accès refusé. Authentification requise.');

    // Vérifier et décoder le token JWT
    const decoded = jwt.verify(token, 'secretKey');
    
    // Vérifier si l'ID de l'utilisateur dans le token correspond à l'ID de l'utilisateur à supprimer
    if (decoded.userId !== userId) return res.status(403).send('Accès refusé. Token JWT invalide.');
    // Renvoyer tous les paramètres du docteur
    res.json(doctor);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur de serveur");
  }
};
