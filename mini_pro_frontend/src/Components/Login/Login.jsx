import React, { useState } from "react";
import "./Login.css";
import loginImage from "../../assets/login.jpg";
import Alert from "@mui/material/Alert";
import { baseUrl } from "../../access";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate=useNavigate()
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  const [showAlert, setshowAlert] = useState(false);
  const [errorMessage, seterrorMessage] = useState('')
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    console.log(formValues);
  };
  function navigatePage()
  {
    navigate('/landing')
  }
  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      "username": formValues.username,
      "password": formValues.password,
    };
    axios.post(`${baseUrl}/api/auth/login/`,data)
    .then(response => {
      localStorage.setItem("userAccess",response.data.access)
      navigatePage();
      setshowAlert(false);
    })
    .catch(error => {
      seterrorMessage(error.response.data.detail)
      setshowAlert(true);
    })
  }
  return (
    <div className="loginmainContainer">
      <div className="loginContainer">
        {/*     border: 0 solid #ebf0f5!important; */}
        <div className="loginTopContainer">
          <div className="loginHeader">
            Sign in{" "}
            <span onClick={()=>{navigate('/signup')}} className="loginspanheader" style={{ color: "blue" }}>
              Create an account?
            </span>
          </div>
          {showAlert&&<Alert className="alertLogin" severity="error">
            {errorMessage}
          </Alert>}
        </div>
        <div className="loginMiddleContainer">
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            name="username"
            autoComplete="on"
            value={formValues.username}
            className="loginInputField"
            placeholder="Enter username"
          />
          <input
            onChange={(e) => handleChange(e)}
            type="password"
            name="password"
            autoComplete="on"
            value={formValues.password}
            className="loginInputField"
            placeholder="Enter password"
          />
        </div>
        <button
          onClick={(e) => {
            handleSubmit(e);
          }}
          className="loginButton"
        >
          Submit
        </button>
      </div>
      <img src={loginImage} alt="" className="loginImage" />
    </div>
  );
}

export default Login;
