
import express =require('express')

import { UpdatedRouter } from '../type'
import * as StudentControll from '../controllers/studentAuth'
import StudentMiddlewere from '../middlewere/studentMiddlewere'
import { LeaveRequest } from '../controllers/leave'

const StudentRouter:UpdatedRouter=express.Router()

StudentRouter.post("/studentlogin",StudentMiddlewere,StudentControll.StudentLogin)
StudentRouter.get("/studentauth",StudentMiddlewere,StudentControll.StudentAuth)
StudentRouter.get('/studentdetails',StudentMiddlewere,StudentControll.StudentDetails)
StudentRouter.get('/studentattendence',StudentMiddlewere,StudentControll.StudentAttdence)
StudentRouter.post('/leaverequest',StudentMiddlewere,LeaveRequest)
export default StudentRouter