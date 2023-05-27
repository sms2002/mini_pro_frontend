import React, { useEffect, useState } from 'react'
import ViewProfile from '../Components/ViewProfile/ViewProfile'
import { useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading/Loading';
import axios from 'axios';
import { baseUrl } from '../access';

function ViewProfilepage() {
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
      <ViewProfile/>
  }
    </div>
  )
}

export default ViewProfilepage
