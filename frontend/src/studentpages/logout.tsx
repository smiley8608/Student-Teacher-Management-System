import { message } from "antd"
import { useEffect } from "react"

const LogOut=()=>{
   
    useEffect(()=>{
        localStorage.removeItem('student-token')
        message.success('Account Logged Out Successfully!')
        window.location ='/login' as Location & string
   
    })
    return(
        <div>
            LogOut
        </div>
    )
}

export default LogOut