const  User   = require('../models/User');
const userserv =require('../services/usersrvc')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.createUser = async (req, res) => {
    try {
      const { fullName, email, idPulse, age, PhoneNumber, bloodType, wilaya, password,details,maladie,gender } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      // Récupérer l'ID du médecin à partir du jeton JWT
    const token = req.headers.authorization.split(' ')[1]; // Assurez-vous que le jeton JWT est correctement envoyé dans l'en-tête Authorization
    const decodedToken = jwt.verify(token, 'secretKey');
    const Doctorid = decodedToken.id;
      const usercontrol =await userserv.registeruser(fullName, email, idPulse, age, PhoneNumber, bloodType, wilaya, hashedPassword,details,maladie,gender, Doctorid );

              res.json({status:true,success:usercontrol})   
    }catch(err){console.log(err)}};

    exports.getPatientsByDoctorId = async (req, res) => {
      try {
        const token = req.headers.authorization.split(' ')[1]; 
        const decodedToken = jwt.verify(token, 'secretKey');
        const Doctorid = decodedToken.id;
          const patients = await User.find({ idDoctor: Doctorid });
  
          res.json({ success: true, patients: patients });
      } catch (err) {
          console.error(err);
          res.status(500).json({ success: false, message: "Erreur lors de la récupération des patients du médecin" });
      }
  };

  
// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
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
    /*if (!userId) {
        return res.status(400).json({ status: false, message: "L'identifiant de l'utilisateur est manquant dans la requête." });
    }
    */
    const userData = await userserv.getdata(userId); 
    res.json({ status: true, success: userData });
      } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Une erreur s'est produite lors de la récupération des données de l'utilisateur." });
  }}
