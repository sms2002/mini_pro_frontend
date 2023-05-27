import React from 'react'
import Analyze from '../Components/Analyze/Analyze'
import { useLocation } from 'react-router-dom'

function Analysis() {
    const location=useLocation()
    const id = location.state && location.state.id;

 
  return id? (
    <div>
      <Analyze id={location.state.id}/>
    </div>
  ):(<div className="errorMessagePage"><h1>Error 404 page not found :( </h1></div>);
}

export default Analysis
