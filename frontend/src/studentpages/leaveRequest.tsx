import { Checkbox, DatePicker, message } from "antd";
import axios from "axios";
import {  FormEvent, useEffect, useState } from "react";
import { useAppSelector } from "../Redux/hook";

const LeaveRequest = () => {
  const student = useAppSelector((state) => state.Student.Student);
  const [leavelist ,setLeaveList]=useState<any>([])
  const [data, setData] = useState<any>({ ...student ,onedayleave:false});
  useEffect(()=>{
    axios.get('http://localhost:3002/student/getleaverequest')
    .then(responce=>{
      console.log(responce.data);
      setLeaveList(responce.data.Student)
      
    })
  },[])
  const submithandler=(e:FormEvent)=>{
    e.preventDefault()
    console.log(data);
  axios.post('http://localhost:3002/student/leaverequest',{data:data})
  .then(responce=>{
   
    message.success(responce.data.message)
    
  })
 }
  return (
    <div className="tw-w-full tw-h-screen tw-bg-slate-300 tw-flex tw-justify-center tw-items-center tw-gap-3">
      <div className="lg:tw-w-5/12 sm:tw-w-6/12 tw-p-5 tw-bg-slate-50 tw-rounded-lg tw-shadow-2xl">
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
                    Status
                  </th>
                  
                  <th
                    scope="col"
                    className="tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left"
                  >
                    StartFrom
                  </th>
                  <th
                    scope="col"
                    className="tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left"
                  >
                    EndFrom
                  </th>
                  {/* <th
                    scope="col"
                    className="tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left"
                  >
                    RequestDate
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {leavelist && leavelist.map((list:any,index:any) => {
                  return (
                    <tr className="tw-bg-white tw-border-b tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-gray-100" key={list._id}>
                      <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-sm tw-font-medium tw-text-gray-900">
                        {index+1}
                      </td>
                      <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap">
                        {list.student_id.rollno}
                      </td>
                      <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap">
                        {list.status}
                      </td>
                      <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap">
                        {list.startdate}
                      </td>
                      <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap">
                        {list.enddate}
                      </td>
                      <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap ">
                        <div className="tw-space-x-3">
                        {/* <Link to={'/editstudent/'+list._id} className='tw-bg-blue-500 tw-text-white tw-p-3 tw-rounded-lg' > Edit</Link>
                        <button className='tw-bg-red-500 tw-text-white tw-p-3 tw-rounded-lg ' onClick={()=>{deleteHandler(list._id)}}>Delete</button> */}
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
      <div className="lg:tw-w-4/12 sm:tw-w-6/12 tw-p-5 tw-bg-slate-50 tw-rounded-lg tw-shadow-2xl">
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
                className="tw-h-8 tw-mt-2"
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
                  className="tw-h-8 tw-mt-2"
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
