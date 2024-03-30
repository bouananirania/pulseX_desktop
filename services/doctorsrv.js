const DoctorModel = require('../models/Doctor'); 
const jwt = require('jsonwebtoken');

class DoctorService {
  static async registerDoctor(fullname,email, age, wilaya,phone,specialite, password,confirmPassword ) {
    try {
      const newDoctor = new DoctorModel({  fullname,email, age, wilaya,phone,specialite, password,confirmPassword });
      return await newDoctor.save();
    } catch (err) {
      console.error(err);
    }
  }

  static async generateToken(tokenData, secretKey, jwtExpire) {
    try {
      return jwt.sign(tokenData, secretKey, { expiresIn: jwtExpire });
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = DoctorService;
