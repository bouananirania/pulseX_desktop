
// Importer le modèle Doctor depuis le fichier doctor.js
const { Doctor } = require('../models/Doctor');
const { Photo } = require('../models/imageModel');

const bcrypt = require("bcrypt");
const docserv =require('../services/doctorsrv');
const photo = require('../models/imageModel');

// Route de connexion
exports.loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(400).send("Adresse e-mail incorrecte");
    }
    const passwordMatch = await bcrypt.compare(password, doctor.password);
    if (!passwordMatch) {
      return res.status(400).send("Mot de passe incorrect");
    }
     let tokendata ={id:doctor._id,email:doctor.email,fullname:doctor.fullName,password:doctor.password,phone:doctor.phone,Age:doctor.age,Specialite:doctor.specialite,willaya:doctor.willaya}
     var token =await docserv.generateToken(tokendata,'secretKey',"1h")
   
   res.json({status:true,success:"user succsefully",token:token})

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

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

//pour test du docteur 
exports.registerdoctor= async(req,res,next)=>{
  try{
  const {fullName,email,age,wilaya,phone,specialite,password,confirmPassword,name,data,contentType}=req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const hashedconfirmPassword = await bcrypt.hash(confirmPassword, 10);
  const doccontrol =await docserv.registerDoctor(fullName,email,age,wilaya,phone,specialite,hashedPassword,hashedconfirmPassword,name,data,contentType);

  res.json({status:true,success:"user succsefully"});
  
}catch(err){console.log(err)}};

exports.updatedoctor= async(req,res)=>{
  const {id} = req.body;
  const {fullName,email,age,wilaya,phone,specialite,password,name} = req.body;
  try {
  const data  = await Doctor.findByIdAndUpdate({_id},  {fullName,email,age,wilaya,phone,specialite,password,name}, { new: true });
      res.json({status:true,success:update})
}catch(err){ return res.status(500).json({ message: ' server error', err: err.message });
}};

exports.deletedoc= async(req,res)=>{
  try{
  const {id}=req.body
  const deleteDr = await User.findByIdAndDelete({_id});
 res.json({status:true,success:deleteDr});
}catch(err){console.log(err);}};

exports.newload = 
  async (req, res)=> {
    try {
      const { name, data, contentType } = req.body;
      const pic = new Photo({
        name,
        data,
        contentType
      });
      await pic.save();
      return { status: true, message: 'picture uploaded successfully.' };
    } catch (error) {
      console.error('Error uploading photo:', error);
      res.status(500).send('Error uploading photo.');
    }
  }