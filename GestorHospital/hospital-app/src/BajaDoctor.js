import React, { useState } from 'react';
import { Container, Table, Button, Form, InputGroup } from 'react-bootstrap';
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
  const [doctors, setDoctors] = useState([]); // Inicialmente la lista de doctores está vacía
  const [curp, setCurp] = useState(''); // Estado para almacenar el CURP ingresado

  const handleSearch = () => {
    // Aquí puedes añadir la lógica para buscar al doctor por CURP
    // Por ejemplo, realizar una petición al backend y actualizar el estado 'doctors'
    console.log('Buscar doctor con CURP:', curp);
  };

  const handleDeleteDoctor = (doctorId) => {
    // Lógica para eliminar al doctor
    console.log('Eliminar doctor con id:', doctorId);
  };

  return (
    <PageBackground>
      <TopBar>Hospital</TopBar>
    <Container>
      <h1 className="text-center my-4">Buscar Doctor</h1>

      {/* Formulario para buscar doctor */}
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Ingrese CURP del doctor"
          value={curp}
          onChange={(e) => setCurp(e.target.value)}
        />
        <Button variant="outline-secondary" onClick={handleSearch}>
          Buscar
        </Button>
      </InputGroup>

      {/* Tabla con los datos del doctor */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Especialidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.name}</td>
              <td>{doctor.specialty}</td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteDoctor(doctor.id)}>
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
