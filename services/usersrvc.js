const user=require('../models/User')
class serviceuser{
     static async registeruser(fullName, email, idPulse, age, PhoneNumber, bloodType, wilaya, password){
       try{
       const newpatient=new user({fullName, email, idPulse, age, PhoneNumber, bloodType, wilaya, password})
       return await newpatient.save()
          
       }catch(err){console.log(err)}
     }

     static async getdata(userId){
      try{
      const data=await user.find({userId})
      return data

      }catch(err){console.log(err)}
    }
    static async generatetoken(tokendata,secretkey,jwt_expire){
        return jwt.sign(tokendata,secretkey,{expiresIn:jwt_expire})
    }

    }

   
module.exports=serviceuser;