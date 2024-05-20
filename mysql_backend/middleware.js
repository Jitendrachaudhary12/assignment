const jwt=require('jsonwebtoken');

const authenticateToken=(req,res,next)=>{
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];
    if(token==null) return res.status(401).send({
        error:'Please provide token'
    })
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        console.log(err)
        if(err) return res.status(403).send({message:'Token expired'})
            req.user=user;
         next();
    })
}

module.exports= authenticateToken