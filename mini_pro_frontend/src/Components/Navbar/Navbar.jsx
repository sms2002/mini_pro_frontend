import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo-no-background.png";
import user from "../../assets/user.png";
import { baseUrl } from "../../access";
import axios from "axios";

function Navbar() {
  const [username, setusername] = useState("");

  useEffect(() => {
    const userToken = localStorage.getItem("userAccess");
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    axios
      .get(`${baseUrl}/api/auth/user/`, config)
      .then((response) => {
        setusername(response.data.username);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="navbarContainer">
      <div>
        <img className="navbarLogo" src={logo} alt="logo" />
      </div>
      <div className="username">
        <h3 className="usernameHeader">{username}</h3>
      </div>
        <img className="userImage" src={user} alt="" />
        <ul className="dropdown-menu">
          <li>View Profile</li>
          <li>SignOut</li>
        </ul>
    </div>
  );
}

export default Navbar;
