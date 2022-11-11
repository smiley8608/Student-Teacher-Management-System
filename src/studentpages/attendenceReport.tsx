import axios from "axios";

import { useEffect, useState } from "react";

const AttendenceReport = () => {
  const [student, setStudent] = useState({
    studentname: "",
    rollno: "",
    courses: { course: "", department: "" },
    attendence: [],
    month: "",
    year: "",
  });
  const [present, setPresent] = useState<any>(0);
  const [absent, setAbsent] = useState<any>([]);
  const [holiday, setHoliday] = useState<any>([]);
  // let present: [] | any = [];
  // let absent: [] | any = [];
  // let holiday: [] | any = [];
  const [fetch, setFetch] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:3002/student/studentattendence")
      .then((responce) => {
        console.log(responce);
        setStudent(responce.data.Student);
        let tempPresent=0
        let tempAbsent=0
        let tempHoliday=0
          for(let i=0;i<=responce.data.Student.attendence.length;i++){
            if(responce.data.Student.attendence[i]==='present'){
              console.log(responce.data.Student.attendence[i]);
               tempPresent=tempPresent+1
            }else if(responce.data.Student.attendence[i]==='absent'){
                tempAbsent=tempAbsent+1
            }else if(responce.data.Student.attendence[i]==='holiday'){
              tempHoliday=tempHoliday+1
            }
          }
      
        setPresent(tempPresent)
        setAbsent(tempAbsent)
        setHoliday(tempHoliday)
        setFetch(true);
      });
  }, []);

  return (
    <div className="tw-w-full tw-h-screen tw-bg-slate-300 tw-flex tw-justify-center tw-items-center">
      <div className="lg:tw-w-3/12 md:tw-w-5/12 tw-p-6 tw-bg-slate-50 tw-rounded-lg tw-shadow-lg">
        <div className="tw-mt-2">
          <label className="tw-font-outfit tw-text-lg">StudentName:</label>
          <input
            type={"text"}
            disabled
            value={student.studentname}
            className="tw-w-full tw-p-3 tw-rounded-lg"
          />
        </div>
        <div className="tw-mt-2">
          <label className="tw-font-outfit tw-text-lg">RollNO:</label>
          <input
            type={"text"}
            disabled
            value={student.rollno}
            className="tw-w-full tw-p-3 tw-rounded-lg"
          />
        </div>
        <div className="tw-mt-2">
          <label className="tw-font-outfit tw-text-lg">Course:</label>
          <input
            type={"text"}
            disabled
            value={student.courses.course + "-" + student.courses.department}
            className="tw-w-full tw-p-3 tw-rounded-lg"
          />
        </div>

        {fetch && (
          <div className="tw-mt-2">
            <label className="tw-font-outfit tw-text-lg">
              No Of Days Present:
            </label>
            <input
              type={"text"}
              disabled
              value={present}
              className="tw-w-full tw-p-3 tw-rounded-lg"
            />
          </div>
        )}

        {fetch && (
          <div>
            <div className="tw-mt-2">
              <label className="tw-font-outfit tw-text-lg">
                No Of Days Absent:
              </label>
              <input
                type={"text"}
                disabled
                value={absent}
                className="tw-w-full tw-p-3 tw-rounded-lg"
              />
            </div>
            {/* {absent ? (
              <>
                <div className="tw-mt-2">
                  <label className="tw-font-outfit tw-text-lg">
                    Absent At:
                  </label>
                  <input
                    type={"text"}
                    disabled
                    value={`${absent.days}/${student.month}${student.year}`}
                    className="tw-w-full tw-p-3 tw-rounded-lg"
                  />
                </div>
              </>
            ) : (
              ""
            )} */}
          </div>
        )}
        {fetch &&<div className="tw-mt-2">
              <label className="tw-font-outfit tw-text-lg">
                No Of Days Holidays:
              </label>
              <input
                type={"text"}
                disabled
                value={holiday}
                className="tw-w-full tw-p-3 tw-rounded-lg"
              />
            </div>
    
        }
      </div>
    </div>
  );
};

export default AttendenceReport;
