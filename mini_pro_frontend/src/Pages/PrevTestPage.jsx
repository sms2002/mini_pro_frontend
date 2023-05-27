import React, { useEffect,useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Prevtest from '../Components/PrevTest/Prevtest';
import axios from 'axios';
import { baseUrl } from '../access';

function PrevTestPage() {
    const location = useLocation();
    const navigate = useNavigate();
  
    const array = location.state && location.state.Array;
    const [isLoading, setIsLoading] = useState(true);
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
          navigate('/');//refresh
        });
        }
      }, 500);
      return () => clearTimeout(timer);
    }, []);
  return array? (
    <div>
      <Prevtest/>
    </div>
  ):(<div className="errorMessagePage"><h1>Error 404 page not found :( </h1></div>);//create an error component and then show that here
  
}

export default PrevTestPage
