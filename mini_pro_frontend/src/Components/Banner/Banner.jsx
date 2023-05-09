import React from 'react'
import './Banner.css'
import study from '../../assets/study.png'
import { useNavigate } from 'react-router-dom'
function Banner() {
    const navigate=useNavigate();
  return (
    <div className='container'>
    <div className="leftDiv">
      <h1 className="bannerHeader">LOREM IPSUM DOLOR <br/>SIT AMET</h1>
      <p className="bannerPara">Suspendisse vel ultricies felis.<br/> 
      Donec molestie accumsan aliquet. Duis porta sodales pretium
        </p>
        <button className="getStarted"onClick={()=>navigate('/signup')} >Get Started</button>
    </div>
    <div className="rightDiv">
        <button className="signIn">SignIn</button>
        <img src={study} alt="study" className="bannerImg" />
        
    </div>
    </div>
  )
}

export default Banner
