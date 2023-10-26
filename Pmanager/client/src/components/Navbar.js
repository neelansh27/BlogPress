import React,{useContext} from 'react'
import {AuthContext} from "../context/auth.context"
import {Link} from "react-router-dom"
export default function Navbar() {
  const {logout} = useContext(AuthContext)
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/user/invites">Invites</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><button onClick={()=>{logout()}} >Logout</button></li>
      </ul>
    </nav>
  )
}
