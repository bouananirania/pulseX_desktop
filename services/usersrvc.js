const user = require('../models/User');
const jwt = require('jsonwebtoken');
class serviceuser{
     static async registeruser(fullName, email, idPulse, age, PhoneNumber, bloodType, wilaya, password){
       try{
       const newpatient=new user({fullName, email, idPulse, age, PhoneNumber, bloodType, wilaya, password});
       const savedUser = await newpatient.save();
       return savedUser;
          
       }catch(err){console.log(err)}
     }

     static async getdata(userId){
      try{
      const data=await user.find({userId})
      return data;

      }catch(err){console.log(err)}
    }
    static async getbpm(Bpm,pulseid){
        try{
        const bpmg=new user({Bpm,idPulse})
        return await bpmg.save();
           }catch(err){console.log(err)}
      }

      static async findUserByIdPulse(idPulse){
        try {
            const userinfo = await user.findOne({ idPulse });
    
            if (userinfo) {
                return { fullName: user.fullName, userId: user._id };
            } else {
                return null;
            }
        } catch (error) {
            console.error("Erreur lors de la recherche de l'utilisateur par idPulse:", error);
            return null;
        }

      }
     
     static async generatetoken(tokendata,secretkey,jwt_expire){
        return jwt.sign(tokendata,secretkey,{expiresIn:jwt_expire})
    }

    }

   
module.exports=serviceuser;