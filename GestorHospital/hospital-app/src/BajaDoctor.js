import React, { useState, useEffect } from 'react';
import { Container, Table, Col, Form, Button } from 'react-bootstrap';
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

function DoctorList() {
    const [specialties, setSpecialties] = useState([]); // Datos muestra para especialidades
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    const [doctors, setDoctors] = useState([]); // Datos muestra para doctores
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [doctorId, setDoctorId] = useState('');

    useEffect(() => {
        
        const fetchSpecialties = async () => {
          try {
            const response = await axios.get('https://dbstapi.azurewebsites.net/Doctor/ObtenerEspecialidades');
            console.log(response.data);
            setSpecialties(response.data);
          } catch (error) {
            console.error('Error al obtener especialidades:', error);
          }
        };
    
        fetchSpecialties();
      }, []);

      const handleSpecialtyChange = async (event) => {
        const specialtyId = event.target.value;
        setSelectedSpecialty(specialtyId);
        try {
          const response = await axios.get(`https://dbstapi.azurewebsites.net/Doctor/ObtenerDoctoresPorEspecialidad`, {
            params: { idEspecialidad: specialtyId }
          });
          console.log(response.data);
          setDoctors(response.data);
        } catch (error) {
          console.error('Error al obtener doctores:', error);
        }
      };



  const handleDeleteDoctor = async (doctorId) => {
    try {
        
        // Realizar la solicitud al servidor
        const response = await axios.get('https://dbstapi.azurewebsites.net/Bajas/DarDeBajaDoctor', {
           params: {"idDoctor": doctorId}
        });
        console.log(doctorId);
        console.log(response.data);
        if(response.data){
        // Mostrar el mensaje de respuesta en un alert
        alert(response.data);
        window.location.reload();
        }

        // Actualizar la lista de doctores (opcional, dependiendo de cómo manejes el estado)
        // Por ejemplo, podrías volver a llamar a la función que carga los doctores aquí.
    } catch (error) {
        console.error('Error al eliminar al doctor:', error);
        alert('Error al intentar eliminar al doctor.');
    }
  };

  return (
    <PageBackground>
      <TopBar>Hospital</TopBar>
    <Container>
      <h1 className="text-center my-4">Buscar Doctor</h1>

      {/* Formulario para buscar doctor */}
      <Form.Group controlId="specialtySelect">
          <Form.Label>Especialidad</Form.Label>
          <Form.Control as="select" value={selectedSpecialty} onChange={handleSpecialtyChange}>
            <option value="">Seleccione una especialidad</option>
            {specialties.map(specialty => (
              <option key={specialty.idEspecialidad} value={specialty.idEspecialidad}>
                {specialty.nombre}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

      {/* Tabla con los datos del doctor */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.idDoctor}>
              <td>{doctor.nombre}</td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteDoctor(doctor.idDoctor)}>
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

export default DoctorList;
