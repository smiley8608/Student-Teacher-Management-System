
import mongoose from "mongoose";

const leaveSchema=new mongoose.Schema({
    student_id:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'student'
    },courses:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'courses'
    },startdate:{
        type:String,
        required:true
    },enddate:{
        type:String,
        required:true,
    },reason:{
        type:String,
        required:true
    },onedayleave:{
        type:Boolean,
        required:true
    }
})
const LeaveModel=mongoose.model('LeaveRequest',leaveSchema)
export default LeaveModel