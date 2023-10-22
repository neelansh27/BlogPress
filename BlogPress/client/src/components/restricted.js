import {useContext} from "react"
import {AuthContext} from "../context/auth.context"
import {Navigate} from "react-router-dom"
const Restricted = (props) => {
  const {isLoggedIn,loading} = useContext(AuthContext)
  if (loading){
    return <p>Loading...</p>
  }
  if (!isLoggedIn){
    return <Navigate to="/auth/login"/>
  } else {
    return props.children;
  }
}

export default Restricted
