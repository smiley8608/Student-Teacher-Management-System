
import express = require('express')
import Joi from 'joi'
import bcrypt = require('bcrypt')
import Jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { AttendenceProps, UpdatedAttendenceProps, UpdatedStudentProps } from '../type'
import StudentModel from '../models/studentmodel'
import multer = require('multer')
import { CoursModel } from '../models/course'
import { AttendenceModel } from '../models/studentattdence'


dotenv.config()

const studentSchema = Joi.object({
    studentname: Joi.string().max(40).trim().required(),
    rollno: Joi.string().alphanum().max(10).required(),
    courses: Joi.string().required(),
    dob: Joi.string().required()
})

export const StudentRegister = (req: UpdatedStudentProps, res: express.Response) => {
    const { studentname, rollno, courses, dob } = req.body
    const date = new Date()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    // console.log("req.body"+req.body);

    studentSchema.validateAsync({ studentname, rollno, courses, dob })
        .then(validate => {
            StudentModel.find({ rollno: rollno })
                .then(rollnoarray => {
                    if (rollnoarray.length >= 1) {
                        return res.json({ message: 'Student rollno already exists!' })
                    } else {
                        bcrypt.hash(dob, 8)
                            .then(hassedpass => {

                                if (hassedpass) {

                                    StudentModel.create({ studentname, courses, rollno, dob: dob, password: hassedpass, path: req.file?.path })
                                        .then(result => {
                                            AttendenceModel.create({ studentname: result.studentname, student_id: result._id, courses: result.courses, rollno: result.rollno, attendence: [], month: month, year: year })
                                                .then(finalresult => {
                                                    console.log("result" + result);
                                                    console.log("finalresult" + finalresult);
                                                    if (process.env.STD_SECURT) {
                                                        let Token = Jwt.sign({ _id: result._id }, process.env.STD_SECURT)
                                                        if (result && finalresult) {
                                                            return res.json({ message: 'Student Account created!', Student: result, Auth: true, tkn: Token })
                                                        } else {
                                                            return res.json({ message: 'unable to create student account' })
                                                        }
                                                    }


                                                })
                                                .catch(err => {
                                                    console.log(err);

                                                })

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
        .populate({ path: "courses", select: "department course" })
        .then(studentarray => {
            // console.log(studentarray);

            if (studentarray.length >= 1) {

                return res.json({ Student: studentarray })
            }
        })
        .catch(err => {
            console.log(err)

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
const studentloginschema = Joi.object({
    rollno: Joi.string().required(),
    password: Joi.string().required()
})
export const StudentLogin = (req: express.Request, res: express.Response) => {
    const { rollno, password } = req.body.data
    studentloginschema.validateAsync({ rollno, password })
        .then(validate => {
            StudentModel.findOne({ rollno: rollno })
                .then(studentobject => {
                    if (!studentobject) {
                        return res.json({ message: 'Please enter the valid input!' })
                    } else {
                        bcrypt.compare(password, studentobject.password as string)
                            .then(compPwd => {
                                if (!compPwd) {
                                    return res.json({ message: 'please check the password' })
                                } else {
                                    if (process.env.STD_SECURT) {
                                        let token = Jwt.sign({ _id: studentobject._id }, process.env.STD_SECURT)
                                        return res.json({ message: 'Account Login Successfully!', Student: studentobject, Auth: true, tkn: token })
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
        }).catch(err => {
            return res.json({ message: err })
        })


}

export const StudentAuth = (req: UpdatedStudentProps, res: express.Response) => {
    console.log(req.Student);

    return res.json({ Student: req.Student, Auth: true })
}
export const StudentDetails = (req: UpdatedStudentProps, res: express.Response) => {
    StudentModel.findById({ _id: req.Student._id }).populate({ path: 'courses', select: 'course department' })
        .then(responce => {

            if (responce) {
                return res.json({ Student: responce })
            }

        }).catch(err => {
            return res.json({ message: err })
        })
}

export const StudentAttdence = (req: UpdatedAttendenceProps, res: express.Response) => {
    console.log({ student_id: req.Student._id });


    AttendenceModel.findOne({ student_id: req.Student._id }).populate({ path: 'courses', select: 'course department' })
        .then(responce => {
            console.log(responce);
            if (responce) {

                return res.json({ Student: responce })
            }

        }).catch(err => {
            console.log(err);

            return res.json({ message: err })
        })
}

export const EditStudent = (req: UpdatedStudentProps, res: express.Response) => {
    const _id = req.params._id
    StudentModel.findById(_id).populate({ path: "courses", select: "department course" })
        .then(responce => {
            console.log(responce);
            if (responce) {

                return res.json({ Student: responce })
            }

        })
        .catch(err => {
            return res.json({ message: err })
        })
}


export const UpdateStudent = (req: express.Request, res: express.Response) => {
    const  student  = req.body.student
    console.log(req.body.student);
    StudentModel.find({ courses: student.courses })
        .then(courseArray => {
            console.log(courseArray);

            if (courseArray.length <= 0) {
                return res.json({ message: 'This Course are not exists,Please check course input ' })
            } else {
                StudentModel.findOne({ rollno: student.rollno })
                    .then(studentObject => {
                        if (!studentObject) {
                            return res.json({ message: 'This RollNo not already exists !' })
                        } else {
                            StudentModel.findByIdAndUpdate({ _id: student._id }, student)
                                .then(result => {
                                    if (!result) {
                                        return res.json({ message: 'unable to updated ,pls try again later' })
                                    } else {
                                        return res.json({ message: 'Student Profile updated successfully!' })
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
        .catch(err=>{
            return res.json({message:err})
        })
}

export const DeleteHandler=(req:express.Request,res:express.Response)=>{
    const _id=req.body._id
    StudentModel.findByIdAndRemove({_id:_id})
    .then(result=>{
        return res.json({message:'Student Deleted Successfully!'})
    })
    .catch(err=>{
        return res.json({message:err})
    })
}