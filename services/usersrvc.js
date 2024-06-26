
const user = require("../models/User");
const bpm = require("../models/Bpm");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//const bpmg= require('../models/User');
class serviceuser{
     static async registeruser(fullName, email, idPulse, age, PhoneNumber, bloodType, wilaya, password,details,maladie,gender, idDoctor){
       try{
       const newpatient=new user({fullName, email, idPulse, age, PhoneNumber, bloodType, wilaya, password,details,maladie,gender,idDoctor});
       const savedUser = await newpatient.save();
       const newbpm = new bpm({userId: savedUser._id, idPulse  });
       await newbpm.save();
       return savedUser;
          
       }catch(err){console.log(err)}
     }

     static async getdata(_id){
      try{
      const data=await user.find({_id});
      
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
      static async Find(fullName){
        
        const finding = await user.findOne({ fullName });
        return finding;
  
       
      }
     
     static async generatetoken(tokendata,secretkey,jwt_expire){
        return jwt.sign(tokendata,secretkey,{expiresIn:jwt_expire})
    }

    }

   
module.exports=serviceuser;