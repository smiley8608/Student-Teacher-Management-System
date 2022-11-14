import { DatePicker, message } from "antd";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Redux/hook";
import { SetInitialStudentState } from "../Redux/studentslice";
import { SetInitialState } from "../Redux/teacherslice";

export const EditStudentDetails = () => {
  const [data, setData] = useState<any>({});
//   const [date, setDate] = useState<any>();
  const [courselist, setCourseList] = useState<any>([]);
  const { _id } = useParams();
  console.log(_id);
  const [student,setStudent]=useState<any>({id:""})
  // const dispatch = useAppDispatch();
  // const Student = useAppSelector((state) => state.Student.Student);

  useEffect(() => {
    axios.get("http://localhost:3002/getcourse").then((responce) => {
      console.log(responce.data);
      setCourseList(responce.data.course);
    });

    axios.get(`http://localhost:3002/editstudent/${_id}`).then((responce) => {
      console.log(responce.data);
      // dispatch(
      //   SetInitialStudentState({ Student: responce.data.Student, Auth: true })
      // );
      setStudent(responce.data.Student)
    });
   
    console.log("id"+student._id); 
  }, [_id,student._id]);
  console.log(student);
  const submithandler=(e:FormEvent)=>{
    e.preventDefault()
    
    axios.post('http://localhost:3002/updatestudent',{student:student})
    .then(responce=>{
        console.log(responce.data.message);
        message.success(responce.data.message)
        
    }).catch()

  }

  return (
    <div className="tw-w-full tw-h-screen tw-bg-slate-300 tw-flex tw-justify-center tw-items-center">
      <div className="lg:tw-w-3/12 md:tw-w-5/12 tw-p-6 tw-bg-slate-50 tw-rounded-lg tw-shadow-lg">
        <form onSubmit={submithandler}>
          <div className="tw-flex tw-justify-center">
            <h2>Edit Student Details</h2>
          </div>
          <div className="tw-mt-2">
            <label className="tw-font-outfit tw-text-lg">StudentName</label>
            <br />
            <input
              type={"text"}
              placeholder="studentname"
              className="tw-w-full tw-p-3 tw-rounded-lg"
              defaultValue={student.studentname}
              onChange={(e)=>{
                setStudent({...student,studentname:e.target.value})
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
              defaultValue={student.rollno}
              onChange={(e)=>{
                setStudent({...student,rollno:e.target.value})
              }}
            />
          </div>
          <div className="tw-mt-2">
            <label className="tw-font-outfit tw-text-lg">DateOfBirth</label>
            <br />
            {student?.dob && <DatePicker format={"DD/MM/YYYY"}
            onChange={(e)=>{
                setStudent({...student,dob:e?.format("DD/MM/YYYY")})
            }}/>}
          </div>

          <div className="tw-mt-2">
            <label className="tw-font-outfit tw-text-lg">Course</label>
            <br />
            <select onChange={(e)=>{setStudent({...student,courses:e.target.value})}} >
              <option>select course</option>
              {courselist.map((list: any) => {
                return (
                  <option value={list._id}  key={list._id}>
                    {list.course}{list.department}
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
                setStudent({ ...student, studentphoto: e.target.files[0] });
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
