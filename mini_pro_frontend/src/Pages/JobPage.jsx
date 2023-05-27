import React, { useState,useEffect } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Job from '../Components/Job/Job'
import Card from '../Components/Card/Card'
import '../styles.css'
import { useNavigate } from 'react-router-dom'
import Loading from '../Components/Loading/Loading'
import axios from 'axios'
import { baseUrl } from '../access'

function JobPage() {
  
  const [isLoading, setIsLoading] = useState(true);
  const navigate=useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (!localStorage.getItem("userAccess")||localStorage.getItem("userAccess")==='') {
        navigate('/');//refresh
      }
      else
      {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userAccess')}`,
          },
        };
        axios
      .get(`${baseUrl}/api/auth/verify/`, config)
      .then((response) => {
        console.log(response.status)
      })
      .catch((error) => {
        navigate('/')//refresh
      });
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
