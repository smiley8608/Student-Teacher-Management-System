
import express = require('express')

export interface TeacherProps {
    username:string,
    courses:string,
    email:string,
    password:string
}

export interface UpdatedTeacherprops extends  express.Request {
    Teacher:TeacherProps,
    Auth:boolean
}
export interface StudentProps {
    _id:string,
    studentname:string,
    rollno:string,
    course:string,
    department:string,
    dob:string
}

export interface UpdatedStudentProps extends express.Request {
    Student:StudentProps,
    Auth:boolean
}

export interface UpdatedRouter extends express.IRouter{
    post:(path:string,...middlewere)=>any
    get:(path:string,...middlewere)=>any
}

export interface AttendenceProps {
    _id:string,
    student_id:string,
    courses:string,
    studentname:string,
    rollno:string,
    attendence:[],
    month:string,
    year:string

}
export interface UpdatedAttendenceProps extends express.IRoute{
    Student:AttendenceProps
}