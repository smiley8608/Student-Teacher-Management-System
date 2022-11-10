
import express = require('express')
import { Middlewere } from '../middlewere/middlewere'
import * as TeacherControll from '../controllers/teacherAuth'
import { UpdatedRouter } from '../type'
import { AddCourse, GetCourse } from '../controllers/course'
import * as StudentControll from '../controllers/studentAuth'
import * as AttendenceControll from '../controllers/attendence'
import multer = require('multer')
import path from 'path'
const TeacherRouter: UpdatedRouter = express.Router()
const Storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'studentphoto')
    }, filename(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: Storage, limits: { fileSize: 1025 * 1025 * 1025 } })


TeacherRouter.post('/signup', Middlewere, TeacherControll.TeacherRegister)
TeacherRouter.post('/login', Middlewere, TeacherControll.TeacherLogin)
TeacherRouter.get('/authstatus', Middlewere, TeacherControll.AuthStatus)
TeacherRouter.post('/courseadd', Middlewere, AddCourse)
TeacherRouter.get('/getcourse', Middlewere, GetCourse)
TeacherRouter.post('/studentadd', Middlewere, upload.single('studentphoto'),StudentControll.StudentRegister)
TeacherRouter.post('/studentlist',Middlewere,StudentControll.StudentList)
TeacherRouter.post('/getattendence',Middlewere,AttendenceControll.GetAttandence)
TeacherRouter.post('/updateattendence',Middlewere,AttendenceControll.UpdateAttendence)
export default TeacherRouter 