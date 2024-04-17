const Advice = require("../models/advice");

exports.registeradvice= async(req,res,next)=>{
    try{
    const {advice,userId,docname}=req.body;
    
        const adv =new Advice({advice,userId,docname});
         await adv.save();
    res.json({status:true,success:"user succsefully"});
    
  }catch(err){console.log(err)}};

  exports.getadvice=async(req,res)=>{
    const {}=req.body;
    try
   { const getadv=await Advice.find({});
        return getadv;  res.json({status:true,success:getdatafrom})
    }catch(err){console.log(err)};}