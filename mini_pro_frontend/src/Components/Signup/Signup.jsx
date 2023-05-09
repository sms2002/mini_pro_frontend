import { React, useState, useEffect } from "react";
import "./Signup.css";
import signupImage from "../../assets/signup.jpg";
import validator from "validator";
import axios from "axios";
import { access_token } from "../../access";
function Signup() {
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [showList, setshowList] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [languages, setlanguages] = useState([]);
  const [skills, setskills] = useState([]);
  const [access, setaccess] = useState("");
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
      .get(`${baseUrl}/api/jobs/search/skills`, config)
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
  };
  const handleNext = (e) => {
    e.preventDefault();
    if(!emailError&&formValues.username.length>0&&formValues.password.length>0)
    {
    setShowAdditionalInfo(true);
    }
  };
  const skillsList = [
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "Ruby",
    "CSS",
    "HTML",
    "React",
    "Angular",
    "Vue",
    "JavaScript aaa",
  ];
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
              onChange={(e) => {handleChange(e);validateEmail(e);}}
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
