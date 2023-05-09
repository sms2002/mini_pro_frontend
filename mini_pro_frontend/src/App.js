import './App.css';
import {Routes,Route} from 'react-router-dom'
import Homepage from './Pages/Homepage';
import SignupPage from './Pages/SignupPage';
function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
     </Routes>
    </div>
  );
}

export default App;
