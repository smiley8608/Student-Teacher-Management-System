
import express = require('express')
import { StudentProps, UpdatedStudentProps } from '../type'
import Jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import StudentModel from '../models/studentmodel'
dotenv.config()
const StudentMiddlewere = (req: UpdatedStudentProps, res: express.Response, next: express.NextFunction) => {
    const Token = req.headers['student-token'] as string
    const STD_SECURT = process.env.STD_SECURT
    if (Token && STD_SECURT) {
        try {
            const verify = Jwt.verify(Token, STD_SECURT)
            const decoded: any = Jwt.decode(Token)
            if (req.path === '/studentlogin') {
                return res.json({ message: 'entry resticted!' })
            } else {
                if (req.path === '/studentdetails' || req.path === '/studentattendence' || req.path === '/leaverequest' || req.path === '/studentauth'||req.path==='/getleaverequest') {
                    StudentModel.findById(decoded._id)
                        .then(responce => {
                                                        
                            req.Student = responce as unknown as StudentProps
                            next()
                        })

                }
            }

        } catch (error) {
            if (req.path === '/studentlogin') {
                next()
            } else {
                return res.json({ message: error, Student: null, Auth: false })

            }
        }

    } else {
        if (req.path === '/studentlogin') {
            next()
        } else {
            return res.json({ Student: null, Auth: false })
        }
    }
}

export default StudentMiddlewere