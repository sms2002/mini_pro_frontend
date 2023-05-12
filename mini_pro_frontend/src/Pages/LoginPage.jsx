import React, { useEffect,useState } from 'react'
import Login from '../Components/Login/Login'
import { useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading/Loading';

function LoginPage() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate=useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (localStorage.getItem('userAccess')) {
        navigate('/landing');
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
