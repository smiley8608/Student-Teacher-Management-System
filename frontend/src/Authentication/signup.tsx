import { message } from "antd";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import {SubmitHandler, useForm} from 'react-hook-form'
import { useAppDispatch } from "../Redux/hook";
import { SetInitialState } from "../Redux/teacherslice";
const SignUp = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    courses: "",
    password: "",
  });
  const [couserlist, setCourseList] = useState<any>([]);
  const dispatch = useAppDispatch();
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();
  
  useEffect(() => {
    axios.get("http://localhost:3002/getcourse").then((responce) => {
      console.log(responce.data);
      setCourseList(responce.data.course);
    });
  }, []);

  const onFormSubmit  = (e:FormEvent) => {
    e.preventDefault()
    if(data.username===''){
      message.success("please enter username")
      return false
    }else if(data.email===''){
      message.success('please enter the email')
      return false
    }else if(data.password===''){
      message.success('please enter the password')
      return false
    }

    axios
      .post("http://localhost:3002/signup", { data: data })
      .then((responce) => {
        dispatch(
          SetInitialState({
            Teacher: responce.data.Teacher,
            Auth: responce.data.Auth,
          })
        );
        localStorage.setItem("jwt-token", responce.data.tkn);
        message.success(responce.data.message);
        window.location='/courseadd' as Location &string
       
        
      })
      .catch((err) => {
        console.log(err);
        
      });
  }

  
  return (
    <div className="tw-w-full tw-h-screen tw-bg-slate-300 tw-flex tw-justify-center tw-items-center">
      <div className="lg:tw-w-3/12 sm:tw-w-6/12 tw-p-6 tw-bg-slate-50 tw-rounded-lg tw-shadow-lg">
        <form onSubmit={onFormSubmit}>
          <div className="tw-mt-2">
            <label className="tw-font-outfit tw-text-lg">UserName</label>
            <br />
            <input
              type={"text"}
              placeholder="Username"
              className="tw-w-full tw-p-3 tw-rounded-lg"
              // {...register('username',{required:true})}
              value={data.username}
              onChange={(e) => {
                setData({ ...data, username: e.target.value })
              }}
            />
            {/* {errors.username?.type==="required"&&"UserName is required"} */}
          
          </div>
          <div className="tw-mt-2">
            <label className="tw-font-outfit tw-text-lg">Course</label>
            <br />
            <select className="tw-p-2"
              onChange={(e) => {
                setData({ ...data, courses: e.target.value });
              }}
            >
              <option>select Option</option>
              {couserlist &&couserlist.map((list: any) => {
                return (
                  <option className="tw-text-sm tw-font-medium tw-text-gray-900 tw-text-left" key={list._id} value={list._id}>
                    {list.course + "-" + list.department}
                  </option>
                );
              })}
            </select>
            {/* <input
              type={"text"}
              placeholder="Department"
              className="tw-w-full tw-p-3 tw-rounded-lg"
              value={data.department}
              onChange={(e)=>{setData({...data,department:e.target.value})}}
            /> */}
          </div>
          <div className="tw-mt-2">
            <label className="tw-font-outfit tw-text-lg">Email</label>
            <br />
            <input
              type={"email"}
              placeholder="Email"
              className="tw-w-full tw-p-3 tw-rounded-lg"
              // {...register('email',{required:true})}
              value={data.email}
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
              }}
            />
            {/* {errors.email?.type==='required'&&"email Id is required"} */}
           
          </div>
          <div className="tw-mt-2">
            <label className="tw-font-outfit tw-text-lg">Password</label>
            <br />
            <input
              type={"password"}
              placeholder="Password"
              className="tw-w-full tw-p-3 tw-rounded-lg"
              // {...register('password',{pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{7,30}$/,required:true})}
              value={data.password}
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
            />
           {/* {errors.password?.type==="required"&&"password is required"} */}
           {/* {errors.password?.type==="pattern"&&"check the password"} */}
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

export default SignUp;
