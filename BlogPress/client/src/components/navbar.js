import React, { useContext , useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "../css/navbar.css";
function Navbar() {
  const { logout } = useContext(AuthContext);
  const [menu, setMenu] = useState(false)
  const elems = document.getElementsByClassName("menu")
  function handleMenuClick(){
    setMenu(!menu)
    Array.from(elems).map((e)=>{
      return e.style.display=( menu ? "none":"block" )
    })
  }
  useEffect(()=>{
    window.addEventListener("resize",()=>{
      if (window.innerWidth > 400){
        setMenu(true)
        Array.from(elems).map((e)=>{
          return e.style.display="block";
        })
      } 
    })
  },[elems])
  return (
    <header className="nav-container">
      <nav>
        <ul>
          <li>
            <Link className="anchor" to="/">
              BlogPress
            </Link>
          </li>
          <li className="dropdown" onClick={handleMenuClick}>
            &#9776;
          </li>
          <li>
            <Link className="menu anchor" to="/post/create">
              Create Post  
            </Link>
          </li>
          <li>
            <Link className="menu anchor" to="/profile">
              Profile
            </Link>
          </li>
          <li className="menu">
            <button onClick={() => logout()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-log-out"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
