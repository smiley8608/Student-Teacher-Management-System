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
import StudentLogin from "./Authentication/studentlogin";
import StudentDeatils from "./studentpages/studentdetails";
import AttendenceReport from "./studentpages/attendenceReport";
import LeaveRequest from "./studentpages/leaveRequest";
import { SetInitialStudentState } from "./Redux/studentslice";
import LogOut from "./studentpages/logout";
import { EditStudentDetails } from "./Pages/editstudent";

const App = () => {
  const dispatch = useAppDispatch();
  const TeacherAuth = useAppSelector((state) => state.Teacher.Auth);
  const StudentAuth = useAppSelector((state) => state.Student.Auth);
  const Students=useAppSelector(state=>state.Student.Student)
  console.log(Students);
  
  console.log(StudentAuth);

  useEffect(() => {
    let Token = localStorage.getItem("jwt-token");
    if (Token) {
      axios.defaults.headers.common["jwt-token"] = Token;
      axios.get("http://localhost:3002/authstatus").then((responce) => {
        dispatch(
          SetInitialState({
            Teacher: responce.data.Teacher,
            Auth: responce.data.Auth,
          })
        );
      });
    }

    let StudentToken = localStorage.getItem("student-token");
    if (StudentToken) {
      axios.defaults.headers.common["student-token"] = StudentToken;
      axios
        .get("http://localhost:3002/student/studentauth")
        .then((responce) => {
          dispatch(
            SetInitialStudentState({
              Student: responce.data.Student,
              Auth: responce.data.Auth,
            })
          );
        });
    }
  }, [dispatch]);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {TeacherAuth ? (
            <>
              <Route path="/courseadd" element={<CourseAdd />} />
              <Route path="/studentadd" element={<StudentAdd />} />
              <Route path="/studentlist" element={<StudentList />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/leaveapprove" element={<LeaveApprove />} />
              <Route path="/editstudent/:_id" element={<EditStudentDetails />} />
              <Route path="/signout" element={<SignOut />} />
            </>
          ) : (
            <>
              {StudentAuth ? (
                <>
                 
                  <Route path="/studentdetail" element={<StudentDeatils />} />
                  <Route
                    path="/attendencereport"
                    element={<AttendenceReport />}
                  />
                  <Route path="/leaverequest" element={<LeaveRequest />} />
                  <Route path="/studentlogout" element={<LogOut />} />
                </>
              ) : (
                <>
                  <Route path="signup" element={<SignUp />} />
                  <Route path="/login" element={<LogIn />} />
                  <Route path="/studentlogin" element={<StudentLogin />} />
                </>
              )}
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
