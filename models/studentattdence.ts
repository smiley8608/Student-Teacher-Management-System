
import mongoose from "mongoose";

const attendenceSchema=new mongoose.Schema({
    rollno:{
        type:String,
        require:true
    },studentname:{
        type:String,
        require:true
    },attendence:{
        type:Array,
        require:true
    },month:{
        type:String,
        require:true
    },year:{
        type:String,
        require:true
    },student_id:{
        type:mongoose.Types.ObjectId,
        require:true
    },courses:{
        type:mongoose.Types.ObjectId,
        require:true
    }
})

export const AttendenceModel=mongoose.model('attendence',attendenceSchema)