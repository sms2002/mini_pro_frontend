import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "./Mcq.css";
import BarChart from "../BarChart/BarChart";
import axios from "axios";
import { access_token, baseUrl } from "../../access";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
function Mcq() {

  const navigate=useNavigate();
  const [LatestArray, setLatestArray] = useState([]);
  const [Array, setArray] = useState([]);
  const [userName, setuserName] = useState('');
  const [percentage, setpercentage] = useState(0);
  const [score, setscore] = useState(0);
  const [similarerror, setsimilarerror] = useState('')
  // const CircularScore = (score) => {
  //   const total=40;
  //   setpercentage((score / total) * 100);
  //   setscore(score)
  // };
  const fortyMinutes = 40 * 60 * 1000;
  const progressBarStyles = {
    root: {}, // modify the root container styles if needed
    path: {
      stroke: '', // change the color of the progress bar
    },
    trail: {}, // modify the trail (background) styles if needed
    text: {
      fill: 'white', // change the color of the text inside the progress bar
      fontSize: '1.5rem', // adjust the font size if needed
    },
  };
  useEffect(() => {
    const userToken = localStorage.getItem("userAccess");
   
  }, [])
  
  useEffect(() => {
    // axios.get(`http://127.0.0.1:8000/api/technical/prev-results/user/`)
    const userToken = localStorage.getItem("userAccess");
    const config2 = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    axios
      .get(`${baseUrl}/api/auth/user/`, config2)
      .then((response) => {
        console.log(response.data);
        setuserName(response.data.username)
        localStorage.setItem("username",response.data.username)
        // localStorage.setItem('userName',response.data.username)
        const config = {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        };
        axios
          .get(`${baseUrl}/api/technical/prev-results/user/`, config)
          .then((response) => {
            console.log(response.data);
            // const data = response.data;
            // const scoresArray = data.map((item) => item.results.scores.total_score);
            setLatestArray(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
          // CircularScore()
          // const config1 = {
          //   headers: {
          //     Authorization: `Bearer ${access_token}`,
            
          //   }
          // };
          // const data = {
          //   "username": response.data.username,
          // };
          // axios.post(`${baseUrl}/api/technical/question/generate/`,data,config1)
          // .then(response => {
          //   setArray(response.data);
          // })
          // .catch(error => {
          //   console.log(error)
          // })
      })
      .catch((error) => {
        console.log(error);
      });
   
  }, []);
  const closePopup = () => {
    setsimilarerror('');
  };
  return (
    <div className="mcqContainer">
      <div className="graphContainer">
        <BarChart />
      </div>
      <div className="prevResultContainer">
        <div className="buttonTestContainer">
          <button onClick={()=>{
            const config1 = {
              headers: {
                Authorization: `Bearer ${access_token}`,
              
              }
            };
            const username = localStorage.getItem("username");
            console.log("Username:", username);
            const data = {
              "username": localStorage.getItem("username"),
            };
            axios.post(`${baseUrl}/api/technical/question/generate/`,data,config1)
            .then(response => {
              const Array=response.data;
              navigate('/test', { state: { Array,timer:fortyMinutes,show:true } });
              console.log(response.data)
            })
            .catch(error => {
              console.log(error)
            });
            
            }} className="testButton">New Test</button>
          <button 
          onClick={()=>{
            const config1 = {
              headers: {
                Authorization: `Bearer ${access_token}`,
              
              }
            };
            const username = localStorage.getItem("username");
            console.log("Username:", username);
            const data = {
              "username": localStorage.getItem("username"),
            };
            axios.post(`${baseUrl}/api/technical/question/similar/`,data,config1)
            .then(response => {
              setsimilarerror('');
              const Array=response.data;
              navigate('/test', { state: { Array,timer:fortyMinutes,show:true } });
              console.log(response.data)
            })
            .catch(error => {
              console.log(error.response.data.error)
              setsimilarerror(error.response.data.error)
            });
            
            }}
            className="testButton1">Test Based on similar questions</button>
        </div>
        {similarerror && (
          <div class="popup">
          <div class="popup-content">
            <div
              onClick={() => {
                closePopup();
              }}
              className="closeButton closeButton1"
            >
              x
            </div>
            <p>
              {similarerror}
            </p>
          </div>
        </div>
        )}
        <div className="prevTestContainer">
        {LatestArray.map((item,index)=>{
          console.log(item.id)
          const score=item.results.scores.total_score;
          const percentage=(score / 40) * 100
          const getBackgroundColor = () => {
            if (score >26) {
              return 'green'; // Set background color to green if score is 80% or higher
            } else if (score>13&&score) {
              return 'yellow'; // Set background color to yellow if score is between 50% and 79%
            } else {
              return 'red'; // Set background color to red if score is below 50%
            }
          };
        
          const backgroundColor = getBackgroundColor();
          return(
            <div onClick={()=>{console.log(Array);navigate('/analysis',{state:{id:item.id}})}} className="testContainer" style={{ background: backgroundColor }}>
            <div>
              <h1>{`Test ${index+1}`}</h1>
            </div>
            <div className="circular-score">
              <CircularProgressbar
                value={percentage}
                text={`${score}/40`}
                styles={progressBarStyles}
                className="cirularProgressBar"
              />
            </div>
          </div>
          )
        })}
          
        </div>
      </div>
    </div>
  );
}

export default Mcq;
