import React, { useEffect, useState } from "react";
import { access_token, baseUrl } from "../../access";
import axios from "axios";
import "./Job.css";
import Card from "../Card/Card";
import { useNavigate } from "react-router-dom";
function Job() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showList, setshowList] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [object, setobject] = useState([]);
  const [chosenSkill, setchosenSkill] = useState("");
  const [userToken, setuserToken] = useState("");
  const [companyName, setcompanyName] = useState("");
  const [title, settitle] = useState("");
  const [location, setlocation] = useState("");
  const [pay, setpay] = useState("");
  const navigate=useNavigate();
  const handleClick = () => {
    navigate('/devsurvey');
  };
  useEffect(() => {
    const userToken = localStorage.getItem("userAccess");
    setuserToken(userToken);
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
    axios
      .get(`${baseUrl}/api/jobs/search/scrape-jobs/`, config)
      .then((response) => {
        console.log(response.data);
        setJobs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    const userToken = localStorage.getItem("userAccess");
    setuserToken(userToken);
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    axios
      .get(`${baseUrl}/api/jobs/scrape-result/Data Scientist/`, config)
      .then((response) => {
        setobject(response.data["Data Scientist"]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    console.log(chosenSkill);
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    if (chosenSkill) {
      axios
        .get(`${baseUrl}/api/jobs/scrape-result/${chosenSkill}/`, config)
        .then((response) => {
          setobject(response.data[chosenSkill]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [chosenSkill]);
  

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setshowList(true);
  };
  const filteredSkills = jobs.filter((skill) =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="jobContainer">
      <div className="listandinput">
        <input
          type="text"
          placeholder="Search for a skill..."
          value={searchTerm}
          onChange={handleSearch}
        />
        {jobs.length > 0 && filteredSkills.length > 0 && showList && (
          <ul className="skills-list">
            {filteredSkills.map((skill) => (
              <li
                onClick={() => {
                  setSearchTerm(skill);
                  setchosenSkill(skill);
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
             <a className="developersurvey" onClick={handleClick}>See the developer survey &gt;&gt;</a>
      </div>
     
      <div className="cardDivFlex">
        {object.map((item) => {
          console.log(item);
          return (
            <Card
              title={item.title}
              companyName={item.company_name}
              location={item.location}
              missing={item.missing_skills}
              companySkills={item.company_skills}
              pay={item.avg_base_pay_est}
              link={item.company_link}
              matching={item.matching_skills}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Job;
