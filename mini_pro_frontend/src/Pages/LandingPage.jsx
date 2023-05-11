import React, { useEffect, useState } from 'react'
import Landing from '../Components/Landing/Landing'
import Navbar from '../Components/Navbar/Navbar'
import { useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading/Loading';
function LandingPage() {
  //!localStorage.getItem("userAccess")||localStorage.getItem("userAccess")===''
  const [isLoading, setIsLoading] = useState(true);
  const navigate=useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (!localStorage.getItem("userAccess")||localStorage.getItem("userAccess")==='') {
        navigate('/');
      }
    }, 1000);
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
