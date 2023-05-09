import { React, useState, useEffect } from "react";
import "./Signup.css";
import signupImage from "../../assets/signup.jpg";
import validator from "validator";
import axios from "axios";
import Alert from '@mui/material/Alert';
import { access_token } from "../../access";
function Signup() {
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [showList, setshowList] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [errorMessage, seterrorMessage] = useState('');
  const [showAlert, setshowAlert] = useState(false)
  const [languages, setlanguages] = useState([]);
  const baseUrl = "http://127.0.0.1:8000";
  useEffect(() => {
    fetchData(access_token)
  }, []);
  function fetchData(access) {
    const config = {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    };
    axios
      .get(`${baseUrl}/api/jobs/search/skills/`, config)
      .then((response) => {
        console.log(response.data);
        setlanguages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function validateEmail(e) {
    const email = e.target.value;
    if (validator.isEmail(email)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  }
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    console.log(formValues.email);
    if (e.target.name === 'email') {
      validateEmail(e);
    }
  };
  const handleNext = (e) => {
    e.preventDefault();
    if(!emailError&&formValues.username.length>0&&formValues.password.length>0&&formValues.email.length>0)
    {
    setShowAdditionalInfo(true);
    setshowAlert(false)
    }
    else if(formValues.username.length===0)
    {
      seterrorMessage("Sorry, but the username field is empty. Please provide a valid username and try again!!");
      setshowAlert(true)
    }
    else if(emailError||formValues.email.length===0)
    {
      seterrorMessage("Sorry, but the email you entered is incorrect. Please double-check your email address and try again!!")
      setshowAlert(true)
    }
    else if(formValues.password.length===0)
    {
      seterrorMessage("Sorry, but the password field is empty. Please provide a valid  and try again!!")
      setshowAlert(true)
    }
  };
  const [searchTerm, setSearchTerm] = useState("");
  const filteredSkills = languages.filter((skill) =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setshowList(true);
  };

  return (
    <div className="containerSignup">
      {!showAdditionalInfo && (
        <div className="leftContainerSignup">
          <h1 className="signUpHeader">Step 1</h1>
          <form className="form">
          {showAlert&&<Alert className="alert"severity="error">{errorMessage}</Alert>}
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="username"
              placeholder="Enter your username"
              autoComplete="on"
              required
            />
            <input
              type="email"
              onChange={(e) => {handleChange(e);}}
              name="email"
              placeholder="Enter your email"
              autoComplete="on"
              required
            />
            <input
              onChange={(e) => handleChange(e)}
              type="password"
              name="password"
              placeholder="Enter Password"
              autoComplete="on"
              required
            />
            <button
              className="nextButton"
              onClick={(e) => {
                handleNext(e);
                
              }}
            >
              NEXT
            </button>
          </form>
        </div>
      )}
      {showAdditionalInfo && (
        <div className="leftContainerSignup">
          <h1 className="signUpHeader">Step 2</h1>
          <form className="form">
            <div className="listandinput">
              <input
                type="text"
                placeholder="Search for a Language"
                value={searchTerm}
                onChange={handleSearch}
              />
              {filteredSkills.length > 0 && searchTerm && showList && (
                <ul className="skills-list">
                  {filteredSkills.map((skill) => (
                    <li
                      onClick={() => {
                        setSearchTerm(skill);
                        setshowList(false);
                      }}
                      className="skillsList"
                      key={skill}
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              className="nextButton"
              onClick={(e) => {
                handleNext(e);
                
              }}
            >
              SUBMIT
            </button>
          </form>
        </div>
      )}

      <div className="rightContainerSignup">
        <img src={signupImage} alt="" className="signupImage" />
      </div>
    </div>
  );
}

export default Signup;
