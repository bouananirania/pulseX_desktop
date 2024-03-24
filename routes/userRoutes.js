const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route pour créer un nouvel utilisateur
router.post('/addPatient', userController.createUser);

// Route pour supprimer un utilisateur
router.delete('/:userId', userController.deleteUser);

// Route pour mettre à jour un utilisateur
router.put('/:userId', userController.updateUser);

module.exports = router;
