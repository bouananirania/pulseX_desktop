const mongoose=require('mongoose');
const {doctorDB}=require('../config/db');
const { Schema }=mongoose;
const photoSchema = new mongoose.Schema({
    name: String,
    data: Buffer,
    contentType: String
  });
  
const Photo =doctorDB.model('Photo',photoSchema);
module.exports=Photo;