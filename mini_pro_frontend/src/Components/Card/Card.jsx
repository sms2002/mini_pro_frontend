import React, { useState } from "react";
import "./Card.css";
import location from "../../assets/location.png";
import cash from "../../assets/cash.png";
function Card(props) {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
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
            <h5 className="locationHeader">{props.pay}</h5>
          </div>
          
          <div className="buttons">
            <button
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
              className="buttonCard hoverCard"
            >
              Missing Skills
            </button>
            <button onClick={()=>{window.open(props.link,'_blank')}}className="buttonCard">Apply</button>
          </div>
        </div>
        {isHovered&&props.missing&&(
          <div className="additional-data">
            <p>{props.missing}</p>
          </div>
            )}
        {/* <div className="additional-data">
        <p>python,sql,django</p>
      </div> */}
      </div>

  );
}

export default Card;
