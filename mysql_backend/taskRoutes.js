const authenticateToken=require('./middleware');
const express=require('express');
const {loginController, getUserController}=require('./authController');
const { task } = require('./taskController');

const router=express.Router()

router.post('/add',task)

module.exports=router
