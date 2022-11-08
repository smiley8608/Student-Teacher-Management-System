import {Link} from 'react-router-dom'
import { useAppSelector } from '../Redux/hook'
const Navbar=()=>{

    const TeacherAuth=useAppSelector(state=>state.Teacher.Auth)
    return (
        <div className="tw-w-full tw-p-5 tw-bg-blue-600 tw-flex tw-justify-end tw-gap-5">

            {
                TeacherAuth ?<>  
                <Link to={'/courseadd'} className='tw-text-white tw-text-lg'>Course Add </Link>
                <Link to={'/studentadd'} className='tw-text-white tw-text-lg'>Student Add </Link>
                <Link to={'/studentlist'} className='tw-text-white tw-text-lg'>Student List</Link>
                <Link to={'/attendance'} className='tw-text-white tw-text-lg'>Attendance </Link>
                <Link to={'/leaveapprove'} className='tw-text-white tw-text-lg'>Leave Approve </Link>
                <Link to={'/signout'} className='tw-text-white tw-text-lg'>SignOut</Link>
                
                </>:<> 
                <Link to={'/signup'}  className='tw-text-white tw-text-lg'>SignUp</Link>
                <Link to={'/login'}  className='tw-text-white tw-text-lg'>Login</Link>
                
                </>
            }
          
            
        </div>
    )
}

export default Navbar