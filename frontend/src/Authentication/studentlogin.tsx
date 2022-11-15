import { DatePicker, message } from "antd";
import axios from "axios";
import { FormEvent, useState } from "react";
import { useAppDispatch } from "../Redux/hook";
import { SetInitialStudentState } from "../Redux/studentslice";

const StudentLogin=()=>{

    const [data,setData]=useState({rollno:'',password:''})
    const dispatch=useAppDispatch()
    
    const submithandler=(e:FormEvent)=>{
        e.preventDefault()
        if(data.rollno===''){
          message.success("please enter the rollno")
          return false
        }else if(data.password===''){
          message.success('please enter the password')
          return false
        }
        console.log(data);
        
        axios.post('http://localhost:3002/student/studentlogin',{data:data})
        .then(responce=>{
            console.log(responce.data);
            dispatch(SetInitialStudentState({Student:responce.data.Student,Auth:responce.data.Auth}))
            localStorage.setItem('student-token',responce.data.tkn)
            message.success(responce.data.message)
            window.location='/studentdetail' as Location &string
           
        })

    }
    
    return(
        <div className="tw-w-full tw-h-screen tw-bg-slate-300 tw-flex tw-justify-center tw-items-center">
      <div className="tw-w-3/12 tw-p-6 tw-bg-slate-50 tw-rounded-lg tw-shadow-lg">
        <form onSubmit={submithandler}>
          <div className="tw-mt-2">
            <label className="tw-font-outfit tw-text-lg">RollNo</label>
            <br />
            <input
              type={"text"}
              placeholder="RollNo"
              className="tw-w-full tw-p-3 tw-rounded-lg"
              value={data.rollno}
              onChange={(e) => {
                setData({ ...data, rollno: e.target.value });
              }}
            />
          </div>
          <div className="tw-mt-2">
            <label className="tw-font-outfit tw-text-lg">Password</label>{" "}
            <br />
            <DatePicker
            placeholder="DOB"
              format={"DD:MM:YYYY"}
              onChange={(e) => {
                setData({ ...data, password: e?.format("DD/MM/YYYY") as string });
                console.log(e?.format("DD/MM/YYYY"));
              }}
            />
          </div>
          <div className="tw-flex tw-justify-between">
            <button className="tw-bg-red-400 tw-p-3 tw-mt-2 tw-rounded-lg">
              Submit
            </button>
              </div>
        </form>
      </div>
    </div>
    )
}
export default StudentLogin