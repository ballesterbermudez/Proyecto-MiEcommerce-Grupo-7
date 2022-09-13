const jwt = require("jsonwebtoken");

const isAdmin=(req,res,next)=>{
    if (req.tokens.role==='GOD'|| req.tokens.role==='ADMIN'){
        
        next()
    }else{
        res.status(401).json({
            ok: false,
            msg: "Unauthorized",
          });
    }

}


module.exports=isAdmin