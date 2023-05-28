import React, { useEffect, useState } from "react";
import "./Test.css";
import { access_token, baseUrl } from "../../access";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
function Test() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [userName, setuserName] = useState("");
  const [questions, setquestions] = useState("");
  const [option_a, setoption_a] = useState("");
  const [option_b, setoption_b] = useState("");
  const [option_c, setoption_c] = useState("");
  const [option_d, setoption_d] = useState("");
  const [error, setError] = useState(false);
  const [remainingTimeString, setRemainingTimeString] = useState('');
  const [time, settime] = useState(1800);
  
  const [intervalId, setIntervalId] = useState(null);
  const [Array, setArray] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setshow] = useState(location.state && location.state.show ? location.state.show : false);
  const [id, setid] = useState(() => {
    const storedId = localStorage.getItem("id");
    return storedId ? parseInt(storedId) : 0;
  });
  const [selectedOptions, setSelectedOptions] = useState(() => {
    const initialSelectedOptions = {};
    Array.forEach((question) => {
      initialSelectedOptions[question.question_id] = "x";
    });
    return initialSelectedOptions;
  });

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [Array[id].question_id]: option,
    }));
  };

  const resetQuestion = () => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [Array[id].question_id]: "x",
    }));
    setSelectedOption(null);
  };

  useEffect(() => {
    const userToken = localStorage.getItem("userAccess");
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    axios.get(`${baseUrl}/api/auth/user/`, config).then((response) => {
      console.log(response.data);
      setuserName(response.data.username);
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };
      const data = {
        username: response.data.username,
      };
      
      
      // Inside your component
    
      const interval = setInterval(() => {
        axios.post(`${baseUrl}/api/technical/time/response/`, data, config)
          .then(response => {
            const timeDifference = response.data.time_difference;
            const timeParts = timeDifference.split(':');
            const hours = parseInt(timeParts[0]);
            const minutes = parseInt(timeParts[1]);
            const seconds = parseInt(timeParts[2].split('.')[0]);
    
            const remainingTime = (40 * 60) - (minutes * 60 + seconds);
            const remainingHours = Math.floor(remainingTime / 3600);
            const remainingMinutes = Math.floor((remainingTime % 3600) / 60);
            const remainingSeconds = remainingTime % 60;
            settime(remainingTime);
            const formattedRemainingTime = `${remainingHours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
            setRemainingTimeString(formattedRemainingTime);
    
            if (remainingTime === 0) {
              clearInterval(interval);
              
            }
          })
          .catch(error => {
            console.log(error);
          });
      }, 1000); // Call every second (1000 milliseconds)
    
      setIntervalId(interval);
    
      return () => {
        clearInterval(interval);
      };
    })
    
  }, []);
  
useEffect(() => {
  if (time === 0) {
    handleSubmit();
  }
}, [time])

  useEffect(() => {
    setArray(location.state.Array);
    setid((prevId) => prevId || 0);
  }, [location.state.Array]);

  useEffect(() => {
    if (Array.length > 0 && Array[id]) {
      setquestions(Array[id].question);
      setoption_a(Array[id].option_a);
      setoption_b(Array[id].option_b);
      setoption_c(Array[id].option_c);
      setoption_d(Array[id].option_d);
      setSelectedOption(selectedOptions[Array[id].question_id] || null);
    }
  }, [id, Array, selectedOptions]);

  const handleSubmit = () => {
    const formattedOptions = {};
    Array.forEach((question) => {
      const questionId = question.question_id;
      formattedOptions[questionId] = selectedOptions[questionId] || "x";
    });
    const neededTime=30-time;
    const userToken = localStorage.getItem("userAccess");
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
    const formattedData = {
      ids: formattedOptions,
      username: userName,
      time:`${Math.floor(neededTime / 3600)}:${Math.floor((neededTime % 3600) / 60)}:${neededTime % 60}`
    };
    console.log(formattedData);
    axios.post(`${baseUrl}/api/technical/testuser/response/`,formattedData,config)
    .then(response => {
      console.log(response.data.id)
      navigate("/analysis", { state: { id: response.data.id }, replace: true });////////////////////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      // navigate("/analysis", );
    })
    .catch(error => {
      console.log(error)
    });
  };

  return (
    <div className="testMainContainer">
      {show&&
      <div className="testLeftContainer">
        <div className="questionContainer">
          <div className="questionno">Question no {id + 1}</div>
          <h3>{questions}</h3>
          <div className="options">
            <div
              className={`option ${selectedOption === "a" ? "selected" : ""}`}
              onClick={() => handleOptionClick("a")}
            >
              <div className="circle">
                {selectedOption === "a" && <div className="dot" />}
              </div>
              <span className="spanOptions">{option_a}</span>
            </div>
            <div
              className={`option ${selectedOption === "b" ? "selected" : ""}`}
              onClick={() => handleOptionClick("b")}
            >
              <div className="circle">
                {selectedOption === "b" && <div className="dot" />}
              </div>
              <span className="spanOptions">{option_b}</span>
            </div>
            <div
              className={`option ${selectedOption === "c" ? "selected" : ""}`}
              onClick={() => handleOptionClick("c")}
            >
              <div className="circle">
                {selectedOption === "c" && <div className="dot" />}
              </div>
              <span className="spanOptions">{option_c}</span>
            </div>
            <div
              className={`option ${selectedOption === "d" ? "selected" : ""}`}
              onClick={() => handleOptionClick("d")}
            >
              <div className="circle">
                {selectedOption === "d" && <div className="dot" />}
              </div>
              <span className="spanOptions">{option_d}</span>
            </div>
          </div>
          <div className="buttonContainer">
            <button
              onClick={() => {
                if (id >= 1) {
                  setid((prevId) => prevId - 1);
                }
              }}
              className="testButtons"
            >
              Previous
            </button>
            <button onClick={resetQuestion} className="testButtons">
              Reset
            </button>
            <button
              onClick={() => {
                if (id < 39) {
                  setid((prevId) => prevId + 1);
                }
              }}
              className="testButtons"
            >
              Next
            </button>
          </div>
        </div>
      </div>
}
{show&&
      <div className="testRightContainer">
        <div className="timer">Time Left:{remainingTimeString}</div>
        <h2 style={{ fontWeight: "400" }}>Question Panel</h2>
        <div className="questionBoxes">
          <div class="grid">
            {Array.map((item, index) => {
              return (
                <div
                  onClick={() => {
                    setid(index);
                  }}
                  class="question-box"
                >
                  {index + 1}
                </div>
              );
            })}
          </div>
        </div>
        <button
          onClick={() => {
            handleSubmit();
          }}
          className="submitTest"
        >
          Submit
        </button>
      </div>
}
    </div>
  );
}

export default Test;
