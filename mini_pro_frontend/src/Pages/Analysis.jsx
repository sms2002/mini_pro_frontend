import React from 'react'
import Analyze from '../Components/Analyze/Analyze'
import { useLocation } from 'react-router-dom'

function Analysis() {
    const location=useLocation()
  return (
    <div>
      <Analyze id={location.state.id}/>
    </div>
  )
}

export default Analysis
