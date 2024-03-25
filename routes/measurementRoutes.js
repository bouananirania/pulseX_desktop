// measurementRoutes.js
const express = require('express');
const router = express.Router();
const measurementController = require('../controllers/measurementController');

// Route pour envoyer les dernières valeurs BPM des utilisateurs au client
router.get('/latestBpm', measurementController.sendLatestBpmToClient);
// Autres routes pour manipuler les mesures de BPM

module.exports = router;
