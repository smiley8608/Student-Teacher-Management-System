
import express = require('express')
import { AttendenceModel } from '../models/studentattdence'


export const GetAttandence = (req: express.Request, res: express.Response) => {
    const { courses, year, month } = req.body.data
    AttendenceModel.find({ courses: courses, month: month, year: year })
        .populate({ path: "courses", select: "department course" })
        .then(courseArray => {
            console.log("ewygviuhf;iuvbugugv" + courseArray);

            if (courseArray) {
                return res.json({ Student: courseArray })
            } else {
                return res.json({ student: "some thing went wrong" })
            }

        }).catch(err => {
            return res.json({ message: err })
        })
}

export const UpdateAttendence = (req: express.Request, res: express.Response) => {
    const { student_id, courses, attendencetype, month, year } = req.body.updatedata
    console.log(req.body.updatedata);
    
    AttendenceModel.findOneAndUpdate({ student_id: student_id, courses: courses, month: month, year: year }, { $push: { attendence: attendencetype } })
        .then(updatedattendence => {
            console.log(updatedattendence);
            
            if (updatedattendence) {
                return res.json({ message: 'ATtendence updated successfully!' })
            } else {
                return res.json({ message: 'something wents wrong' })
            }
        })
        .catch(err => {
            return res.json({ message: err })
        })
}