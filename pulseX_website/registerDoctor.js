// registerDoctor.js

const bcrypt = require("bcrypt");
const Doctor = require("./models/Doctor");
const mongoose= require("mongoose");

// Connexion à la base de données MongoDB
mongoose.connect("mongodb://localhost:27017/website_doctor", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie"))
  .catch((err) => console.error("Erreur de connexion à MongoDB :", err));

async function registerDoctor(req, res) {
  try {
    const { fullName, email, age, wilaya, phone, specialite, password, confirmPassword } = req.body;
    // Vérifier si le mot de passe et le mot de passe de confirmation sont identiques
    if (password !== confirmPassword) {
      return res.status(400).send("Les mots de passe ne correspondent pas");
    }
    // Vérifier si le docteur existe déjà dans la base de données
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).send("Le docteur existe déjà");
    }
    // Hacher le mot de passe avant de l'enregistrer
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedconfirmPassword = await bcrypt.hash(confirmPassword, 10);
    // Créer un nouveau docteur avec Mongoose
    const newDoctor = new Doctor({ fullName, email, age, wilaya, phone, specialite, password: hashedPassword,confirmPassword:hashedconfirmPassword });
    await newDoctor.save();
    res.status(201).send("Inscription réussie");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

module.exports = registerDoctor;
