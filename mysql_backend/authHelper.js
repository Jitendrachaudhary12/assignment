const bcrypt = require('bcrypt');

const jwt =require('jsonwebtoken')
 const hashPassword=async(password)=>{
    try{
        const saltRound=10;
        const hashedPassword=await bcrypt.hash(password,saltRound)
        return hashedPassword
    }catch(err){
        console.log(err)
    }
}
module.exports=hashPassword
const comparePassword=(password,hashedPassword)=>{
   return bcrypt.compare(password,hashedPassword)
}
module.exports= {comparePassword}

const user_id=async(req)=>{
    const token=req.headers.authorization.split(' ')[1];
    try {
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        // const userId=decode.userId
        return decode.userId
    } catch (error) {
        console.error('Error decoding token',error)
        return null
    }
}

module.exports=user_id