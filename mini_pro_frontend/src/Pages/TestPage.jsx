import React, { useEffect, useState } from "react";
import Test from "../Components/TestMcq/Test";
import { useLocation, useNavigate } from "react-router-dom";

function TestPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const array = location.state && location.state.Array;

  return array?(
    <div>
      <Test />
    </div>
  ):(<div className="errorMessagePage"><h1>Error 404 page not found :( </h1></div>);//create an error component and then show that here
}

export default TestPage;
