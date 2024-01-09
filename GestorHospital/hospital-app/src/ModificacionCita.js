import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import { Container, Table, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import styled from 'styled-components';

// ... tus estilos
const PageBackground = styled.div`
  background-color: #f0f8ff;
  min-height: 100vh;
`;

const TopBar = styled.div`
  background-color: #007bff;
  color: white;
  padding: 10px 0;
  text-align: center;
`;

const BottomBar = styled.footer`
  background-color: #007bff;
  color: white;
  padding: 10px 0;
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
`;

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const navigate = useNavigate(); // Inicializar useNavigate

  useEffect(() => {
    const fetchAppointments = async () => {
      const userId = sessionStorage.getItem('userId');
      if (userId) {
        try {
          const response = await axios.get('https://dbstapi.azurewebsites.net/Paciente/ObtenerCitasPaciente', {
            params: { idPaciente: userId }
          });
          setAppointments(response.data);
        } catch (error) {
          console.error('Error al obtener citas:', error);
        }
      }
    };

    fetchAppointments();
  }, []);

  const handleModify = (appointmentId) => {
    // Encontrar la cita completa basada en el appointmentId
    const selectedAppointment = appointments.find(appointment => appointment.idCita === appointmentId);
  
    if (selectedAppointment) {
      navigate('/cambiar', { state: { selectedAppointment } });
    } else {
      console.error('Cita no encontrada');
      // Opcional: manejar el caso en que no se encuentre la cita
    }
  };

  return (
    <PageBackground>
      <TopBar>Hospital</TopBar>
      <Container>
        <h1 className="text-center my-4">Citas Programadas</h1>
        {showAlert && <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>{alertMsg}</Alert>}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Médico</th>
              <th>Fecha y Hora</th>
              <th>Estado</th>
              <th>Costo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.idCita}>
                <td>{appointment.nombreDoctor}</td>
                <td>{`${new Date(appointment.fecha).toLocaleDateString()} ${appointment.hora}`}</td>
                <td>{appointment.estado}</td>
                <td>${appointment.costo}</td>
                <td>
                  <Button variant="primary" onClick={() => handleModify(appointment.idCita)}>
                    Modificar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <BottomBar>
          © {new Date().getFullYear()} Hospital. Todos los derechos reservados.
      </BottomBar>
    </PageBackground>
  );
}

export default AppointmentList;
