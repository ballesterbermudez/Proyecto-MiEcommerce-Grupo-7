const verify = {
    chekGetsGeneral: (req,resp,next) =>{

        const token = req.token;

        if(token)
        {
            next();
        }
        else
        {
            resp.status(400).json({message : "acceso no autorizado"});
        }

    },

    checkGetUsers: (req,resp,next) =>{

        const token = req.token

        if(token)
        {
            if(req.tokens.role==='GOD'|| req.tokens.role==='ADMIN')
            {
                next();
            }
            else
            {
                if(token.id == req.params.id)
                {
                    next()
                }
                else
                {
                    resp.status(400).json({message : "acceso no autorizado"});
                }
            }
        }
        else
        {
            resp.status(400).json({message : "acceso no autorizado"});
        }
    },

    checkUpdateGeneral: (req,resp,next) => {

        if (req.tokens.role==='GOD')
        {
            next();
        }
        else
        {
            resp.status(400).json({message : "acceso no autorizado"});
        }

    },

    checkUpdateUser: (req,resp,next) => {

        const token = req.token

        if(token)
        {
            if(token.role === 'GOD')
            {
                next();
            }
            else{
                if(token.id == req.params.id)
                {
                    next();
                }
                else
                {
                    resp.status(400).json({message : "acceso no autorizado"});
                }
            }
        }
        else
        {
            resp.status(400).json({message : "acceso no autorizado"});
        }

    }
    
}
module.exports = verify