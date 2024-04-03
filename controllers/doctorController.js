
// Importer le modèle Doctor depuis le fichier doctor.js
const { Doctor } = require('../models/Doctor');
const bcrypt = require("bcrypt");
const { doctorDB } = require('../config/db');
const docserv =require('../services/doctorsrv');

// Route de connexion
exports.loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
     // Trouver le docteur dans la base de données des médecins
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(400).send("Adresse e-mail incorrecte");
    }

    // Vérifier si le mot de passe correspond
    const passwordMatch = await bcrypt.compare(password, doctor.password);
    if (!passwordMatch) {
      return res.status(400).send("Mot de passe incorrect");
    }
     // Générer un nouveau jeton JWT pour le médecin
     let tokendata ={id:doctor._id,email:doctor.email,fullname:doctor.fullName,password:doctor.password,phone:doctor.phone,Age:doctor.age,Specialite:doctor.specialite,willaya:doctor.willaya}
     var token =await docserv.generateToken(tokendata,'secretKey',"1h")
   
   res.json({status:true,success:"user succsefully",token:token})

  } catch (err) {
    // En cas d'erreur, renvoyer un message d'erreur avec le code d'erreur
    res.status(500).send({ message: err.message });
  }
};

// Route pour obtenir les paramètres du docteur
exports.getDoctorSettings = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Trouver les paramètres du docteur dans la base de données des médecins
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(400).send("Adresse e-mail incorrecte");
    }
       /*
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Accès refusé. Authentification requise.');

    // Vérifier et décoder le token JWT
    const decoded = jwt.verify(token, 'secretKey');
    
    // Vérifier si l'ID de l'utilisateur dans le token correspond à l'ID de l'utilisateur à supprimer
    if (decoded.userId !== userId) return res.status(403).send('Accès refusé. Token JWT invalide.');*/

    // Renvoyer tous les paramètres du docteur
    res.json(doctor);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur de serveur");
  }
};
exports.verifytoken=async(req,res,next)=>{
    const tokver=req.cookies.Jwt
    if(tokver){
      Jwt.verify(tokver,"secretkey",(err,decodedtoken)=>{
          if(err){
              res.status(400).json({msg:"dont user"})
          }else{
              next()
          }
      })
    }
}
