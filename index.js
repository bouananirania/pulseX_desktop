// index.js

const express = require("express");

const { loginDoctor, getDoctorSettings } = require('./loginSetting');
const Add_Patient= require("./AddUser");
const { delet_user, update_user } = require("./UpdateDeleteUser"); 
const app = express();
const port = process.env.PORT|| 3000 ;

// Middleware pour analyser les corps de requête en JSON
app.use(express.json());


// Route pour se connecter en tant que médecin
app.post("/login_dr", loginDoctor);
// Route pour récupérer les paramètres du médecin
app.get('/settings', getDoctorSettings);
//cree un patient 
app.post("/Add_Patient",Add_Patient);
app.put("/users/:userId",update_user);
app.delete("/users/:userId",delet_user);



// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
