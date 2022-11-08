
import express = require('express')

export interface TeacherProps {
    username:string,
    department:string,
    email:string,
    password:string
}

export interface UpdatedTeacherprops extends  express.Request {
    Teacher:TeacherProps,
    Auth:boolean
}
export interface StudentProps {
    studentname:string,
    rollno:string,
    course:string,
    department:string,
    dob:Date
}

export interface UpdatedStudentProps extends express.Request {
    Student:StudentProps,
    Auth:boolean
}

export interface UpdatedRouter extends express.IRouter{
    post:(path:string,...middlewere)=>any
    get:(path:string,...middlewere)=>any
}