
import express =require('express')
import Joi = require('joi')
import { CoursModel } from '../models/course'

const courseSchema=Joi.object({
    course:Joi.string().required(),
    department:Joi.string().required()
})
export const AddCourse=(req:express.Request,res:express.Response)=>{
    const {course,department}=req.body.data

    courseSchema.validateAsync({course,department})
    .then(validate=>{
        CoursModel.find({course:course,department:department})
        .then(existCourse =>{
            if(existCourse.length>=1){
                return res.json({message:'Course already exists !'})
            }else{

                CoursModel.create({course,department})
                .then(result=>{
                    if(result){
                        return res.json({message:'Course added successfully'})
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

export const GetCourse=(req:express.Request,res:express.Response)=>{
    CoursModel.find({})
    .then(result =>{
        if(result.length>=1){
            return res.json({course:result})
        }
    })
    .catch(err=>{
        return res.json({message:err})
    })
}