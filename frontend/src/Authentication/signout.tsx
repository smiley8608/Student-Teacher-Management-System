import { message } from "antd"
import { useEffect } from "react"

const SignOut=()=>{
   
    useEffect(()=>{
        localStorage.removeItem('jwt-token')
        message.success('Account Logged Out Successfully!')
       window.location='/login' as Location & string
    })
    return (
        <div>
            SignOut
        </div>
    )
}

export default SignOut