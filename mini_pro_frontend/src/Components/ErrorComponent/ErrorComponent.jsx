import React, { useEffect } from "react";
import "./ErrorComponent.css";
import errorImage from '../../assets/errorImage.jpg'
import { useNavigate } from "react-router-dom";

function ErrorComponent() {
  const navigate=useNavigate('/landing')
  return (
    <div className='error404container'>
      <img className="errorImage" src={errorImage} alt="" />
      <h1 className="errorh1">Page Not Found!</h1>
      <button onClick={()=>{navigate('/landing')}} className="prevTestError"><span className="spanError"> Go back to home</span></button>
    </div>
  );
}

export default ErrorComponent;
