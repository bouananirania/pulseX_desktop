const express = require('express');
const router = express.Router();
const multer  = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const doctorController = require('../controllers/doctorController');

// Route pour la connexion du médecin
router.post('/logindr', doctorController.loginDoctor);

// Route pour obtenir les paramètres du médecin
router.get('/settingsdr', doctorController.getDoctorSettings);

router.post('/registerdoctor',upload.single('photo'),doctorController.registerdoctor);
router.post('/deletedoc',doctorController.deletedoc);
router.post('/updatedoc', doctorController.updatedoctor);

module.exports = router;
