import React, { useState } from "react";
import "./Test.css";
function Test() {
  const [selectedOption, setSelectedOption] = useState(null);
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
  return (
    <div className="testMainContainer">
      <div className="testLeftContainer">
        <div className="questionContainer">
          <div className="questionno">Question no 1</div>
          <h3>Which of the following pattern ?</h3>
          <div className="options">
            <div
              className={`option ${selectedOption === "A" ? "selected" : ""}`}
              onClick={() => handleOptionClick("A")}
            >
              <div className="circle">
                {selectedOption === "A" && <div className="dot" />}
              </div>
              <span className="spanOptions">Method overloading is used to provide multiple</span>
            </div>
            <div
              className={`option ${selectedOption === "B" ? "selected" : ""}`}
              onClick={() => handleOptionClick("B")}
            >
              <div className="circle">
                {selectedOption === "B" && <div className="dot" />}
              </div>
              <span className="spanOptions">Method overloading is used to provide multiple</span>
            </div>
            <div
              className={`option ${selectedOption === "C" ? "selected" : ""}`}
              onClick={() => handleOptionClick("C")}
            >
              <div className="circle">
                {selectedOption === "C" && <div className="dot" />}
              </div>
              <span className="spanOptions">Method overloading is used to provide multiple</span>
            </div>
            <div
              className={`option ${selectedOption === "D" ? "selected" : ""}`}
              onClick={() => handleOptionClick("D")}
            >
              <div className="circle">
                {selectedOption === "D" && <div className="dot" />}
              </div>
              <span className="spanOptions">Method overloading is used to provide multiple </span>
            </div>
          </div>
          <div className="buttonContainer">
            <button className="testButtons">Previous</button>
            <button className="testButtons">Reset</button>
            <button className="testButtons">Next</button>
          </div>
        </div>
      </div>

      <div className="testRightContainer">
        <div className="timer">Time Left: 00:00:00</div>
        <h2 style={{fontWeight:'400'}}>Question Panel</h2>
        <div className="questionBoxes">
          <div class="grid">
            <div class="question-box">1</div>
            <div class="question-box">2</div>
            <div class="question-box">2</div>
            <div class="question-box">2</div>
            <div class="question-box">2</div>
            <div class="question-box">2</div>
            <div class="question-box">2</div>
            <div class="question-box">2</div>
            <div class="question-box">2</div>
            <div class="question-box">2</div>
            <div class="question-box">2</div>
            <div class="question-box">2</div>
            <div class="question-box">2</div>
            <div class="question-box">2</div>
            <div class="question-box">2</div>
            <div class="question-box">2</div>
            <div class="question-box">2</div>
            <div class="question-box">2</div>
            <div class="question-box">2</div>
            <div class="question-box">2</div>
            <div class="question-box">2</div>
            <div class="question-box">2</div>
            <div class="question-box">2</div>
            <div class="question-box">2</div>
            <div class="question-box">2</div>
            <div class="question-box">2</div>
            <div class="question-box">2</div>
            <div class="question-box">2</div>
            <div class="question-box">2</div>
            <div class="question-box">2</div>
            <div class="question-box">2</div>
            <div class="question-box">2</div>
            <div class="question-box">2</div>
            <div class="question-box">2</div>
            <div class="question-box">2</div>
            <div class="question-box">2</div>
            <div class="question-box">2</div>
            <div class="question-box">2</div>
            <div class="question-box">2</div>
            <div class="question-box">2</div>
            <div class="question-box">2</div>
          </div>
        </div>
        <button className="submitTest">Submit</button>
      </div>
    </div>
  );
}

export default Test;
