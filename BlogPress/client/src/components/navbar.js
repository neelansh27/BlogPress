import React, { useEffect, useState, useContext } from "react";
import {Link} from "react-router-dom"
import {AuthContext} from "../context/auth.context"
function Navbar() {
  const {logout} = useContext(AuthContext);
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">BlogPress</Link></li>
          <li><Link to="/post/create">Create Post</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><button onClick={()=>logout()}>Logout</button></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
