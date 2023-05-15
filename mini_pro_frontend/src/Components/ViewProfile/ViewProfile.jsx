import React, { useEffect, useState } from "react";
import "./ViewProfile.css";
import axios from "axios";
import { access_token, baseUrl } from "../../access";
import logout from "../../assets/logout.png";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
function ViewProfile() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showList, setshowList] = useState(true);
  const [languages, setlanguages] = useState([]);
  const [userToken, setuserToken] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setemail] = useState("");
  const [count, setcount] = useState(0);
  const [selectedSkills, setselectedSkills] = useState([]);
  const [showData, setshowData] = useState(true);
  const [saveChanges, setsaveChanges] = useState("Edit Profile");
  const [errorMessage, seterrorMessage] = useState("");
  const [showAlert, setshowAlert] = useState(false);
  const [showPopup, setshowPopup] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData(access_token);
    //http://127.0.0.1:8000/api/auth/user
    const userToken = localStorage.getItem("userAccess");
    setuserToken(userToken);
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    axios
      .get(`${baseUrl}/api/auth/user/`, config)
      .then((response) => {
        const str = response.data.skills;
        const arr = str.split(",");
        setUserName(response.data.username);
        setemail(response.data.email);
        setselectedSkills(arr);
      })
      .catch((error) => {
        console.log(error);
      });
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
  const filteredSkills = languages.filter((skill) =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );
  function handleDeleteItem(itemToDelete) {
    const newArray = selectedSkills.filter((item) => item !== itemToDelete);
    setselectedSkills(newArray);
    setcount(count - 1);
    console.log(itemToDelete);
  }
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setshowList(true);
  };
  function handleToggle() {
    setshowData(!showData);
    if (saveChanges === "Edit Profile") {
      setsaveChanges("Save Changes");
      if (selectedSkills.length > 0) {
        setshowAlert(false);
      } else if (selectedSkills.length === 0) {
        setshowAlert(true);
      }
    } else {
      setsaveChanges("Edit Profile");
      handleSaveChanges();
    }
  }
  async function handleSaveChanges() {
    if (selectedSkills.length === 0) {
      seterrorMessage("Select atleast 1 skill");
      setshowAlert(true);
    } else {
      const finalskillslist = selectedSkills.join(",");
      setshowAlert(false);
      console.log(finalskillslist);
      console.log(userName);
      console.log(email);

      const data = {
        username: userName,
        email: email,
        skills: finalskillslist,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      try {
        const response = await axios.put(
          `${baseUrl}/api/auth/user/`,
          data,
          config
        );
      } catch (error) {
        console.log(error);
      }
    }
  }
   function handleDelete()
  {
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    axios
      .delete(`${baseUrl}/api/auth/user/`, config)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("userAccess",'')
        navigate('/')
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  return (
    <div className="viewProfileContainer">
      <div
        onClick={() => {
          localStorage.setItem("userAccess", "");
          window.location.reload();
        }}
        className="logoutProfile"
      >
        <img src={logout} alt="" className="logoutImage" />
        <span>Log Out</span>
      </div>
      <div className="innerContainer">
        <h3>Username</h3>
        <input
          className="inputviewProfile"
          type="text"
          value={userName}
          disabled
        />
        <h3>Email</h3>
        <input
          className="inputviewProfile"
          type="text"
          value={email}
          disabled
        />
        <h3>Skills</h3>
        {showAlert && (
          <Alert className="alertviewprofile" severity="error">
            {errorMessage}
          </Alert>
        )}
        {showData ? (
          <div className="skillsContainercompany">
            {selectedSkills.map((item) => {
              return (
                <div className="companyskillContainer1">
                  <h3 className="skillHeaderCompany1">{item}</h3>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="listandinput2">
            <input
              className="inputviewProfile"
              type="text"
              placeholder="Search for a Language"
              value={searchTerm}
              onChange={handleSearch}
            />
            {filteredSkills.length > 0 && searchTerm && showList && (
              <ul className="skills-list2">
                {filteredSkills.map((skill) => (
                  <li
                    onClick={() => {
                      setSearchTerm("");
                      setshowList(false);
                      if (selectedSkills.includes(skill)) {
                        return;
                      } else {
                        setselectedSkills((prevItems) => {
                          const updatedItems = [...prevItems, skill];
                          return updatedItems;
                        });
                        setcount(count + 1);
                      }
                    }}
                    key={skill}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            )}
            <div className="selectedskillcontainer1">
              {selectedSkills.map((item) => {
                return (
                  <div className="genreDiv1">
                    <div className="genreHeader1">{item}</div>
                    <div
                      onClick={() => {
                        handleDeleteItem(item);
                      }}
                      className="closeButton1"
                    >
                      X
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className="buttonContainer">
          <button
            onClick={() => {
              navigate("/landing");
            }}
            className="editProfile backtohome"
          >
            Back To Home
          </button>
          <button className="editProfile" onClick={handleToggle}>
            {saveChanges}
          </button>
          <button
            onClick={() => {
              setshowPopup(true);
            }}
            className="editProfile DeleteProfile"
          >
            Delete Profile
          </button>
        </div>
      </div>
      {showPopup && (
        <div class="popup">
          <div class="popup-content">
            <div
              onClick={() => {
                setshowPopup(false);
              }}
              className="closeButton closeButton1"
            >
              x
            </div>
            <p>
              Do u wish to{" "}
              <span
                style={{
                  color: "red",
                  fontFamily: "Roboto",
                  fontWeight: "500",
                }}
              >
                delete your account
              </span>
              ?
            </p>

            <button  onClick={handleDelete}className="confirmDelete"> Confirm Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewProfile;
