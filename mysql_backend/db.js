const mysql=require('mysql');
const connect=mysql.createConnection({
    // const connect=mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'root',
    password:'',
    database:'node-mysql'

})
connect.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
  });
  
module.exports=connect