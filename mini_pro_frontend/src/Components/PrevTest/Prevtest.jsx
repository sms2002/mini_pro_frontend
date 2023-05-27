import React, { useEffect, useState } from "react";
import './Prevtest.css'
import { access_token, baseUrl } from "../../access";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
function Prevtest() {
  const location=useLocation();
  const navigate=useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [userName, setuserName] = useState("");
  const [questions, setquestions] = useState("");
  const [option_a, setoption_a] = useState("");
  const [option_b, setoption_b] = useState("");
  const [option_c, setoption_c] = useState("");
  const [option_d, setoption_d] = useState("");
  const [correctAnswer, setcorrectAnswer] = useState("");
  const [userAnswer, setuserAnswer] = useState("");
  const [analyseid, setanalyseid] = useState('')
  const [id, setid] = useState(() => {
    const storedId = localStorage.getItem("id");
    return storedId ? parseInt(storedId) : 0;
  });
  const [Array, setArray] = useState([])
  useEffect(() => {
   setanalyseid(location.state.id)
   console.log(location.state.id)
  }, [])
  
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
      setcorrectAnswer(Array[id].correct_answer)
      setuserAnswer(Array[id].user_answer)
    }
  }, [id, Array]);
  return (
    <div className="testMainContainer">
     
      <div className="testLeftContainer">
        <div className="questionContainer">
          <div className="questionno">Question no {id + 1}</div>
          <h3>{questions}</h3>
          <div className="options">
            <div
              className={`option ${correctAnswer === "a" ? "selected" : ""}`}
            >
              <div className="circle">
                {correctAnswer === "a" && <div className="dot" />}
              </div>
              <span className="spanOptions">{option_a}</span>
            </div>
            <div
              className={`option ${correctAnswer === "b" ? "selected" : ""}`}
            >
              <div className="circle">
                {correctAnswer === "b" && <div className="dot" />}
              </div>
              <span className="spanOptions">{option_b}</span>
            </div>
            <div
              className={`option ${correctAnswer === "c" ? "selected" : ""}`}
            >
              <div className="circle">
                {correctAnswer === "c" && <div className="dot" />}
              </div>
              <span className="spanOptions">{option_c}</span>
            </div>
            <div
              className={`option ${correctAnswer === "d" ? "selected" : ""}`}
            >
              <div className="circle">
                {correctAnswer === "d" && <div className="dot" />}
              </div>
              <span className="spanOptions">{option_d}</span>
            </div>
          </div>
          <div className="correctanswerwronganswer">
            <h3>Correct Answer: <span className="spancorrectwrong">{correctAnswer}</span></h3>
            <h3>Your Answer: <span className="spancorrectwrong">{userAnswer==='x'?'U left this question':userAnswer}</span></h3>
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

      <div className="testRightContainer">
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
        <div className="quitvisualButtons">
        <button
          
          className="submitTest"
          // 
          onClick={()=>{navigate("/analysis", { state: { id: analyseid }})}}
        >
          Visualization
        </button>
        <button
          
          className="submitTest exitButton"
          onClick={()=>{navigate('/mcq')}}
        >
          Exit
        </button>
        </div>
      </div>
    </div>
  );
}

export default Prevtest
