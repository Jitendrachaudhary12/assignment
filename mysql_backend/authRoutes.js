const authenticateToken=require('./middleware');
const express=require('express');
const {loginController, getUserController}=require('./authController')

const router=express.Router()

router.post('/login',loginController)
// router.get('/user-auth',authenticateToken,(req,res)=>{
// res.status(200).send({ok:true})
// })
router.get('/user-auth',authenticateToken,getUserController)
module.exports=router
