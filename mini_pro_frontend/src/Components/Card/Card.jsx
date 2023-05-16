import React, { useState } from "react";
import "./Card.css";
import location from "../../assets/location.png";
import cash from "../../assets/cash.png";
function Card(props) {
  const [isHoveredMissing, setIsHoveredMissing] = useState(false);
  const [isHoveredMatching, setIsHoveredMatching] = useState(false);
  const handleHoverMissing = () => {
    setIsHoveredMissing(true);
  };

  const handleLeaveMissing = () => {
    setIsHoveredMissing(false);
  };
  const handleHoverMatching = () => {
    setIsHoveredMatching(true);
  };

  const handleLeaveMatching = () => {
    setIsHoveredMatching(false);
  };
  return (
    
      <div class="card-content">
        <div class="main-data">
          <h3>{props.companyName}</h3>
          <p>{props.title}</p>
          <div className="companySkills">
            {props.companySkills.map((item)=>{
                return(
                    <div className="companyskillContainer">
              <h3 className="skillHeaderCompany">{item}</h3>
            </div>
                )
            })}
            
          </div>
          <div className="locationpay">
            <img src={location} alt="" className="location" />
            <h5 className="locationHeader">{props.location}</h5>
            <img src={cash} alt="" className="money" />
            <h5 className="locationHeader">{props.pay==='#N/A'?'No glassdoor estimate':props.pay}</h5>
          </div>
          
          <div className="buttons">
            <button
              onMouseEnter={handleHoverMissing}
              onMouseLeave={handleLeaveMissing}
              className="buttonCard hoverCard"
            >
              Missing Skills
            </button>
            <button
              onMouseEnter={handleHoverMatching}
              onMouseLeave={handleLeaveMatching}
              className="buttonCard hoverCard matchingbutton"
            >
              Matching Skills
            </button>
            <button onClick={()=>{window.open(props.link,'_blank')}}className="buttonCard">Apply</button>
          </div>
          {isHoveredMissing&&props.missing.length>0&&(
          <div  onMouseEnter={handleHoverMissing}
          onMouseLeave={handleLeaveMissing} className="additional-data">
            <div className="companySkills">
            {props.missing.map((item)=>{
                return(
                    <div className="companyskillContainer">
              <h3 className="skillHeaderCompany">{item}</h3>
            </div>
                )
            })}
            
          </div>
          </div>
            )} 
            {isHoveredMatching&&props.matching.length>0&&(
          <div  onMouseEnter={handleHoverMatching}
          onMouseLeave={handleLeaveMatching} className="additional-data">
            <div className="companySkills">
            {props.matching.map((item)=>{
                return(
                    <div className="companyskillContainer">
              <h3 className="skillHeaderCompany">{item}</h3>
            </div>
                )
            })}
            
          </div>
          </div>
            )}
        </div>

      </div>

  );
}

export default Card;
