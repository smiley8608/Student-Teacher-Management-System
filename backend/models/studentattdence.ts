
import mongoose from "mongoose";

const attendenceSchema=new mongoose.Schema({
    rollno:{
        type:String,
        required:true
    },studentname:{
        type:String,
        required:true
    },attendence:{
        type:Array,
        required:true
    },month:{
        type:String,
        required:true
    },year:{
        type:String,
        required:true
    },student_id:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'students'
    },courses:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'courses'
    }
})

export const AttendenceModel=mongoose.model('attendence',attendenceSchema)