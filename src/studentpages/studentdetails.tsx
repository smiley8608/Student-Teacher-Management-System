import axios from "axios"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../Redux/hook"
import {SetInitialStudentState} from '../Redux/studentslice'



const StudentDeatils=()=>{
 
    // const [student,setStudent]=useState<>()
    const dispatch=useAppDispatch()
    const student=useAppSelector(state=>state.Student.Student)
    useEffect(()=>{
        axios.get('http://localhost:3002/student/studentdetails')
        .then(responce=>{
            console.log(responce);
            // setStudent(responce.data.Student)
            dispatch(SetInitialStudentState({Student:responce.data.Student,Auth:true}))
        })
    },[])

    return(
        <div className="tw-w-full tw-h-screen tw-bg-slate-300 tw-flex tw-justify-center tw-items-center">
            <div className="lg:tw-w-3/12 md:tw-w-5/12 tw-p-6 tw-bg-slate-50 tw-rounded-lg tw-shadow-lg">
                <div className="tw-flex tw-justify-center ">
                    <div className="lg:tw-w-4/12 sm:tw-w-3/12 tw-h-32 tw-rounded-full tw-border-2 tw-overflow-hidden tw-shadow-2xl tw-mt-2">

                <img src={`http://localhost:3002/${student?.path}`} alt="profilephoto" className="tw-rounded-full tw-w-full tw-h-full tw-overflow-hidden " ></img>
                    </div>
                </div>
                <div className="tw-mt-2">
                    <label className="tw-font-outfit tw-text-lg">StudentName:</label>
                    <input type={'text'} disabled value={student?.studentname} className="tw-w-full tw-p-3 tw-rounded-lg" />
                </div>
                <div className="tw-mt-2">
                    <label className="tw-font-outfit tw-text-lg">RollNO:</label>
                    <input type={'text'} disabled value={student?.rollno} className="tw-w-full tw-p-3 tw-rounded-lg"/>
                </div>
                <div className="tw-mt-2">
                    <label className="tw-font-outfit tw-text-lg">Date Of Birth:</label>
                    <input type={'text'} disabled value={student?.dob} className="tw-w-full tw-p-3 tw-rounded-lg"/>
                </div>
                <div className="tw-mt-2">
                    <label className="tw-font-outfit tw-text-lg">Course:</label>
                    <input type={'text'} disabled value={student?.courses.course +"-"+student?.courses.department} className="tw-w-full tw-p-3 tw-rounded-lg" />
                </div>
                

            </div>
            
        </div>
    )
}

export default StudentDeatils