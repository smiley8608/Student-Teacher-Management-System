import { FormEvent, useState } from "react";

const SignUp = () => {

    const [data,setData]=useState({username:'',email:'',department:'',password:''})

    const submithandler=(e:FormEvent)=>{
        
    }
  return (
    <div className="tw-w-full tw-h-screen tw-bg-slate-300 tw-flex tw-justify-center tw-items-center">
      <div className="tw-w-3/12 tw-p-6 tw-bg-slate-50 tw-rounded-lg tw-shadow-lg">
        <form onSubmit={submithandler}>
          <div className="tw-mt-2">
            <label className="tw-font-outfit tw-text-lg">UserName</label>
            <br />
            <input
              type={"text"}
              placeholder="Username"
              className="tw-w-full tw-p-3 tw-rounded-lg"
              value={data.username}
              onChange={(e)=>{setData({...data,username:e.target.value})}}
            />
          </div>
          <div className="tw-mt-2">
            <label className="tw-font-outfit tw-text-lg">Department</label>
            <br />
            <input
              type={"text"}
              placeholder="Department"
              className="tw-w-full tw-p-3 tw-rounded-lg"
              value={data.department}
              onChange={(e)=>{setData({...data,department:e.target.value})}}
            />
          </div>
          <div className="tw-mt-2">
            <label className="tw-font-outfit tw-text-lg">Email</label>
            <br />
            <input
              type={"email"}
              placeholder="Email"
              className="tw-w-full tw-p-3 tw-rounded-lg"
              value={data.email}
              onChange={(e)=>{setData({...data,email:e.target.value})}}
            />
          </div>
          <div className="tw-mt-2">
            <label className="tw-font-outfit tw-text-lg">Password</label>
            <br />
            <input
              type={"password"}
              placeholder="Password"
              className="tw-w-full tw-p-3 tw-rounded-lg"
              value={data.password}
              onChange={(e)=>{setData({...data,password:e.target.value})}}
            />
          </div>
          <div className="tw-flex tw-justify-end">
          <button className="tw-bg-red-400 tw-p-3 tw-mt-2 tw-rounded-lg">Submit</button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
