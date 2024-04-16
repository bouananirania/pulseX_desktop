const express = require('express');
const router = express.Router();
const multer  = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const doctorController = require('../controllers/doctorController');

// Route pour la connexion du médecin
router.post('/logindr', doctorController.loginDoctor);//checked

// Route pour obtenir les paramètres du médecin
router.get('/settingsdr', doctorController.getDoctorSettings);//checked

router.post('/registerdoctor',upload.single('photo'),doctorController.registerdoctor);//checked
router.delete('/deletedoc',doctorController.deletedoc);//nrmlm cb 
router.post('/updatedoc', doctorController.updatedoctor);//checked


module.exports = router;
