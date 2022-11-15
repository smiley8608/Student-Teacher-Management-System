import bcrypt = require('bcrypt')
import express = require('express')
import Joi = require('joi')
import TeacherModel from '../models/teachermodel'
import { UpdatedTeacherprops } from '../type'
import Jwt from 'jsonwebtoken'
import dotenv = require('dotenv')


dotenv.config()
const teacherschema = Joi.object({
    username: Joi.string().alphanum().max(30).required(),
    courses: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().max(15).pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{7,30}$")).required()
})

export const TeacherRegister = (req:express.Request, res: express.Response) => {
    const { username, courses, email, password } = req.body.data
    console.log(req.body.data);
    

    teacherschema.validateAsync({ username, courses, email, password })
        .then(validate => {
            TeacherModel.find({ email: email })
                .then(emailarray => {
                    if (emailarray.length >= 1) {
                        return res.json({ message: 'Email id already exists!' })
                    } else {
                        bcrypt.hash(password, 10)
                            .then(hassedpassed => {
                                TeacherModel.create({ username, courses, email, password: hassedpassed })
                                    .then(result => {

                                        if (process.env.TOKEN_SECURT) {
                                            let token = Jwt.sign({ _id: result.id }, process.env.TOKEN_SECURT)
                                            return res.json({ message:'Account Created successfully', Teacher: result, Auth: true, tkn: token })
                                        }
                                    })
                                    .catch(err => {
                                        return res.json({ message: err })
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
        })
        .catch(err => {
            return res.json({ message: err })
        })
}

const teacherLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().max(15).required()
})

export const TeacherLogin = (req:express.Request, res: express.Response) => {
    const { email, password } = req.body.data
    console.log('running')
    teacherLoginSchema.validateAsync({ email, password })
        .then(validate => {
            TeacherModel.findOne({email:email})
                .then(usermailobject => {
                    console.log(usermailobject);
                    
                    if (!usermailobject) {
                        return res.json({ message: 'please check your inputs' })
                    } else {
                        bcrypt.compare(password, usermailobject.password as string)
                            .then(comparepassword => {
                                if (comparepassword) {
                                    if (process.env.TOKEN_SECURT) {
                                        let token = Jwt.sign({ _id: usermailobject.id }, process.env.TOKEN_SECURT)
                                        return res.json({ message:'Account login Successfully', Teacher:usermailobject, Auth:true, tkn: token })
                                    }
                                } else {
                                    return res.json({ message: 'please check the inputs' })
                                }
                            })
                    }
                })
                .catch(err => {
                    return res.json({ message: err })
                })
        })
        .catch(err => {
            return res.json({ message: err })
        })
}

export const AuthStatus=(req:UpdatedTeacherprops,res:express.Response)=>{
    return res.json({Teacher:req.Teacher,Auth:true})
}


