import './App.css';
import {Routes,Route} from 'react-router-dom'
import Homepage from './Pages/Homepage';
import SignupPage from './Pages/SignupPage';
import LoginPage from './Pages/LoginPage';
import Landing from './Pages/LandingPage';
import JobPage from './Pages/JobPage';
import ViewProfilepage from './Pages/ViewProfilepage';
import McqLandingPage from './Pages/McqLandingPage';
import Analysis from './Pages/Analysis';
import TestPage from './Pages/TestPage';
import ErrorBoundary from './ErrorBoundary';
import PrevTestPage from './Pages/PrevTestPage';
import ErrorComponent from './Components/ErrorComponent/ErrorComponent';
import TableuPage from './Pages/TableuPage';

function App() {
  return (
    <ErrorBoundary fallback="Error 404 Page Not Found">
    <div className="App">
      <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/landing' element={<Landing/>}/>
      <Route path='/job' element={<JobPage/>}/>
      <Route path='/viewprofile' element={<ViewProfilepage/>}/>
      <Route path='/mcq' element={<McqLandingPage/>}/>
      <Route path='/analysis' element={<Analysis/>}/>
      <Route path='/test' element={<TestPage/>}/>
      <Route path='/prevtest' element={<PrevTestPage/>}/>
      <Route path='/devsurvey' element={<TableuPage/>}/>
      <Route path="*" element={<ErrorComponent/>} />
     </Routes>
    </div>
    </ErrorBoundary>
  );
}

export default App;
