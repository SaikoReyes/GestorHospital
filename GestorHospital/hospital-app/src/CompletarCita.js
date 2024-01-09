import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import styled from 'styled-components';

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
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
  
    useEffect(() => {
      const fetchAppointments = async () => {
        const idDoctor = sessionStorage.getItem('idPersona'); // Asegúrate de que el ID del doctor esté guardado en sessionStorage
        const fecha = new Date().toISOString().split('T')[0];
        try {
          const response = await axios.get('https://dbstapi.azurewebsites.net/Paciente/ObtenerCitasDoctorPorDia', {
            params: {
              idDoctor: idDoctor,
              fecha: fecha
            }
          });
          
          if (response.data) {
            // Asumiendo que la respuesta es un array de citas como se muestra en la imagen
            setAppointments(response.data.map(cita => ({
              id: cita.idCita,
              patientName: cita.nombrePaciente,
              dateTime: cita.hora,
              idPaciente: cita.idPaciente
            })));
          }
        } catch (error) {
          console.error('Error al obtener las citas:', error);
        }
      };
  
      fetchAppointments();
    }, []);
  
    const handleCreatePrescription = (appointmentId, idPaciente) => {
        console.log('Crear receta para la cita con id:', appointmentId, idPaciente);
        navigate('/crear-receta', { state: { appointmentId, idPaciente }}); // Pasando idPaciente también
      };
  return (
    <PageBackground>
      <TopBar>Hospital</TopBar>
    <Container>
      <h1 className="text-center my-4">Citas Programadas</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Fecha y Hora</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
        {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.patientName}</td>
              <td>{appointment.dateTime}</td>
              <td>
                <Button 
                  variant="success" 
                  onClick={() => handleCreatePrescription(appointment.id, appointment.idPaciente)}>
                  Crear receta
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
