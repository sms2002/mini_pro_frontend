import React from 'react'
import './Banner.css'
import study from '../../assets/study.png'
import { useNavigate } from 'react-router-dom'
function Banner() {
    const navigate=useNavigate();
  return (
    <div className='container'>
    <div className="leftDiv">
      <h1 className="bannerHeader">Placement Assist</h1>
      
      <p className="bannerPara">Find your dream job with personalized recommendations <br/> 
      and assess your skills on our platform.
        </p>
        <button className="getStarted"onClick={()=>navigate('/signup')} >Get Started</button>
    </div>
    <div className="rightDiv">
        <button onClick={()=>{navigate('/login')}}className="signIn">Sign in</button>
        <img src={study} alt="study" className="bannerImg" />
        
    </div>
    </div>
  )
}

export default Banner
