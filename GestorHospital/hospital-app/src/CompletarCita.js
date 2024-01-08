import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button } from 'react-bootstrap';
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
  // Datos ficticios para las citas con la estructura requerida
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: 'Leonardo Ramos',
      dateTime: '2022-07-20 10:00'
    },
    {
      id: 2,
      patientName: 'Daniel Leyva',
      dateTime: '2022-07-21 10:00'
    },
    // ... más citas
  ]);

  const handleCreatePrescription = (appointmentId) => {
    
    // Aquí puedes añadir la lógica para manejar la creación de una receta,
    // posiblemente navegando a una nueva ruta o mostrando un modal
    
    console.log('Crear receta para la cita con id:', appointmentId);
    navigate('/crear-receta', { state: { appointmentId }});
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
                <Button variant="success" onClick={() => handleCreatePrescription(appointment.id)}>
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
