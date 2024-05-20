const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const connect=require('./db');
const dotenv =require('dotenv');
const authRoutes=require('./authRoutes')
const taskRoutes=require('./taskRoutes')
dotenv.config()
const app=express();
app.use(cors())
//middleware
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1/task',taskRoutes)
app.use('/api/v1/auth',authRoutes)
// app.use(body_parser.join());

const PORT=process.env.PORT||3000

app.listen(PORT,()=>{
    console.log(`Serrver is running on port ${PORT}`)
})
