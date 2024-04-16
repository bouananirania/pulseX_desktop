const mongoose=require('mongoose');
const advicedb =require('../config/db');
const User = require('../models/User');
const { Schema }=mongoose ; 

const Adviceschema =new Schema({
   userId:{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' },
   docname:{
      type:String,
      required:false,
   },
   advice:{
      type:String,
      required:true,
   },

   createdat: {
      type: Date,
      default: Date.now ,
   }
})
Adviceschema.index({ advice: 1 }, { expireAfterSeconds: 24 * 60 * 60 });


const Advice=db.model('advice',Adviceschema);
module.exports=Advice;