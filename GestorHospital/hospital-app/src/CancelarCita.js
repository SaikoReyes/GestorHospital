import React, { useState } from 'react';
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
  // Datos ficticios para las citas con la nueva estructura requerida
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: 'Leonardo Ramos',
      doctorName: 'Jennifer Janice Ramos',
      specialty: 'Cardiología',
      dateTime: '2022-07-20 10:00'
    },
    {
      id: 2,
      patientName: 'Daniel Leyva',
      doctorName: 'Jennifer Janice Leyva',
      specialty: 'Neurología',
      dateTime: '2022-07-21 10:00'
    },
    // ... más citas
  ]);

  const handleDelete = (appointmentId) => {
    // Llamada al backend para eliminar la cita, seguido de actualización del estado
    // axios.delete(`/api/appointments/${appointmentId}`).then(() => {
    setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
    // });
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
            <th>Médico</th>
            <th>Especialidad</th>
            <th>Fecha y Hora</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.patientName}</td>
              <td>{appointment.doctorName}</td>
              <td>{appointment.specialty}</td>
              <td>{appointment.dateTime}</td>
              <td>
                <Button variant="warning" onClick={() => handleDelete(appointment.id)}>
                  Eliminar
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
