import './App.css';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/login';
import Player from './pages/player';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/broadway-lite" element={<Login />} />
        <Route exact path="/broadway-lite/player" element={<Player />} />
        <Route path="*" element={<Navigate to="/broadway-lite" />} />
      </Routes>
    </Router>
  );
}

export default App;
