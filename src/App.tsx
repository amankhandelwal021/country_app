import './App.css';
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import Details from './pages/Details';


function App() {
  return (
    <div className="App transition-colors duration-500 ease-in-out">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/:country" element={ <Details/> } />
      </Routes>
    </div>
  );
}

export default App;
