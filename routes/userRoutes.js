const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/addPatient', userController.createUser);//noresponse 
router.delete('/deletuser', userController.deleteUser);
router.put('/updateuser', userController.updateUser);
router.get('/getuserdata',userController.getuserdata);
//recuperer les patients du DR
router.get('/patients',userController.getPatientsByDoctorId);
router.post('/finding',userController.finding);

module.exports = router;
