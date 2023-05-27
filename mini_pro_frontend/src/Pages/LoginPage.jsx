import React, { useEffect,useState } from 'react'
import Login from '../Components/Login/Login'
import { useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading/Loading';
import axios from 'axios';
import { access_token, baseUrl } from '../access';

function LoginPage() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate=useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (localStorage.getItem('userAccess')) {
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
        console.log(error);
      });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
      {isLoading ? (
        <Loading/> 
      ) : (
        <Login /> 
      )}
    </div>
  )
}

export default LoginPage
