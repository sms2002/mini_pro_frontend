import React, { useEffect,useState } from 'react'
import Signup from '../Components/Signup/Signup'
import { useNavigate } from 'react-router-dom'
import Loading from '../Components/Loading/Loading';

function SignupPage() {
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
        <Signup /> 
      )}
    </div>
  );
}

export default SignupPage
