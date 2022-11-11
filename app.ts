
import express = require('express')
import mongoose from 'mongoose'
import bodyParser=require('body-parser')
import cors from 'cors'
import TeacherRouter from './router/teacherRouter'
import StudentRouter from './router/studentrouter'

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors({
    origin:'http://localhost:3000',
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}))
app.use('/',TeacherRouter)
app.use('/student',StudentRouter)
app.use('/studentphoto',express.static('studentphoto'))
mongoose.connect('mongodb://localhost:27017/ims', (err) => {
    if (err) {
        console.log(err);

    } console.log('DataBase connected successfully')
    app.listen(3002,()=>{
        console.log('server connected at the port 3002!');
        
    })
    }
)
