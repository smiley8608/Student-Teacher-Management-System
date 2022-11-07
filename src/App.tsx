import Navbar from "./layout/navbar";
import { BrowserRouter ,Route,Routes } from "react-router-dom";
import CourseAdd from "./Pages/courseadd";
import StudentAdd from "./Pages/studentadd";
import StudentList from "./Pages/studentlist";
import Attendance from "./Pages/attendance ";
import LeaveApprove from "./Pages/leaveapprove ";
import SignUp from "./Authentication/signup";
import LogIn from "./Authentication/login";
import SignOut from "./Authentication/signout";


const App = () => {


  return (

    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/courseadd" element={<CourseAdd />} />
        <Route path="/studentadd" element={<StudentAdd />} />
        <Route path="/studentlist" element={<StudentList />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/leaveapprove" element={<LeaveApprove />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signout" element={<SignOut />} />
      </Routes>
      
      </BrowserRouter>

    </div>

  );
}

export default App
