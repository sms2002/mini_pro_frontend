import React, { useState,useEffect } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Job from '../Components/Job/Job'
import Card from '../Components/Card/Card'
import '../styles.css'
import { useNavigate } from 'react-router-dom'
import Loading from '../Components/Loading/Loading'

function JobPage() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate=useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (!localStorage.getItem("userAccess")||localStorage.getItem("userAccess")==='') {
        navigate('/');
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
      {isLoading?<Loading/>:
      <>
      <Navbar/>
      <Job/>  
      </>
}
    </div>
  )
}

export default JobPage
