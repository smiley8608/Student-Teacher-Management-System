
import express = require('express')
import { TeacherProps, UpdatedTeacherprops } from '../type'
import dotenv from 'dotenv'
import Jwt from 'jsonwebtoken'
import TeacherModel from '../models/teachermodel'
dotenv.config()

export const Middlewere = (req: UpdatedTeacherprops, res: express.Response, next: express.NextFunction) => {
    const Token = req.headers['jwt-token'] as string
    const envsecure = process.env.TOKEN_SECURT
    if (Token && envsecure) {
        try {
            const verify = Jwt.verify(Token, envsecure)
            const decoded: any = Jwt.decode(Token)
            if (req.path === '/signup' || req.path === '/login') {
                return res.json({ message: 'Entry Resticted' })
            } else {
                if (req.path !== '/signup' && req.path !== '/login') {
                    TeacherModel.findById(decoded._id)
                        .then(responce => {
                            console.log("responce"+responce);
                            
                            req.Teacher = responce as unknown as TeacherProps
                            next()
                        })

                }
            }

        } catch (error) {
            if (req.path === '/signup' || req.path === '/login') {
                next()
            } else {
                return res.json({ message: error, Teacher: null, Auth: false })

            }
        }

    } else {
        if (req.path === '/signup' || req.path === '/login') {
            next()
        } else {
            res.json({ Teacher: null, Auth: false })
        }
    }
}