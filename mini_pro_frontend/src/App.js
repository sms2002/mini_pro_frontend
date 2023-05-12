import './App.css';
import {Routes,Route} from 'react-router-dom'
import Homepage from './Pages/Homepage';
import SignupPage from './Pages/SignupPage';
import LoginPage from './Pages/LoginPage';
import Landing from './Pages/LandingPage';
import JobPage from './Pages/JobPage';
function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/landing' element={<Landing/>}/>
      <Route path='/job' element={<JobPage/>}/>
     </Routes>
    </div>
  );
}

export default App;
