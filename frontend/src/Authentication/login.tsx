import { message } from "antd";
import axios from "axios";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Redux/hook";
import { SetInitialState } from "../Redux/teacherslice";

const LogIn = () => {
  const [data, setData] = useState({ email: "", password: "" });
  
 
  const dispatch=useAppDispatch()
  const auth=useAppSelector(state=>state.Teacher.Auth)
 
  const submithandler=(e:FormEvent)=>{
    e.preventDefault()
    if(data.email===''){
      message.success('enter the email id')
      return false
    }else if(data.password===''){
      message.success('please enter the password')
      return false
    }
    axios.post('http://localhost:3002/login',{data:data})
    .then(responce=>{
      console.log(responce.data);
       dispatch(SetInitialState({Teacher:responce.data.Teacher,Auth:responce.data.Auth}))
       localStorage.setItem('jwt-token',responce.data.tkn)
       if(!auth){
         message.success(responce.data.message)
         
        }else{
          message.success(responce.data.message)
          window.location='/courseadd' as Location &string

        }
      })
    .catch(err=>{
      console.log(err);
      
    })
  }
  return (
    <div className="tw-w-full tw-h-screen tw-bg-slate-300 tw-flex tw-justify-center tw-items-center">
      <div className="lg:tw-w-3/12 sm:tw-w-6/12 tw-p-6 tw-bg-slate-50 tw-rounded-lg tw-shadow-lg">
        <form onSubmit={submithandler}>
          <div className="tw-mt-2">
            <label className="tw-font-outfit tw-text-lg">Email</label>
            <br />
            <input
              type={"text"}
              placeholder="Email"
              className="tw-w-full tw-p-3 tw-rounded-lg"
              value={data.email}
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
              }}
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
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
            />
          </div>
          <div className="tw-flex tw-justify-between">
            <button className="tw-bg-red-400 tw-p-3 tw-mt-2 tw-rounded-lg">
              Submit
            </button>
            <Link to='/studentlogin' className="tw-font-outfit tw-text-lg tw-mt-5" >StudentLogin..</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
