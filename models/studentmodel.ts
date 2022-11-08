
import { string } from "joi";
import mongoose from "mongoose";

const StudentScheme=new mongoose.Schema({
    studentname:{
        type:String,
        require:true
    },rollno:{
        type:String,
        require:true
    },course:{
        type:String,
        require:true
    },department:{
        type:String,
        require:true
    },studentPhoto:{
        type:String,
        require:true
    }
})
const StudentModel=mongoose.model('Student',StudentScheme)

export default StudentModel