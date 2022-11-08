import Navbar from "./layout/navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CourseAdd from "./Pages/courseadd";
import StudentAdd from "./Pages/studentadd";
import StudentList from "./Pages/studentlist";
import Attendance from "./Pages/attendance ";
import LeaveApprove from "./Pages/leaveapprove ";
import SignUp from "./Authentication/signup";
import LogIn from "./Authentication/login";
import SignOut from "./Authentication/signout";
import { useEffect } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "./Redux/hook";
import { SetInitialState } from "./Redux/teacherslice";

const App = () => {
  const dispatch=useAppDispatch()
  const TeacherAuth=useAppSelector(state=>state.Teacher.Auth)
  useEffect(() => {
    let Token = localStorage.getItem("jwt-token");
    if (Token){
      axios.defaults.headers.common["jwt-token"] = Token;

    }

    axios.get('http://localhost:3002/authstatus')
    .then(responce =>{
      dispatch(SetInitialState({Teacher:responce.data.Teacher,Auth:responce.data.Auth}))
    })
  },[dispatch]);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {
            TeacherAuth?<>
            <Route path="/courseadd" element={<CourseAdd />} />
            <Route path="/studentadd" element={<StudentAdd />} />
            <Route path="/studentlist" element={<StudentList />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/leaveapprove" element={<LeaveApprove />} />
            <Route path="/signout" element={<SignOut />} />
            
            </>:<>
            
            <Route path="signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            </>
          }
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
