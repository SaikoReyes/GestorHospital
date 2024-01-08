import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import SuccessfulLogin from './SuccessfulLogin';
import Hub from './Hub';
import AgendarCita from './AgendarCita';
import CancelarCita from './CancelarCita';
import CompletarCita from './CompletarCita';
import AltaDoctor from './AltaDoctor';
import BajaDoctor from './BajaDoctor';
import AltaPaciente from './AltaPaciente';
import CrearReceta from './CrearReceta';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/hub" element={<Hub />} />
        <Route path="/agendar-cita" element={<AgendarCita />} />
        <Route path="/successfullogin" element={<SuccessfulLogin />} />
        <Route path="/cancelar-cita" element={<CancelarCita />} />
        <Route path="/completar-cita" element={<CompletarCita />} />
        <Route path="/alta-doctor" element={<AltaDoctor />} />
        <Route path="/baja-doctor" element={<BajaDoctor />} />
        <Route path="/registro" element={<AltaPaciente />} />
        <Route path="/crear-receta" element={<CrearReceta />} />
      </Routes>
    </Router>
  );
}

export default App;
