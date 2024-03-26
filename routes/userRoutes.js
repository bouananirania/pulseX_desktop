const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const dbq=require('../models/uUer')
// Route pour créer un nouvel utilisateur
router.post('/addPatient', userController.createUser);

// Route pour supprimer un utilisateur
router.delete('/:userId', userController.deleteUser);

// Route pour mettre à jour un utilisateur
router.put('/:userId', userController.updateUser);
router.get('/fetch',async (req,res)=>{
  try{
    const fetch =await dbq.find({})
    res.status(200).json(fetch)
    
  }catch(err){console.log(err)}
  
})
module.exports = router;
