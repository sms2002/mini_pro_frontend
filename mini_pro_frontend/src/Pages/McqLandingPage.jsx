import React,{useEffect, useState} from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Mcq from '../Components/Mcq/Mcq'
import { useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading/Loading';
import { baseUrl } from '../access';
import axios from 'axios';
function McqLandingPage() {
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
        // navigate('/mcq');
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
       <Mcq/>
       </>
  } 
     
    </div>
  )
}

export default McqLandingPage
