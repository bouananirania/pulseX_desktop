const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

// Route pour la connexion du médecin
router.post('/logindr', doctorController.loginDoctor);

// Route pour obtenir les paramètres du médecin
router.get('/settingsdr', doctorController.getDoctorSettings);

module.exports = router;
