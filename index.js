// index.js

const express = require("express");
const registerDoctor = require("./pulseX_website/registerDoctor");
const { loginDoctor, getDoctorSettings } = require('./loginSetting');
const app = express();
const port = 3000;

// Middleware pour analyser les corps de requête en JSON
app.use(express.json());


app.post('/register_dr', registerDoctor);
// Route pour se connecter en tant que médecin
app.post("/login_dr", loginDoctor);
// Route pour récupérer les paramètres du médecin
app.get('/settings', getDoctorSettings);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
