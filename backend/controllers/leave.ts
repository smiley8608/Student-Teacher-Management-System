
import express =require('express')

import LeaveModel from '../models/leaveModel';
import StudentModel from '../models/studentmodel'
import { UpdatedStudentProps, UpdatedTeacherprops } from '../type';

export const LeaveRequest=(req:express.Request,res:express.Response)=>{
    const data=req.body.data
     console.log(data);
    
     StudentModel.find({courses:data.courses._id})
     .then(studentsArray=>{
        if(studentsArray.length<=0){
            return res.json ({message:"please enter the valid department"})
        }else{
            StudentModel.findById({_id:data._id})
            .then(studentObject=>{
                if(!data.onedayleave){
                    
                    LeaveModel.create({student_id:data._id,courses:data.courses._id,startdate:data.startdate,enddate:data.enddate,onedayleave:data.onedayleave,reason:data.reason})
                    .then(result=>{
                        return res.json({message:"leave Request Sent successfully!"})
                        
                    }).catch(err=>{
                        return res.json({message:err})
                    })
                }else{
                    LeaveModel.create({student_id:data._id,courses:data.courses._id,startdate:data.startdate,enddate:data.startdate,onedayleave:data.onedayleave,reason:data.reason})
                    .then(result=>{
                        return res.json({message:"leave Request Sent successfully!"})
                        
                    }).catch(err=>{
                        return res.json({message:err})
                    }) 
                }
            })
        }
     })
     .catch(err=>{
        return res.json({message:err})
     })
    // StudentModel.findById({_id:data._id})
    // .then(studentObject=>{
    //     if(!studentObject){
    //         return res.json({message:'this student not available'})
    //     }else{
    // StudentModel.find           
    //     }
    // })
    // .catch()
}
export const LeaveResponce=(req:UpdatedTeacherprops,res:express.Response)=>{
    console.log(req.Teacher);
    const Teacher=req.Teacher
    LeaveModel.find({courses:Teacher.courses as string}).populate([{path:'courses',select:'course department'},{path:'student_id',select:'studentname rollno'}])
    .then(LeaveObject=>{
        console.log(LeaveObject);
        
        if(LeaveObject.length<1){
            return res.json({message:'No Leave Request'})
        }else{
            return res.json({Student:LeaveObject})
        }
    })   
}

export const LeaveApproval=(req:express.Request,res:express.Response)=>{
    const _id=req.body._id
    LeaveModel.findOneAndUpdate({_id:_id},{status:'Approved...'})
    .then(responce=>{
      return res.json({message:'Leave request has been approved'})  
    })
    .catch(err=>{
        return res.json({message:err})
    })
}
export const LeaveReject=(req:express.Request,res:express.Response)=>{
    const _id=req.body._id
    LeaveModel.findOneAndUpdate({_id:_id},{status:'Rejected...'})
    .then(responce=>{
        console.log(responce);
        return res.json({message:'Leave Request has been Rejected'})
    }).catch(err=>{
        return res.json({message:err})
    })
}
export const GetLeaveList=(req:UpdatedStudentProps,res:express.Response)=>{
    const student=req.Student
    LeaveModel.find({student_id:student._id}).populate({path:'student_id',select:'rollno studentname'})
    .then(LeaveArray=>{
        console.log(LeaveArray);
        if(LeaveArray.length<=0){
            return res.json({message:'No leave Requests Available !'})
        }else{
            return res.json({Student:LeaveArray})

        }        
    }).catch(err=>{
        return res.json({message:err})
    })    
}