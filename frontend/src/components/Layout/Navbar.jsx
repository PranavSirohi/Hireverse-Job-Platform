import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import "./Navbar.css"; // Import CSS file

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
      setIsAuthorized(true);
    }
  };

  return (
    <nav className={isAuthorized ? "navbar navbarShow" : "navbar navbarHide"}>
      <div className="container">
        {/* Logo */}
        <div className="logo">
          <img src="/navbar1.png" alt="logo" />
        </div>

        {/* Menu Items */}
        <ul className={`menu ${show ? "show-menu" : ""}`}>
          <li>
            <Link to="/" onClick={() => setShow(false)}>Home</Link>
          </li>
          <li>
            <Link to="/job/getall" onClick={() => setShow(false)}>All Jobs</Link>
          </li>
          <li>
            <Link to="/applications/me" onClick={() => setShow(false)}>
              {user && user.role === "Employer"
                ? "Applicant's Applications"
                : "My Applications"}
            </Link>
          </li>
          {user && user.role === "Employer" && (
            <>
              <li>
                <Link to="/job/post" onClick={() => setShow(false)}>Post New Job</Link>
              </li>
              <li>
                <Link to="/job/me" onClick={() => setShow(false)}>View Your Jobs</Link>
              </li>
            </>
          )}
          <li>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </li>
        </ul>

        {/* Mobile Hamburger Icon */}
        <div className="hamburger" onClick={() => setShow(!show)}>
          {show ? <AiOutlineClose /> : <GiHamburgerMenu />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
