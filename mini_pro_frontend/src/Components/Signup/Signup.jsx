import { React, useState, useEffect } from "react";
import "./Signup.css";
import signupImage from '../../assets/signup1.jpg'
import validator from "validator";
import axios from "axios";
import Alert from '@mui/material/Alert';
import { access_token } from "../../access";
import { useNavigate } from "react-router-dom";
function Signup() {
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [showList, setshowList] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [errorMessage, seterrorMessage] = useState('');
  const [showAlert, setshowAlert] = useState(false)
  const [languages, setlanguages] = useState([]);
  const [count, setcount] = useState(0)
  const [selectedSkills, setselectedSkills] = useState([]);
  const [finalskillslist, setfinalskillslist] = useState('')
  const baseUrl = "http://127.0.0.1:8000";
  const navigate=useNavigate();
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
  function handleDeleteItem(itemToDelete) {
    const newArray = selectedSkills.filter(item => item !== itemToDelete);
    setselectedSkills(newArray);
    setcount(count-1);
    console.log(itemToDelete);
  }
  function handleSubmit(e)
  {
    e.preventDefault();
    console.log(selectedSkills);
    if(count===0)
    {
      setshowAlert(true);
      seterrorMessage("Please select atleast 1 skill");
    }
    else
    {
      setshowAlert(false);
      handlePostRequest();
    }
  }
  async function handlePostRequest()
  {
    const finalskillslist=selectedSkills.join(',')
    const data = {
      "username": formValues.username,
      "password": formValues.password,
      "email": formValues.email,
      "skills": finalskillslist,
    };
    try{
      const response=await axios.post(`${baseUrl}/api/auth/register/`,data)
      await handleLogin()
    }
    catch (error)
    {
      if(error.response.data.username)
      {
        seterrorMessage(error.response.data.username);
        setshowAlert(true);
        setShowAdditionalInfo(false);
      }
      else{
      seterrorMessage(error.response.data.email);
      setshowAlert(true)
      setShowAdditionalInfo(false);
      }
    };
  }
  async function handleLogin()
  {
    console.log('Login successful:');
    const data={
      "username":formValues.username,
      "password":formValues.password,
    }
    try{
    const response=await axios.post(`${baseUrl}/api/auth/login/`,data)
      console.log(response.data)
      console.log('Login successful:', response.data);
      localStorage.setItem("userAccess",response.data.access)
      navigate('/landing')
    }
    catch(error){
      console.error('Login failed:', error.response.data);
      alert(error.response.data)
    }
  }
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
              value={formValues.username}
            />
            <input
              type="email"
              onChange={(e) => {handleChange(e);}}
              name="email"
              placeholder="Enter your email"
              autoComplete="on"
              required
              value={formValues.email}
            />
            <input
              onChange={(e) => handleChange(e)}
              type="password"
              name="password"
              placeholder="Enter Password"
              autoComplete="on"
              required
              value={formValues.password}
            />
            <div className="already">Already have an account?<span onClick={()=>{navigate('/login')}} style={{color:'blue',paddingLeft:'0.5em',cursor:'pointer'}}>SignIn</span></div>
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
          {showAlert&&<Alert className="alert"severity="error">{errorMessage}</Alert>}
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
                        setSearchTerm('');
                        setshowList(false);
                        if (selectedSkills.includes(skill)) {
                          
                          return;
                        }
                        else{
                        setselectedSkills((prevItems) => {
                          const updatedItems = [...prevItems, skill];
                          return updatedItems;
                        });
                        setcount(count+1);
                      }
                        
                      }}
                      className="skillsList"
                      key={skill}
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              )}
              <div className="selectedskillcontainer">
            {selectedSkills.map((item)=>{
                return(<div className="genreDiv">
                <div className="genreHeader">{item}</div>
                <div onClick={() => {handleDeleteItem(item);}
                }className="closeButton">X</div>
            </div>);
              })}
            </div>
            </div>
            <button
              className="nextButton"
              onClick={(e) => {
                handleSubmit(e);
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
