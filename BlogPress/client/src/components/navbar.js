import React, { useContext } from "react";
import {Link} from "react-router-dom"
import {AuthContext} from "../context/auth.context"
import "../css/navbar.css"
function Navbar() {
  const {logout} = useContext(AuthContext);
  return (
    <header className="nav-container">
      <nav>
        <ul>
          <li><Link className="anchor" to="/">BlogPress</Link></li>
          <li><Link className="anchor" to="/post/create">Create Post</Link></li>
          <li><Link className="anchor" to="/profile">Profile</Link></li>
          <li><button onClick={()=>logout()}>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
    </button></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
