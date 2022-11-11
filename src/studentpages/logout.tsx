import { message } from "antd"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const LogOut=()=>{
    const navigate=useNavigate()
    useEffect(()=>{
        localStorage.removeItem('student-token')
        message.success('Account Logged Out Successfully!')
        navigate('/login')
    })
    return(
        <div>
            LogOut
        </div>
    )
}

export default LogOut