const jwt = require("jsonwebtoken");

const isGod=(req,res,next)=>{
    if (req.tokens.role==='GOD'){
        
        next()
    }else{
        res.status(401).json({
            ok: false,
            msg: "Unauthorized",
          });
    }

}


module.exports=isGod