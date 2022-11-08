
import express =require('express')
import Joi from 'joi'
import bcrypt =require('bcrypt')
import Jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { UpdatedStudentProps } from '../type'
import StudentModel from '../models/studentmodel'


dotenv.config()

const studentSchema=Joi.object({
    studentname:Joi.string().max(40).trim().required(),
    rollno:Joi.string().alphanum().max(10).required(),
    course:Joi.string().required(),
    department:Joi.string().required(),
    dob:Joi.date().required()
})

const StudentRegister=(req:UpdatedStudentProps,res:express.Response)=>{
    const {studentname,rollno,course,department,dob,studentPhoto}= req.body.data

    studentSchema.validateAsync({studentname,rollno,course,department,dob})
    .then(validate=>{
        StudentModel.find({rollno:rollno})
        .then(rollnoarray =>{
            if(rollno.length>=1){
                return res.json({message:'Student rollno already exists!'})
            }else{
                bcrypt.hash(dob,8)
                .then(hassedpass=>{
                    if(hassedpass){
                        StudentModel.create({studentname,course,department,rollno:rollnoarray,bod:hassedpass,studentPhoto})
                        .then(result =>{
                            if(result){
                                if(process.env.STD_SECURT){
                                    let token=Jwt.sign({_id:result.id},process.env.STD_SECURT)
                                    return res.json({message:'Student Account created!',Student:result,Auth:true,tkn:token})
                                }
                            }
                        })
                        .catch(err=>{
                            return res.json({message:err})
                        })
                    }
                })
                .catch(err=>{
                    return res.json({message:err})
                })
            }
        })
    })
    .catch(err=>{
        return res.json({message:err})
    })
}