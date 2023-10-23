import {useContext,useEffect} from "react"
import {AuthContext} from "../context/auth.context"
import {useNavigate} from "react-router-dom"
const NotRestricted = (props) => {
  const navigate = useNavigate()
  const {isLoggedIn,loading} = useContext(AuthContext)
  useEffect(()=>{
    if(isLoggedIn && !loading){
      return navigate("/")
    }
  })
  return props.children;
}
export default NotRestricted
