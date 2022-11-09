
import express = require('express')
import Joi from 'joi'
import bcrypt = require('bcrypt')
import Jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { UpdatedStudentProps } from '../type'
import StudentModel from '../models/studentmodel'
import multer = require('multer')
import { CoursModel } from '../models/course'


dotenv.config()

const studentSchema = Joi.object({
    studentname: Joi.string().max(40).trim().required(),
    rollno: Joi.string().alphanum().max(10).required(),
    course: Joi.string().required(),
    dob: Joi.date().required()
})

export const StudentRegister = (req: UpdatedStudentProps, res: express.Response) => {
    const { studentname, rollno, course, dob } = req.body
    studentSchema.validateAsync({ studentname, rollno, course, dob })
        .then(validate => {
            StudentModel.find({ rollno: rollno })
                .then(rollnoarray => {
                    if (rollnoarray.length >= 1) {
                        return res.json({ message: 'Student rollno already exists!' })
                    } else {
                        bcrypt.hash(dob, 8)
                            .then(hassedpass => {

                                if (hassedpass) {
                                    StudentModel.create({ studentname, course, rollno, dob: dob, password: hassedpass, path: req.file?.path })
                                        .then(result => {
                                            console.log("result" + result);

                                            if (result) {
                                                if (process.env.STD_SECURT) {
                                                    let token = Jwt.sign({ _id: result.id }, process.env.STD_SECURT)
                                                    return res.json({ message: 'Student Account created!', Student: result, Auth: true, tkn: token })
                                                }
                                            }
                                        })
                                        .catch(err => {
                                            return res.json({ message: err })
                                        })
                                }
                            })
                            .catch(err => {
                                return res.json({ message: err })
                            })
                    }
                })
        })
        .catch(err => {
            return res.json({ message: err })
        })
}

export const StudentList = (req: express.Request, res: express.Response) => {
    const id = req.body.id
    console.log(id);
    StudentModel.find({ courses: id })
        .populate({path:"courses", select:"department course"})
        .then(studentarray => {
            // console.log(studentarray);

            if (studentarray.length >= 1) {

                return res.json({ Student: studentarray })
            }
        })
        .catch(err => {console.log(err)
        
            return res.json({ message: err })
        })

    // CoursModel.findById({_id:id})
    // .then(result=>{
    //     console.log(result);

    //     if(!result){
    //         return 
    //     }else{
    //         StudentModel.find({course:result._id})
    //         .then(studentarray=>{
    //             console.log((studentarray));

    //             if(studentarray.length>1){

    //                 return res.json({Student:studentarray})
    //             }
    //         })
    //         .catch(err=>{
    //             return res.json({message:err})
    //         })
    //     }
    // }).catch(err=>{
    //     return res.json({message:err})
    // })
}