import React, { useEffect, useState } from 'react'
import ViewProfile from '../Components/ViewProfile/ViewProfile'
import { useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading/Loading';

function ViewProfilepage() {
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
      <ViewProfile/>
  }
    </div>
  )
}

export default ViewProfilepage
