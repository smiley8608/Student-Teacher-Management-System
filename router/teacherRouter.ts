
import express = require('express')
import { Middlewere } from '../middlewere/middlewere'
import * as TeacherControll from '../controllers/teacherAuth'
import { UpdatedRouter } from '../type'
import { AddCourse, GetCourse } from '../controllers/course'
const TeacherRouter:UpdatedRouter=express.Router()

TeacherRouter.post('/signup',Middlewere,TeacherControll.TeacherRegister)
TeacherRouter.post('/login',Middlewere,TeacherControll.TeacherLogin)
TeacherRouter.get('/authstatus',Middlewere,TeacherControll.AuthStatus)
TeacherRouter.post('/courseadd',Middlewere,AddCourse)
TeacherRouter.get('/getcourse',Middlewere,GetCourse)

export default TeacherRouter 