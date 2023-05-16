import React, { useEffect } from 'react'
import './Landing.css'
import job from '../../assets/job.png'
import test from '../../assets/test.png'
import{ useNavigate }from 'react-router-dom'
function Landing() {

  const navigate=useNavigate()
  return (
    <div className='landingContainer'>
      <div><h1 className='landingHeader'>WELCOME TO<br/><span style={{color:'#394867'}}>PLACEMENT ASSIST</span></h1></div>
      <div className="landingBody">
        <div onClick={()=>{navigate('/job')}}className="firstBox landingBox">
            <img className="jobImage" src={job} alt="" />
            <h1 className='jobTitle'>Jobs Placed</h1>
        </div>
        <div onClick={()=>{navigate('/mcq')}} className="secondBox landingBox">
        <img className="jobImage" src={test} alt="" />
            <h1 className='jobTitle'>MCQ Test</h1>
        </div>
      </div>
    </div>
  )
}

export default Landing
