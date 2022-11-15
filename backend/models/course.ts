
import mongoose from "mongoose";

const courseSchema=new mongoose.Schema({
    course:{
        type:String,
        required:true
    },department:{
        type:String,
        required:true
    }
})

export const CoursModel=mongoose.model('courses',courseSchema)