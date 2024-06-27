
import './App.css';
import { Routes, Route} from "react-router-dom";
import Report from './components/Reports';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/report" element={<Report />} />
      </Routes>
    
    </div>
  );
}

export default App;
