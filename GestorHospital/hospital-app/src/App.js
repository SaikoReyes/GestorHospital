import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import SuccessfulLogin from './SuccessfulLogin';
import Hub from './Hub';
import AgendarCita from './AgendarCita';
import React from 'react';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/hub" element={<Hub />} />
        <Route path="/agendar-cita" element={<AgendarCita />} />
        <Route path="/successfullogin" element={<SuccessfulLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
