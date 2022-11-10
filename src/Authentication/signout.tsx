import { message } from "antd"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const SignOut=()=>{
    const navigate=useNavigate()
    useEffect(()=>{
        localStorage.removeItem('jwt-token')
        message.success('Account Logged Out Successfully!')
        navigate('/login')
    })
    return (
        <div>
            SignOut
        </div>
    )
}

export default SignOut