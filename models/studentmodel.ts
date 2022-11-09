
import { string } from "joi";
import mongoose, { Mongoose } from "mongoose";

const StudentScheme=new mongoose.Schema({
    studentname:{
        type:String,
        require:true
    },rollno:{
        type:String,
        require:true
    },courses:{
        type:mongoose.Types.ObjectId,
        require:true,
        ref:'courses'
    },dob:{
        type:String,
        require:true
    },path:{
        type:String,
        require:true
    },password:{
        type:String,
        require:true
    }
})
const StudentModel=mongoose.model('Student',StudentScheme)

export default StudentModel