import axios from "axios";
import { useEffect, useState } from "react";

const Attendance = () => {
  const [courselist, setCourseList] = useState([
    { _id: "", course: "", department: "" },
  ]);
  const [updatedata, setUpdateData] = useState({
    student_id: "",
    courses: "",
    attendencetype: "",
    month: "11",
    year: "2022",
  });
  const [data, setData] = useState({ month: "11", year: "2022", courses: "" });
  const [studentlist, setStudentList] = useState([
    {
      _id: "",
      student_id:'',
      studentname: "",
      rollno: "",
      courses: { _id:'',course: "", department: "" },
      attendence: [],
    },
  ]);
  const days: any[] = [];
  let i = 0;

  for (i; i < 31; i++) {
    days.push(0);
  }
  useEffect(() => {
    axios.get("http://localhost:3002/getcourse").then((responce) => {
      setCourseList(responce.data.course);
    });
  }, []);

  const studenthandler = (e: any, place: any) => {
    let temp: any = data;
    temp[place] = e.target.value as string;
    setData({ ...temp });
    console.log(data);

    axios
      .post("http://localhost:3002/getattendence", { data: data })
      .then((responce) => {
        console.log(responce.data);
        setStudentList(responce.data.Student);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateattendence = ( _id:any, courses_id:any, attentype:any) => {
    setUpdateData({
      ...updatedata,
      student_id: _id,
      courses: courses_id,
      attendencetype: attentype,
    });
    console.log(({
      ...updatedata,
      student_id: _id,
      courses: courses_id,
      attendencetype: attentype,
    }));
    
   
    
    axios.post("http://localhost:3002/updateattendence", {
      updatedata: {
        ...updatedata,
        student_id:_id,
        courses: courses_id,
        attendencetype: attentype,
      },
    })
    .then(responce=>{
      console.log(responce.data);
      
    })
  };

  return (
    <div className="tw-flex tw-flex-col">
      <div className="tw-overflow-x-auto sm:-tw-mx-6 lg:-tw-mx-8">
        <div className="tw-py-2 tw-inline-block tw-min-w-full sm:tw-px-6 lg:tw-px-8">
          <div className="tw-overflow-hidden">
            <div className="tw-flex tw-justify-center">
              
              <div className="tw-mt-5">
                <label className="tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left">
                  Year
                </label>
                <select
                  className="tw-w-40 tw-h-6"
                  onChange={(e) => studenthandler(e, "year")}
                >
                  <option value={"2022"}>2022</option>
                  <option value={"2021"}>2021</option>
                  <option value={"2020"}>2020</option>
                  <option value={"2019"}>2019</option>
                </select>
              </div>
              <div className="tw-mt-5">
                <label className="tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left">
                  Month
                </label>
                <select
                  className="tw-w-40 tw-h-6"
                  onChange={(e) => studenthandler(e, "month")}
                >
                  <option value={"1"}>JAN</option>
                  <option value={"2"}>FEB</option>
                  <option value={"3"}>MAR</option>
                  <option value={"4"}>APRIL</option>
                  <option value={"5"}>MAY</option>
                  <option value={"6"}>JUNE</option>
                  <option value={"7"}>JULY</option>
                  <option value={"8"}>AUG</option>
                  <option value={"9"}>SEP</option>
                  <option value={"10"}>OCT</option>
                  <option value={"11"}>NOV</option>
                </select>
              </div>
            </div>
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
                    <select onChange={(e) => studenthandler(e, "courses")}>
                      <option>Select course</option>
                      {courselist &&
                        courselist.map((list) => {
                          return (
                            <option
                              value={list._id}
                              className="tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left"
                              key={list._id}
                            >
                              {list.course + "-" + list.department}
                            </option>
                          );
                        })}
                    </select>
                  </th>
                  {days.length > 30 &&
                    days.map((value, index) => {
                      return (
                        <th
                          key={index}
                          scope="col"
                          className="tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left"
                        >
                          {index + 1}
                        </th>
                      );
                    })}
                </tr>
              </thead>
              <tbody>
                {studentlist.map((list, index) => {
                  return (
                    <tr
                      className="tw-bg-white tw-border-b tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-gray-100"
                      key={list._id}
                    >
                      <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-sm tw-font-medium tw-text-gray-900">
                        {index + 1}
                      </td>
                      <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap">
                        {list.rollno}
                      </td>
                      <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap">
                        {list.studentname}
                      </td>
                      <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap">
                        {list.courses.course + "-" + list.courses.department}
                      </td>

                      {list.attendence.map((attendancelist,index) => {
                        return (
                          <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap" key={index}>
                            {attendancelist}
                          </td>
                        );
                      })}
                      <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap">
                        <select
                          onChange={(e: any) =>
                            updateattendence(
                               list.student_id,
                               list.courses._id,
                               e.target.value,
                            )
                          }
                        >
                          <option>selectAttendence</option>
                          <option value={"present"}>Present</option>
                          <option value={"absent"}>Absent</option>
                          <option value={"holiday"}>Holiday</option>
                        </select>
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

export default Attendance;
