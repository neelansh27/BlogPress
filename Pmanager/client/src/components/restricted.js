import {useContext, useEffect} from "react"
import {AuthContext} from "../context/auth.context"
import {useNavigate} from "react-router-dom"
const Restricted = (props) => {
  const navigate = useNavigate()
  const {isLoggedIn,loading} = useContext(AuthContext)
  useEffect(()=>{
    if (!isLoggedIn && !loading){
      navigate("/auth/login")
    }
  },[isLoggedIn,loading,navigate])
  return props.children;
}

export default Restricted
