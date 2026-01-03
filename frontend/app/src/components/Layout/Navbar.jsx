import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [show, setShow] = useState(false);

  return (
    <nav className="navbarShow">
      <div className="container">
        {/* Logo */}
        <div className="logo">
          <img src="/careerconnect-white.png" alt="logo" />
        </div>

        {/* Menu */}
        <ul className={show ? "show-menu menu" : "menu"}>
          <li>
            <Link to="/" onClick={() => setShow(false)}>HOME</Link>
          </li>
          <li>
            <Link to="/job/getall" onClick={() => setShow(false)}>ALL JOBS</Link>
          </li>
          <li>
            <Link to="/applications/me" onClick={() => setShow(false)}>
              MY APPLICATIONS
            </Link>
          </li>
        </ul>

        {/* Hamburger */}
        <div className="hamburger" onClick={() => setShow(!show)}>
          {show ? <AiOutlineClose /> : <GiHamburgerMenu />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
