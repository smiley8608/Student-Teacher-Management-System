

import mongoose from "mongoose";

const StudentScheme=new mongoose.Schema({
    
    studentname:{
        type:String,
        required:true
    },rollno:{
        type:String,
        required:true
    },courses:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'courses'
    },dob:{
        type:String,
        required:true
    },path:{
        type:String,
        required:true
    },password:{
        type:String,
        required:true
    }
})
const StudentModel=mongoose.model('student',StudentScheme)

export default StudentModel