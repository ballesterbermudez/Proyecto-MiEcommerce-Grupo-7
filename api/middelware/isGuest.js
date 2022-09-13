const jwt = require("jsonwebtoken");

const isGuest=(req,res,next)=>{
    if (req.tokens.role==='GOD'||req.tokens.role==='ADMIN'||req.tokens.role==='GUEST'){
        
        next()
    }else{
        res.status(401).json({
            ok: false,
            msg: "Unauthorized",
          });
    }

}


module.exports=isGuest