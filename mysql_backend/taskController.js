const  jwt=require('jsonwebtoken')
const {comparePassword,hashPassword} =require('./authHelper')
const bcrypt = require('bcrypt');
const connect=require('./db');

 const task=async(req,res)=>{

    const {company,date,inventories,remarks,store}=req.body
    console.log(company,date,inventories,remarks,store)
    if(!company || !date || !store || !inventories){
        res.status(500).send({
            success:false,
            message:'Please provide data '
        })
    }

    //checking inventory data validation
    const requiredKeys = ['itemCategory', 'item','quantity','totalCost','costPerUnit'];
    if(inventories){
      const validateInventories = (inventories, requiredKeys) => {
        const invalidInventories = [];
        inventories.forEach((inventory, index) => {
          const missingKeys = requiredKeys.filter(key => !inventory.hasOwnProperty(key) || inventory[key] === "");
          console.log(missingKeys)
          if (missingKeys.length > 0) {
            invalidInventories.push({ index, missingKeys });
          }
        });
        return invalidInventories;
      };
      const invalidInventories = validateInventories(inventories, requiredKeys);
      // console.log(invalidInventories)
if (invalidInventories.length > 0) {
  invalidInventories.forEach(({ index, missingKeys }) => {
    console.log(`Inventory at index ${index} is missing keys: ${missingKeys.join(', ')}`);
  });
  res.status(404).send({
    success:false,
    message:"Please fill all inventory data carefully"
  })
}else{
  res.status(200).send({
    success:true,
    message:"Data successfully added"
  })
    }
   }
}


module.exports={task}
