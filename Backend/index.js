require('dotenv').config()
const express=require('express');
const app=express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {logger}=require('./middleware/logger');
const errorHandler=require('./middleware/errorHandler');


const cookieParser=require('cookie-parser');
const cors=require('cors');
const corsOptions=require('./config/corsOptions');



app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());


app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));


const authRouter=require('./Routes/authRoutes');
app.use('/auth',authRouter);

const patientRouter=require('./Routes/patientRoutes');
app.use('/patient',patientRouter);


//testing server running
app.get("/", (req, res)=>{
    res.send("welcome to server");
    });

app.listen(process.env.PORT,()=>
{
    console.log(`listening on port ${process.env.PORT}` )
});