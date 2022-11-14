import { Checkbox, DatePicker, message } from "antd";
import axios from "axios";
import {  FormEvent, useState } from "react";
import { useAppSelector } from "../Redux/hook";

const LeaveRequest = () => {
  const student = useAppSelector((state) => state.Student.Student);
  const [data, setData] = useState<any>({ ...student ,onedayleave:false});
  const submithandler=(e:FormEvent)=>{
    e.preventDefault()
    console.log(data);
  axios.post('http://localhost:3002/student/leaverequest',{data:data})
  .then(responce=>{
   
    message.success(responce.data.message)
    
  })
 }
  return (
    <div className="tw-w-full tw-h-screen tw-bg-slate-300 tw-flex tw-justify-center tw-items-center">
      <div className="tw-w-4/12 tw-p-5 tw-bg-slate-50 tw-rounded-lg tw-shadow-2xl">
        <form onSubmit={submithandler}>
          <div className="tw-flex tw-justify-center">
            <h3 className="tw-font-outfit tw-text-lg">Leave Request</h3>
          </div>
          <div className="tw-mt-2">
            <label className="tw-font-outfit tw-text-lg">Course</label>
            <br />
            <input
              disabled
              value={
                student?.courses.course + "-" + student?.courses.department
              }
              className="tw-w-full tw-p-3 tw-rounded-lg"
            />
          </div>

          <div className="tw-mt-2">
            <Checkbox
              checked={data.onedayleave}
              onClick={(e) => {
                setData({ ...data, onedayleave: !data.onedayleave });
              }}
            >
              OneDayLeave
            </Checkbox>
          </div>
          <div className="tw-flex tw-justify-between tw-mt-2">
            <div >
              <label className="tw-font-outfit tw-text-lg tw-p-3">
                Start Date
              </label>

              <DatePicker
                format={"DD:MM:YYYY"}
                
                onChange={(e) => {
                  setData({ ...data, startdate: e?.format("DD/MM/YYYY") as string });
                }}
              />
            </div>
            <>
              {data.onedayleave ? (
                <><DatePicker
                className="tw-h-8 tw-mt-12"
                  format={"DD:MM:YYYY"}
                disabled
                  onChange={(e) => {
                    setData({ ...data, enddate: e?.format("DD/MM/YYYY") as string });
                  }}
                /></>
              ) : (
                <>
                  <label className="tw-font-outfit tw-text-lg tw-p-3">
                    EndDate
                  </label>
                  <DatePicker
                  className="tw-h-8 tw-mt-12"
                    format={"DD:MM:YYYY"}
                  
                    onChange={(e) => {
                      setData({ ...data, enddate: e?.format("DD/MM/YYYY") as string });
                    }}
                  />
                </>
              )}
            </>
          </div>
          <div className="tw-mt-2">
            <label className="tw-font-outfit tw-text-lg">Reason</label>
            <br />
            <textarea
              className="tw-w-full tw-h-52 tw-p-3 tw-rounded-lg"
              value={data.reason}
              onChange={(e) => setData({ ...data, reason: e.target.value })}
            />
          </div>
          <div>
            <button className="tw-bg-blue-600 tw-p-3 tw-rounded-lg">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveRequest;
