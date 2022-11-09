
import mongoose from "mongoose";

const courseSchema=new mongoose.Schema({
    course:{
        type:String,
        require:true
    },department:{
        type:String,
        require:true
    }
})

export const CoursModel=mongoose.model('courses',courseSchema,'courses')