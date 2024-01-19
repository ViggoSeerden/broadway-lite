import './App.css';
import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/login';
import Player from './pages/player';

function App() {
  return (
    <Router basename='/broadway-lite'>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/player" element={<Player />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
