import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Prevtest from '../Components/PrevTest/Prevtest';

function PrevTestPage() {
    const location = useLocation();
    const navigate = useNavigate();
  
    const array = location.state && location.state.Array;
  return array? (
    <div>
      <Prevtest/>
    </div>
  ):(<div className="errorMessagePage"><h1>Error 404 page not found :( </h1></div>);//create an error component and then show that here
  
}

export default PrevTestPage
