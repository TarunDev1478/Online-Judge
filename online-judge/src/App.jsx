import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login.jsx';
import EnhancedTable from './components/ProblemList';
import Problem from './components/Problem';
import AddProblem from './components/AddProblem';
import Dashboard from './components/UserDash';
import Signup from './components/Signup';
import Explore from './components/Explore';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path='/signup' element={<Signup/>}/>
          <Route path="/Problem" element={<EnhancedTable />} /> 
          <Route path="/Problem/:id" element={<Problem />} />
          <Route path="/addProblem" element={<AddProblem />}/>
          <Route path='/profile' element={<Dashboard/>}/>
          <Route path='/' element={<Explore/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
