import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const [show, setShow] = useState(false);
     const { isAuthorized, setIsAuthorized, user } = useContext(Context);
     const navigateTo = useNavigate();

     const handleLogout = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/user/logout",
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  if (!isAuthorized) return null;
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
                {user?.role === "Employer"
                ? "APPLICANT'S APPLICATIONS"
                : "MY APPLICATIONS"}
            </Link>
          </li>
                    {user?.role === "Employer" && (
            <>
              <li>
                <Link to="/job/post">POST NEW JOB</Link>
              </li>
              <li>
                <Link to="/job/me">VIEW YOUR JOBS</Link>
              </li>
            </>
          )}

          <button onClick={handleLogout}>LOGOUT</button>
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
