import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"
function Navbar() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">BlogPress</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
