const { patientDB, bpmdb } = require('../config/db');
const  User   = require('../models/User');
const  Measurement   = require('../models/measurement');
const userserv =require('../services/usersrvc')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.createUser = async (req, res) => {
    try {
      const { fullName, email, idPulse, age, PhoneNumber, bloodType, wilaya, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const usercontrol =await userserv.registeruser(fullName, email, idPulse, age, PhoneNumber, bloodType, wilaya, hashedPassword)
      let tokendata ={id: usercontrol._id,
        email: usercontrol.email,
        fullName: usercontrol.fullName,
        password: hashedPassword,
        phonenumber: usercontrol.PhoneNumber,
        Age: usercontrol.age,
        Grp: usercontrol.bloodType,
        willaya: usercontrol.wilaya,
        idpulse: usercontrol.idPulse}
      var usertoken =await userserv.generatetoken(tokendata,"patients","10h")
          
      // Créer une nouvelle mesure associée à l'utilisateur dans la base de données de mesure
             const newMeasurement = new Measurement({
              user: usercontrol._id, 
              bpm: null 
               });
              const measurement = await newMeasurement.save();
              
              res.json({status:true,success:usercontrol})   
    }catch(err){console.log(err)}};
  
// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    /*// Vérifier si le token JWT est présent dans les en-têtes de la requête
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Accès refusé. Authentification requise.');

    // Vérifier et décoder le token JWT
    const decoded = jwt.verify(token, 'secretKey');
    
    // Vérifier si l'ID de l'utilisateur dans le token correspond à l'ID de l'utilisateur à supprimer
    if (decoded.userId !== userId) return res.status(403).send('Accès refusé. Token JWT invalide.');*/

    
    const deletedUser = await User.findByIdAndDelete(userId);
        // Vérifier si l'utilisateur a été supprimé avec succès
    if (!deletedUser) {
        // Si l'utilisateur n'est pas trouvé, renvoyer une réponse 404
        return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
      }
  
      // Renvoyer une réponse 204 (Pas de contenu) pour indiquer que la suppression a réussi
      res.status(204).send();
    } catch (err) {
      // Gérer les erreurs
      console.error(err);
      res.status(500).json({ success: false, message: 'Erreur lors de la suppression de l\'utilisateur' });
    }
  };
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUserData = req.body;
    /*// Vérifier si le token JWT est présent dans les en-têtes de la requête
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Accès refusé. Authentification requise.');

    // Vérifier et décoder le token JWT
    const decoded = jwt.verify(token, 'secretKey');
    
    // Vérifier si l'ID de l'utilisateur dans le token correspond à l'ID de l'utilisateur à supprimer
    if (decoded.userId !== userId) return res.status(403).send('Accès refusé. Token JWT invalide.');*/
   
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
    if (!updatedUser) {
        // Si l'utilisateur n'est pas trouvé, renvoyer une réponse 404
        return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
      }
  
      // Renvoyer l'utilisateur mis à jour en réponse
      res.json({ success: true, user: updatedUser });
    } catch (err) {
      // Gérer les erreurs
      console.error(err);
      res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour de l\'utilisateur' });
    }
  };

   exports.getuserdata=async(req,res)=>{
    try {
    const {userId}=req.params.userId;
    if (!userId) {
        return res.status(400).json({ status: false, message: "L'identifiant de l'utilisateur est manquant dans la requête." });
    }
    
    const userData = await userserv.getdata(userId); // Utiliser userService.getData pour obtenir les données de l'utilisateur
    res.json({ status: true, success: userData });
      } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Une erreur s'est produite lors de la récupération des données de l'utilisateur." });
  }}
