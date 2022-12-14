import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { DatePicker, message } from "antd";
import { useAppDispatch } from "../Redux/hook";
import { SetInitialStudentState } from "../Redux/studentslice";
const StudentAdd = () => {
  const [data, setData] = useState({
    studentname: "",
    rollno: "",
    dob: "",
    studentphoto: "" as any,
    courses: "",
    subject: "",
  });
  const form = new FormData();
  const [courselist, setCourseList] = useState([
    { _id: "", course: "", department: "" },
  ]);
  const dispatch=useAppDispatch()

  useEffect(() => {
    axios.get("http://localhost:3002/getcourse").then((responce) => {
      setCourseList(responce.data.course);
      console.log(responce.data.course);
    });
  }, []);
  form.append("studentphoto", data.studentphoto);
  form.append("studentname", data.studentname);
  form.append("rollno", data.rollno);
  form.append("courses", data.courses);
  
  form.append('dob',data.dob)
  const submithandler = (e: FormEvent) => {
    e.preventDefault();
    console.log(data.studentname);
    if(data.studentname===''){
      message.success('please enter the studentname')
      return false
    }else if(data.courses===''){
      message.success('please enter the courses')
      return false
    }else if(data.rollno===''){
      message.success('please enter the rollno')
      return false
    }else if(data.dob===''){
      message.success('please enter the DateOfBirth')
      return false
    }
    axios
      .post("http://localhost:3002/studentadd", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((responce) => {
        
        dispatch(SetInitialStudentState({Student:responce.data.Student,Auth:responce.data.Auth}))
       
        message.success(responce.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="tw-w-full tw-h-screen tw-bg-slate-300 tw-flex tw-justify-center tw-items-center">
      <div className="lg:tw-w-3/12 md:tw-w-5/12 tw-p-6 tw-bg-slate-50 tw-rounded-lg tw-shadow-lg">
        <form onSubmit={submithandler}>
          <div className="tw-mt-2">
            <label className="tw-font-outfit tw-text-lg">StudentName</label>
            <br />
            <input
              type={"text"}
              placeholder="studentname"
              className="tw-w-full tw-p-3 tw-rounded-lg"
              value={data.studentname}
              onChange={(e) => {
                setData({ ...data, studentname: e.target.value });
              }}
            />
          </div>
          <div className="tw-mt-2">
            <label className="tw-font-outfit tw-text-lg">RollNo</label>
            <br />
            <input
              type={"text"}
              placeholder="rollno"
              className="tw-w-full tw-p-3 tw-rounded-lg"
              value={data.rollno}
              onChange={(e) => {
                setData({ ...data, rollno: e.target.value });
              }}
            />
          </div>
          <div className="tw-mt-2">
            <label className="tw-font-outfit tw-text-lg">DateOfBirth</label>{" "}
            <br />
            <DatePicker
              format={"DD:MM:YYYY"}
              onChange={(e) => {
                setData({ ...data, dob: e?.format("DD/MM/YYYY") as string });
                console.log(e?.format("DD/MM/YYYY"));
              }}
            />
          </div>
          <div className="tw-mt-2">
            <label className="tw-font-outfit tw-text-lg">Course</label>
            <br />
            <select
              value={data.courses}
              onChange={(e: any) => {
                setData({ ...data, courses: e.target.value });
              }}
            >
              <option>select course</option>
              {courselist.map((list) => {
                return (
                  <option
                    key={list._id}
                    value={list._id}
                  >
                    {list.course}-{list.department}
                  </option>
                );
              })}
            </select>
            
          </div>
          

          <div className="tw-mt-2">
            <label className="tw-font-outfit tw-text-lg">StudentPhoto</label>
            <br />
            <input
              type={"file"}
              accept={"image/**"}
              className="tw-w-full tw-p-3 tw-rounded-lg"
              multiple={true}
              onChange={(e: any) => {
                setData({ ...data, studentphoto: e.target.files[0] });
              }}
            />
          </div>
          <div className="tw-flex tw-justify-end">
            <button className="tw-bg-red-400 tw-p-3 tw-mt-2 tw-rounded-lg">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentAdd;
