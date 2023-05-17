import React, { useEffect, useState } from "react";
import "./Analyze.css";
import { baseUrl } from "../../access";
import axios from "axios";
import BarChartAnalysis from "../BarChartAnalysis/BarChartAnalysis";
function Analyze(props) {
  const [activeButton, setActiveButton] = useState(null);
  const [total_Attempted_questions, settotal_Attempted_questions] = useState(0);
  const [total_Attempted_questions_rate, settotal_Attempted_questions_rate] =
    useState(0);
  const [totalCorrectQuestions, settotalCorrectQuestions] = useState(0);
  const [total_Correct_questions_rate, settotal_Correct_questions_rate] =
    useState(0);
  ////
  const [totalCnAttempted, settotalCnAttempted] = useState(0);
  const [totalOOpsAttempted, settotalOOpsAttempted] = useState(0);
  const [totalDbmsAttempted, settotalDbmsAttempted] = useState(0);
  const [totalOsAttempted, settotalOsAttempted] = useState(0);
  const [CnCorrect, setCnCorrect] = useState(0);
  const [OopsCorrect, setOopsCorrect] = useState(0);
  const [DbmsCorrect, setDbmsCorrect] = useState(0);
  const [OsCorrect, setOsCorrect] = useState(0);
  const [CnWrong, setCnWrong] = useState(0);
  const [OopsWrong, setOopsWrong] = useState(0);
  const [DbmsWrong, setDbmsWrong] = useState(0);
  const [OsWrong, setOsWrong] = useState(0);
  ////
  const [totalAnalysisAttempted, settotalAnalysisAttempted] = useState(0);
  const [totalApplyingAttempted, settotalApplyingAttempted] = useState(0);
  const [totalRememberingAttempted, settotalRememberingAttempted] = useState(0);
  const [totalUnderstandingAttempted, settotalUnderstandingAttempted] =
    useState(0);
  const [AnalysisCorrect, setAnalysisCorrect] = useState(0);
  const [ApplyingCorrect, setApplyingCorrect] = useState(0);
  const [RememberingCorrect, setRememberingCorrect] = useState(0);
  const [UnderstandingCorrect, setUnderstandingCorrect] = useState(0);
  const [AnalysisWrong, setAnalysisWrong] = useState(0);
  const [ApplyingWrong, setApplyingWrong] = useState(0);
  const [RememberingWrong, setRememberingWrong] = useState(0);
  const [UnderstandingWrong, setUnderstandingWrong] = useState(0);
  ////
  const [totalEasyAttempted, settotalEasyAttempted] = useState(0);
  const [totalMediumAttempted, settotalMediumAttempted] = useState(0);
  const [totalHardAttempted, settotalHardAttempted] = useState(0);
  const [EasyCorrect, setEasyCorrect] = useState(0);
  const [MediumCorrect, setMediumCorrect] = useState(0);
  const [HardCorrect, setHardCorrect] = useState(0);
  const [EasyWrong, setEasyWrong] = useState(0);
  const [MediumWrong, setMediumWrong] = useState(0);
  const [HardWrong, setHardWrong] = useState(0);
  ///
  const [CnCorrectAnswer, setCnCorrectAnswer] = useState(0);
  const [OopsCorrectAnswer, setOopsCorrectAnswer] = useState(0);
  const [DbmsCorrectAnswer, setDbmsCorrectAnswer] = useState(0);
  const [OsCorrectAnswer, setOsCorrectAnswer] = useState(0);
  const [CnWrongAnswer, setCnWrongAnswer] = useState(0);
  const [OopsWrongAnswer, setOopsWrongAnswer] = useState(0);
  const [DbmsWrongAnswer, setDbmsWrongAnswer] = useState(0);
  const [OsWrongAnswer, setOsWrongAnswer] = useState(0);
  //
  const [CnTotalAnswer, setCnTotalAnswer] = useState(0);
  const [OopsTotalAnswer, setOopsTotalAnswer] = useState(0);
  const [DbmsTotalAnswer, setDbmsTotalAnswer] = useState(0);
  const [OsTotalAnswer, setOsTotalAnswer] = useState(0);
  ///
  const [CnUnattemptedAnswer, setCnUnattemptedAnswer] = useState(0);
  const [OopsUnattemptedAnswer, setOopsUnattemptedAnswer] = useState(0);
  const [DbmsUnattemptedAnswer, setDbmsUnattemptedAnswer] = useState(0);
  const [OsUnattemptedAnswer, setOsUnattemptedAnswer] = useState(0);
  //////
  const handleButtonClick = (button) => {
    setActiveButton(button);
  };
  const chartLabels = ["CN", "DBMS", "OOPS", "OS"]; // Update the labels
  const chartData = {
    attempted: [
      totalCnAttempted,
      totalDbmsAttempted,
      totalOOpsAttempted,
      totalOsAttempted,
    ], // Update the attempted data values
    correct: [CnCorrect, DbmsCorrect, OopsCorrect, OsCorrect], // Update the correct data values
    wrong: [CnWrong, DbmsWrong, OopsWrong, OsWrong], // Update the wrong data values
  };
  const chartLabels1 = [
    "Analyzing",
    "Applying",
    "Remembering",
    "Understanding",
  ]; // Update the labels
  const chartData1 = {
    attempted: [
      totalAnalysisAttempted,
      totalApplyingAttempted,
      totalRememberingAttempted,
      totalUnderstandingAttempted,
    ], // Update the attempted data values
    correct: [
      AnalysisCorrect,
      ApplyingCorrect,
      RememberingCorrect,
      UnderstandingCorrect,
    ], // Update the correct data values
    wrong: [AnalysisWrong, ApplyingWrong, RememberingWrong, UnderstandingWrong], // Update the wrong data values
  };
  const chartLabels2 = ["Easy", "Medium", "Hard"]; // Update the labels
  const chartData2 = {
    attempted: [totalEasyAttempted, totalMediumAttempted, totalHardAttempted], // Update the attempted data values
    correct: [EasyCorrect, MediumCorrect, HardCorrect], // Update the correct data values
    wrong: [EasyWrong, MediumWrong, HardWrong], // Update the wrong data values
  };
  useEffect(() => {
    const userToken = localStorage.getItem("userAccess");
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    axios
      .get(`${baseUrl}/api/technical/prev-results/user/${props.id}/`, config)
      .then((response) => {
        console.log(response.data);
        const data = response.data.results.visualization;
        const total_Attempted_questions =
          data.CN_total -
          data.CN_left +
          (data.OOPS_total - data.OOPS_left) +
          (data.DBMS_total - data.DBMS_left) +
          (data.OS_total - data.OS_left);
        const total_Attempted_questions_rate =
          (total_Attempted_questions / 40) * 100;
        const total_correct_questions =
          data.CN_correct +
          data.OOPS_correct +
          data.DBMS_correct +
          data.OS_correct;
        const total_correct_questions_rate =
          (total_correct_questions / 40) * 100;
        settotal_Attempted_questions(total_Attempted_questions);
        settotal_Attempted_questions_rate(total_Attempted_questions_rate);
        settotalCorrectQuestions(total_correct_questions);
        settotal_Correct_questions_rate(total_correct_questions_rate);
        ////
        settotalCnAttempted(
          ((data.CN_correct + data.CN_wrong) / data.CN_total) * 100
        );
        settotalOOpsAttempted(
          ((data.OOPS_correct + data.OOPS_wrong) / data.OOPS_total) * 100
        );
        settotalDbmsAttempted(
          ((data.DBMS_correct + data.DBMS_wrong) / data.DBMS_total) * 100
        );
        settotalOsAttempted(
          ((data.OS_correct + data.OS_wrong) / data.OS_total) * 100
        );
        //
        setCnCorrect((data.CN_correct / data.CN_total) * 100);
        setOopsCorrect((data.OOPS_correct / data.OOPS_total) * 100);
        setDbmsCorrect((data.DBMS_correct / data.DBMS_total) * 100);
        setOsCorrect((data.OS_correct / data.OS_total) * 100);
        //
        setCnWrong((data.CN_wrong / data.CN_total) * 100);
        setOopsWrong((data.OOPS_wrong / data.OOPS_total) * 100);
        setDbmsWrong((data.DBMS_wrong / data.DBMS_total) * 100);
        setOsWrong((data.OS_wrong / data.OS_total) * 100);
        //
        ///////
        settotalAnalysisAttempted(
          ((data.analyzing_correct + data.analyzing_wrong) /
            data.analyzing_total) *
            100
        );
        settotalApplyingAttempted(
          ((data.applying_correct + data.applying_wrong) /
            data.applying_total) *
            100
        );
        settotalRememberingAttempted(
          ((data.remembering_correct + data.remembering_wrong) /
            data.remembering_total) *
            100
        );
        settotalUnderstandingAttempted(
          ((data.understanding_correct + data.understanding_wrong) /
            data.understanding_total) *
            100
        );
        //
        setAnalysisCorrect(
          (data.analyzing_correct / data.analyzing_total) * 100
        );
        setApplyingCorrect((data.applying_correct / data.applying_total) * 100);
        setRememberingCorrect(
          (data.remembering_correct / data.remembering_total) * 100
        );
        setUnderstandingCorrect(
          (data.understanding_correct / data.understanding_total) * 100
        );
        //
        setAnalysisWrong((data.analyzing_wrong / data.analyzing_total) * 100);
        setApplyingWrong((data.applying_wrong / data.applying_total) * 100);
        setRememberingWrong(
          (data.remembering_wrong / data.remembering_total) * 100
        );
        setUnderstandingWrong(
          (data.understanding_wrong / data.understanding_total) * 100
        );
        //
        ///////
        settotalEasyAttempted(
          ((data.easy_correct + data.easy_wrong) / data.easy_total) * 100
        );
        settotalMediumAttempted(
          ((data.medium_correct + data.medium_wrong) / data.medium_total) * 100
        );
        settotalHardAttempted(
          ((data.hard_correct + data.hard_wrong) / data.hard_total) * 100
        );
        //
        setEasyCorrect((data.easy_correct / data.easy_total) * 100);
        setMediumCorrect((data.medium_correct / data.medium_total) * 100);
        setHardCorrect((data.hard_correct / data.hard_total) * 100);
        //
        setEasyWrong((data.easy_wrong / data.easy_total) * 100);
        setMediumWrong((data.medium_wrong / data.medium_total) * 100);
        setHardWrong((data.hard_wrong / data.hard_total) * 100);
        //
        setCnCorrectAnswer(data.CN_correct)
        setOopsCorrectAnswer(data.OOPS_correct)
        setDbmsCorrectAnswer(data.DBMS_correct)
        setOsCorrectAnswer(data.OS_correct)
        ///
        setCnWrongAnswer(data.CN_wrong)
        setOopsWrongAnswer(data.OOPS_wrong)
        setDbmsWrongAnswer(data.DBMS_wrong)
        setOsWrongAnswer(data.OS_wrong)
        ///
        setCnTotalAnswer(data.CN_total)
        setOopsTotalAnswer(data.OOPS_total)
        setDbmsTotalAnswer(data.DBMS_total)
        setOsTotalAnswer(data.OS_total)
        ///
        setCnUnattemptedAnswer(data.CN_total-(data.CN_correct+data.CN_wrong))
        setOopsUnattemptedAnswer(data.OOPS_total-(data.OOPS_correct+data.OOPS_wrong))
        setDbmsUnattemptedAnswer(data.DBMS_total-(data.DBMS_correct+data.DBMS_wrong))
        setOsUnattemptedAnswer(data.OS_total-(data.OS_correct+data.OS_wrong))
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="mainContainerAnalysis">
      <div className="topanalysis">
        <div className="buttonAnalysisContainer">
          <button
            className={`buttonAnalysis subject ${
              activeButton === "subject" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("subject")}
          >
            Subject
          </button>
          <button
            className={`buttonAnalysis cognitive ${
              activeButton === "cognitive" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("cognitive")}
          >
            Cognitive
          </button>
          <button
            className={`buttonAnalysis difficulty ${
              activeButton === "difficulty" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("difficulty")}
          >
            Difficulty
          </button>
        </div>
      </div>
      <div className="middleContainer">
        <div className="leftContainerAnalysis">
          {activeButton === "subject" ? (
            <BarChartAnalysis labels={chartLabels} data={chartData} />
          ) : activeButton === "cognitive" ? (
            <BarChartAnalysis labels={chartLabels1} data={chartData1} />
          ) : (
            <BarChartAnalysis labels={chartLabels2} data={chartData2} />
          )}
        </div>
        <div className="rightContainerAnalysis">
          <div className="questionsAttempted">
            <h2 className="analysisHeader">{`${total_Attempted_questions}/40`}</h2>
            <p className="analysisPara">Questions Attempted</p>
          </div>
          <div className="questionsAttempted">
            <h2 className="analysisHeader">
              {`${total_Attempted_questions_rate}%`}{" "}
              <span
                style={{ color: "gray", fontWeight: "400", fontSize: "1.2rem" }}
              >
                ({`${total_Attempted_questions}/40`})
              </span>
            </h2>
            <p className="analysisPara">Attempt Rate</p>
          </div>
          <div className="questionsAttempted">
            <h2 className="analysisHeader">{`${totalCorrectQuestions}/40`}</h2>
            <p className="analysisPara">Correct Questions</p>
          </div>
          <div className="questionsAttempted">
            <h2 className="analysisHeader">
              {`${total_Correct_questions_rate}%`}{" "}
              <span
                style={{ color: "gray", fontWeight: "400", fontSize: "1.2rem" }}
              >
                ({`${totalCorrectQuestions}/40`})
              </span>
            </h2>
            <p className="analysisPara">Accuracy Rate</p>
          </div>
        </div>
      </div>

      <div className="bottomanalysis">
        <h1 className="marksHeader">Marks Distribution</h1>
        {/* CnCorrect, DbmsCorrect, OopsCorrect, OsCorrect */}
        <div className="cn">
          <h2 className="computernetwork">Computer Network</h2>
          <div className="outerAnalysisContainer">
          <div className="innerContaineranalysis">
            <h1 className="scoreAnalysis">{`${CnCorrectAnswer}`}</h1>
            <h2>Right Answers</h2>
          </div>
          <div className="innerContaineranalysis">
            <h1 className="scoreAnalysis">{`${CnWrongAnswer}`}</h1>
            <h2>Wrong Answers</h2>
          </div>
          <div className="innerContaineranalysis">
            <h1 className="scoreAnalysis">{`${CnUnattemptedAnswer}`}</h1>
            <h2>Not Attempted</h2>
          </div>
          <div className="innerContaineranalysis">
            <h1 className="scoreAnalysis">{`${CnCorrectAnswer}/${CnTotalAnswer}`}</h1>
            <h2>Total Score</h2>
          </div>
          </div>
        </div>
        <hr class="gray-line"/>
        <div className="cn">
        <h2 className="computernetwork">Database management system </h2>
        <div className="outerAnalysisContainer">
          <div className="innerContaineranalysis">
            <h1 className="scoreAnalysis">{`${DbmsCorrectAnswer}`}</h1>
            <h2>Right Answers</h2>
          </div>
          <div className="innerContaineranalysis">
            <h1 className="scoreAnalysis">{`${DbmsWrongAnswer}`}</h1>
            <h2>Wrong Answers</h2>
          </div>
          <div className="innerContaineranalysis">
            <h1 className="scoreAnalysis">{`${DbmsUnattemptedAnswer}`}</h1>
            <h2>Not Attempted</h2>
          </div>
          <div className="innerContaineranalysis">
            <h1 className="scoreAnalysis">{`${DbmsCorrectAnswer}/${DbmsTotalAnswer}`}</h1>
            <h2>Total Score</h2>
          </div>
          </div>
        </div>
        <hr class="gray-line"/>
        <div className="cn">
        <h2 className="computernetwork">Object Oriented Programming</h2>
        <div className="outerAnalysisContainer">
          <div className="innerContaineranalysis">
            <h1 className="scoreAnalysis">{`${OopsCorrectAnswer}`}</h1>
            <h2>Right Answers</h2>
          </div>
          <div className="innerContaineranalysis">
            <h1 className="scoreAnalysis">{`${OopsWrongAnswer}`}</h1>
            <h2>Wrong Answers</h2>
          </div>
          <div className="innerContaineranalysis">
            <h1 className="scoreAnalysis">{`${OopsUnattemptedAnswer}`}</h1>
            <h2>Not Attempted</h2>
          </div>
          <div className="innerContaineranalysis">
            <h1 className="scoreAnalysis">{`${OopsCorrectAnswer}/${OopsTotalAnswer}`}</h1>
            <h2>Total Score</h2>
          </div>
          </div>
        </div>
        <hr class="gray-line"/>
        <div className="cn">
        <h2 className="computernetwork">Operating system</h2>
        <div className="outerAnalysisContainer">
          <div className="innerContaineranalysis">
            <h1 className="scoreAnalysis">{`${OsCorrectAnswer}`}</h1>
            <h2>Right Answers</h2>
          </div>
          <div className="innerContaineranalysis">
            <h1 className="scoreAnalysis">{`${OsWrongAnswer}`}</h1>
            <h2>Wrong Answers</h2>
          </div>
          <div className="innerContaineranalysis">
            <h1 className="scoreAnalysis">{`${OsUnattemptedAnswer}`}</h1>
            <h2>Not Attempted</h2>
          </div>
          <div className="innerContaineranalysis">
            <h1 className="scoreAnalysis">{`${OsCorrectAnswer}/${OsTotalAnswer}`}</h1>
            <h2>Total Score</h2>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analyze;
