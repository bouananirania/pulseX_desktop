// Importer le modèle Doctor depuis le fichier doctor.js
const { Doctor, User } = require('./pulseX_website/models/schemas');
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/website_doctor", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie"))
  .catch((err) => console.error("Erreur de connexion à MongoDB :", err));

// Route de connexion
exports.loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Trouver le docteur dans la base de données
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
exports.getDoctorSettings =  async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ email: req.body.email }); 
        //sending all doctor data  
        res.json( doctor );
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur de serveur");
    }
};


