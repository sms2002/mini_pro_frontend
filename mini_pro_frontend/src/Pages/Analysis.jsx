import React, { useEffect, useState } from 'react'
import Analyze from '../Components/Analyze/Analyze'
import { useLocation, useNavigate } from 'react-router-dom'
import { baseUrl } from '../access';
import axios from 'axios';
import ErrorComponent from '../Components/ErrorComponent/ErrorComponent';

function Analysis() {
    const location=useLocation()
    const id = location.state && location.state.id;
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
 
  return id? (
    <div>
      <Analyze id={location.state.id}/>
    </div>
  ):(<div className="errorMessagePage"><h1><ErrorComponent/></h1></div>);
 
}

export default Analysis
