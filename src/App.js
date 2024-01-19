import './App.css';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/login';
import Player from './pages/player';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    const hash = window.location.hash
      .substring(1)
      .split("&")
      .reduce(function (initial, item) {
        if (item) {
          var parts = item.split("=");
          initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
      }, {});
    let _token = hash.access_token
    if (_token) {
      window.location.pathname = `/broadway-lite/`
      window.location.hash = `#/player#access_token=${_token}`;
    }
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/player" element={<Player />} />
      </Routes>
    </Router>
  );
}

export default App;
