import axios from "axios";
import { useEffect, useState } from "react";

const LeaveApprove=()=>{
    const [studentlist,setStudentList]=useState<any>([])
    useEffect(()=>{
        axios.get('http://localhost:3002/leaveresponce')
        .then(responce=>{
            console.log(responce.data);
            setStudentList(responce.data.Student)
            
        })

    },[])
    const approvehandler=(_id:string)=>{
      console.log(_id);
      
        

    }
    const rejecthandler=(_id:string)=>{

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
                    >Department
                      
                    </th>
                    <th
                      scope="col"
                      className="tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left"
                    >
                    StartDate
                    </th>
                    <th
                      scope="col"
                      className="tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left"
                    >
                    EndDate
                    </th>
                    <th
                      scope="col"
                      className="tw-text-sm tw-font-medium tw-text-gray-900 tw-px-6 tw-py-4 tw-text-left"
                    >
                    Reason
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {studentlist.map((list :any,index :any) => {
                    return (
                      <tr className="tw-bg-white tw-border-b tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-gray-100" key={list._id}>
                        <td className="tw-px-6 tw-py-4 tw-whitespace-nowrap tw-text-sm tw-font-medium tw-text-gray-900">
                          {index+1}
                        </td>
                        <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap">
                          {list.student_id.rollno}
                        </td>
                        <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap">
                           {list.student_id.studentname} 
                        </td>
                        <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap">
                          {list.courses.course +""+list.courses.department}
                        </td>
                        <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap">
                          {list.startdate}
                        </td>
                        <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap">
                          {list.enddate}
                        </td>
                        <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap">
                          {list.reason}
                        </td>
                        <td className="tw-text-sm tw-text-gray-900 tw-font-light tw-px-6 tw-py-4 tw-whitespace-nowrap ">
                          <div className="tw-space-x-3">
                          <button className='tw-bg-blue-500 tw-text-white tw-p-3 tw-rounded-lg' onClick={()=>{approvehandler(list.student_id._id)}}> Approve</button>
                          <button className='tw-bg-red-500 tw-text-white tw-p-3 tw-rounded-lg ' onClick={()=>{rejecthandler(list.student_id._id)}}>Reject</button>
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
    )
}

export default LeaveApprove