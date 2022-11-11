import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../Redux/hook";
import { SetInitialStudentState } from "../Redux/studentslice";

const StudentList = () => {
  const [courselist, setCourseList] = useState([
    { _id: "", course: "", department: "" },
  ]);
 
  const [studentlist, setStudentList] = useState([
    { _id: "", studentname: "", rollno: "", courses: {course:'',department:''}, dob: "" },
  ]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    axios
      .get("http://localhost:3002/getcourse")
      .then((responce) => {
        setCourseList(responce.data.course);
      })
      .catch((err) => {
        console.log(err);

     });
    
  });
  const studenthandler=(e:any)=>{
    // setData(e.target.value)
    // console.log(data);
    
    axios
       .post("http://localhost:3002/studentlist", { id: e.target.value })
       .then((responce) => {
         console.log(responce.data);
         setStudentList(responce.data.Student);
         // dispatch(SetInitialStudentState({Student:responce.data.Student,Auth:responce.data.Auth}))
       })
       .catch();
  }
  return (
    <div className="tw-flex tw-flex-col">
      <div className="tw-overflow-x-auto sm:-tw-mx-6 lg:-tw-mx-8">
        <div className="tw-py-2 tw-inline-block tw-min-w-full sm:tw-px-6 lg:tw-px-8">
          <div className="tw-overflow-hidden">
            <table className="tw-min-w-full">
              <thead className="tw-bg-white tw-border-b">
                <tr>
                  <th
                    scope="col"
                    className="tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left"
                  >
                    S.No
                  </th>
                  <th
                    scope="col"
                    className="tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left"
                  >
                    RollNO
                  </th>
                  <th
                    scope="col"
                    className="tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left"
                  >
                    StudentName
                  </th>
                  <th
                    scope="col"
                    className="tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left"
                  >
                    {
                      <select
                        
                        onChange={studenthandler}
                      >
                        <option>select course</option>
                        {courselist.map((list) => {
                          return (
                            <option value={list._id} key={list._id} className="tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left">
                              {list.course + "-" + list.department}
                            </option>
                          );
                        })}
                      </select>
                    }
                  </th>
                  <th
                    scope="col"
                    className="tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left"
                  >
                    DateOfBirth
                  </th>
                </tr>
              </thead>
              <tbody>
                {studentlist.map((list,index) => {
                  return (
                    <tr className="tw-bg-white tw-border-b tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-gray-100" key={list._id}>
                      <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-sm tw-font-medium tw-text-gray-900">
                        {index+1}
                      </td>
                      <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap">
                        {list.rollno}
                      </td>
                      <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap">
                        {list.studentname}
                      </td>
                      <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap">
                        {list.courses.course +""+list.courses.department}
                      </td>
                      <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap">
                        {list.dob}
                      </td>
                      <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap ">
                        <div className="tw-space-x-3">
                        <Link to={'/editstudent/'+list._id} className='tw-bg-blue-500 tw-text-white tw-p-3 tw-rounded-lg' > Edit</Link>
                        <button className='tw-bg-red-500 tw-text-white tw-p-3 tw-rounded-lg '>Delete</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
