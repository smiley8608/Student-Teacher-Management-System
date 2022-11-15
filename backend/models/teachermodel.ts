
import mongoose from "mongoose";

const TeacherSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true
    },courses:{
        type:mongoose.Types.ObjectId,
        require:true,
        ref:'courses'
    }
    ,email:{
        type:String,
        require:true
    },password:{
        type:String,
        require:true
    }
})

const TeacherModel=mongoose.model('Teacher',TeacherSchema)

export default TeacherModel