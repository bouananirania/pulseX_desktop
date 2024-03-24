const express = require("express");
const userRoutes = require("./routes/userRoutes");
const doctorRoutes = require("./routes/doctorRoutes");

const app = express();
const port = process.env.PORT || 3000;

// Middleware pour analyser les corps de requête en JSON
app.use(express.json());

// Route principale pour les utilisateurs
app.use("/users", userRoutes);

// Route principale pour les médecins
app.use("/doctors", doctorRoutes);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
