const Advice = require("../models/advice");

exports.registeradvice= async(req,res,next)=>{
    try{
    const {advice,userId,docname}=req.body;
    
        const adv =new Advice({advice,userId,docname});
        return await par.save();
    res.json({status:true,success:"user succsefully"});
    
  }catch(err){console.log(err)}};
  