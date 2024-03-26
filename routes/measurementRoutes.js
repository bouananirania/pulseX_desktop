const express = require('express');
const router = express.Router();
const measurementController = require('../controllers/measurementController');
const { server } = require('../config/socketConfig'); // Importer le serveur Socket.IO

router.get('/latestBpm', (req, res) => {
  measurementController.sendLatestBpmToClient(server.io); // Passer l'instance de Socket.IO au contrôleur
  res.sendStatus(200);
});

module.exports = router;