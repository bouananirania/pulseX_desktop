const express = require("express");
const http = require('http');
const socketIo = require('socket.io');
const measurementController = require('./controllers/measurementController');
const userRoutes = require("./routes/userRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const measurementRoutes = require("./routes/measurementRoutes");


const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = process.env.PORT || 3000;

// Middleware pour analyser les corps de requête en JSON
app.use(express.json());
app.use(express.urlencoded({extended:true}))
// Route principale pour les utilisateurs
app.use("/users", userRoutes);

// Route principale pour les médecins
app.use("/doctors", doctorRoutes);
//route pour les donnees bpm 
app.use("/measurement", measurementRoutes);


// Écoute des nouvelles connexions Socket.IO
io.on('connection', (socket) => {
  console.log('Nouvelle connexion Socket.IO :', socket.id);
  measurementController.sendLatestBpmToClient(io);
  // Gérer la déconnexion du client
  socket.on('disconnect', () => {
    console.log('Client déconnecté :', socket.id);
  });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
