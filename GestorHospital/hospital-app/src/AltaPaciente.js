import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
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

function AltaPaciente() {
  const [pacienteData, setPacienteData] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    fechaNacimiento: '',
    curp: '',
    nss: '', // Número de Seguridad Social
    telefono: '',
    username: '',
    password: '',

  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPacienteData({
      ...pacienteData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí manejarías la lógica para enviar los datos al backend
    console.log(pacienteData);
  };

  return (
    <PageBackground>
      <TopBar>Hospital</TopBar>
      <Container className="my-5">
        <Row>
          <Col md={12}>
            <h1 className="text-center mb-4">Alta de Paciente</h1>
          </Col>
        </Row>
        <Form onSubmit={handleSubmit}>
          <Row>
            {/* Columna izquierda */}
            <Col md={6}>
              {/* Aquí irían los Form.Group para nombre, apellido paterno, etc. */}
              {/* Ejemplo para el campo de nombre */}
              <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">Nombre</Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="Nombre"
            name="nombre"
            value={pacienteData.nombre}
            onChange={handleInputChange}
            maxLength={50} 
          />
        </Col>
      </Form.Group>

              <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">Apellido Paterno</Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="Apellido Paterno"
            name="apellidoPaterno"
            value={pacienteData.apellidoPaterno}
            onChange={handleInputChange}
            maxLength={50} 
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">Apellido Materno</Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="Apellido Materno"
            name="apellidoMaterno"
            value={pacienteData.apellidoMaterno}
            onChange={handleInputChange}
            maxLength={50} 
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">Fecha de Nacimiento</Form.Label>
        <Col sm="10">
            <Form.Control
            type="date"
            name="fechaNacimiento"
            value={pacienteData.fechaNacimiento}
            onChange={handleInputChange}
            />
        </Col>
        </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">NSS</Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="Número de seguridad social"
            name="nss"
            value={pacienteData.nss}
            onChange={handleInputChange}
            maxLength={11} 
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">CURP</Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="CURP"
            name="curp"
            value={pacienteData.curp}
            onChange={handleInputChange}
            maxLength={11} 
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>Teléfono</Form.Label>
        <Col sm={10}>
            <Form.Control
            type="tel"
            name="telefono"
            value={pacienteData.telefono}
            onChange={handleInputChange}
            placeholder="Ingrese el número de teléfono"
            maxLength={15} 
            />
        </Col>
    </Form.Group>

              
              {/* Repite para otros campos en la columna izquierda */}
            </Col>

            {/* Columna derecha */}
            <Col md={6}>
              {/* Ejemplo para el campo de especialidad */}

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">Usuario</Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="Usuario"
            name="usuario"
            value={pacienteData.usuario}
            onChange={handleInputChange}
            maxLength={50} 
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">Contraseña</Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="Contraseña"
            name="contraseña"
            value={pacienteData.contraseña}
            onChange={handleInputChange}
            maxLength={255} 
          />
        </Col>
      </Form.Group>
              {/* Repite para otros campos en la columna derecha */}
            </Col>
          </Row>
          {/* ... más filas y columnas según sea necesario ... */}
          <Row>
            <Col md={12} className="text-center">
              <Button variant="primary" type="submit">Registrar Paciente</Button>
            </Col>
          </Row>
        </Form>
      </Container>
      <BottomBar>
        © {new Date().getFullYear()} Hospital. Todos los derechos reservados.
      </BottomBar>
    </PageBackground>
  );
}

export default AltaPaciente;