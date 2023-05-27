import React, { useEffect, useState } from 'react'
import Landing from '../Components/Landing/Landing'
import Navbar from '../Components/Navbar/Navbar'
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading/Loading';
import { access_token, baseUrl } from '../access';
import axios from 'axios';
function LandingPage() {
  //!localStorage.getItem("userAccess")||localStorage.getItem("userAccess")===''
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
        navigate('/landing');
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
      <Landing/>
      </>
  } 
    </div>
  )
}

export default LandingPage
