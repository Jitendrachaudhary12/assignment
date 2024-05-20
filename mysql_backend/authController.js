const  jwt=require('jsonwebtoken')
const {comparePassword,hashPassword} =require('./authHelper')
const bcrypt = require('bcrypt');
const connect=require('./db');

 const loginController=async(req,res)=>{

    const {email,password}=req.body
    if(!email || !password){
        res.status(500).send({
            message:'Invalid email and password'
        })
    }
  connect.query(`SELECT * FROM users WHERE email = ?`,[email],async(err,result)=>{
       if(err) throw err;
       if(result.length>0){
    //  let hashed= await bcrypt.hash(password.toString(),10)
    //  console.log(hashed)
        const match=await comparePassword(password.toString(),result[0].password)
        if(!match){
            res.status(500).send({
                status:false,
                message:'Invalid password'
            })
        }
        const token=await jwt.sign({userId:result[0].id},process.env.JWT_SECRET,{expiresIn:'1m'})
        let user_data=result[0];
        const date = new Date(user_data.date_of_birth); // Create a Date object from the given date string
        const day = date.getUTCDate(); // Get the day
        const month = date.getUTCMonth() + 1; // Get the month (adding 1 because getUTCMonth returns zero-based month)
        const year = date.getUTCFullYear(); // Get the year
        // Construct the formatted date string in dd/mm/yyyy format
        const formattedDate = `${day}/${month}/${year}`;
        res.status(200).send({
            message:'Login Successfully',
            user:{
                id:user_data.id,
                name:user_data.first_name+' '+user_data.last_name,
                email:user_data.email,
                dob:formattedDate,
                phone:user_data.phone,
                image:user_data.image
            },
            token
        })
       }else{
        res.status(500).send({
            message:'User not found'
        })
       }
   });

//    console.log(result)
}
const getUserController=async(req,res)=>{
    const user_id=await user_id(req)
    console.log('hello jeet',user_id)
}

module.exports={loginController,getUserController}
