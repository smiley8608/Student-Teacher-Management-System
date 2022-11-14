
import express =require('express')
import { createNonNullExpression } from 'typescript';
import LeaveModel from '../models/leaveModel';
import StudentModel from '../models/studentmodel'

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
                LeaveModel.create({student_id:data._id,courses:data.courses._id,startdate:data.startdate,enddate:data.enddate,onedayleave:data.onedayleave,reason:data.reason})
                .then(result=>{
                    return res.json({message:"leave Request Sent successfully!"})
                    
                }).catch(err=>{
                    return res.json({message:err})
                })
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