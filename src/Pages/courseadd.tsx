import { message } from "antd";
import axios from "axios";
import { FormEvent, useState } from "react";

const CourseAdd = () => {
  const [data, setData] = useState({ course: "", department: "" });
  const submithandler=(e:FormEvent)=>{
    e.preventDefault()
    axios.post('http://localhost:3002/courseadd',{data:data})
    .then(responce=>{
      message.success(responce.data.message)
    })
    .catch(err=>{
      console.log(err)
    })

  }
  return (
    <div className="tw-w-full tw-h-screen tw-bg-slate-300 tw-flex tw-justify-center tw-items-center">
      <div className="tw-w-3/12 tw-p-6 tw-bg-slate-50 tw-rounded-lg tw-shadow-lg">
        <form className="tw-gap-4" onSubmit={submithandler}>
          <div>
            <label className="tw-font-outfit tw-text-lg">Course</label> <br />
            <select
              className="tw-w-full tw-p-2 "
              value={data.course}
              onChange={(e) => {
                setData({ ...data, course: e.target.value });
              }}
            >
              <option value={"none"} className="tw-px-4 tw-p-2 ">
                None
              </option>
              <option value={"BSC"} className="tw-px-4 tw-p-2 ">
                BSC
              </option>
              <option value={"BBA"} className="tw-px-4 tw-p-2 ">
                BBA
              </option>
              <option value={"BCOM"} className="tw-px-4 tw-p-2 ">
                BCOM
              </option>
              <option value={"BA"} className="tw-px-4 tw-p-2 ">
                BA
              </option>
            </select>
          </div>
          <div>
            <label className="tw-font-outfit tw-text-lg">Department</label>{" "}
            <br />
            <input
              type={"text"}
              className="tw-w-full tw-p-3 tw-rounded-lg"
              placeholder={"department"}
              value={data.department}
              onChange={(e) => {
                setData({ ...data, department: e.target.value });
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

export default CourseAdd;
