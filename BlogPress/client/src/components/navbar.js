import React from "react";
import {Link} from "react-router-dom"
function Navbar() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">BlogPress</Link></li>
          <li><input type="text" name="search" /> <button>O</button></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
