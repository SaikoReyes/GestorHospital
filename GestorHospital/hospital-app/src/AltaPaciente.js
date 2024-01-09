import React, { useState, navigate } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import styled from 'styled-components'; 
import axios from 'axios';

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
    nss: '', 
    telefono: '',
    NombreUsuario: '',
    password: '',
    historiaMedica: ''

  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPacienteData({
      ...pacienteData,
      [name]: value
    });
  };
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formattedDate = formatDate(pacienteData.fechaNacimiento);
    try {
      const response = await axios.get(`https://dbstapi.azurewebsites.net/Registro/RegistrarNuevoPaciente`,{
      params: {
        curp: pacienteData.curp,
        nombre: pacienteData.nombre,
        apellidoPat: pacienteData.apellidoPaterno,
        apellidoMat: pacienteData.apellidoMaterno,
        fechaNac: formattedDate,
        nss: pacienteData.nss,
        telefono: pacienteData.telefono,
        historiaMedica: pacienteData.historiaMedica,
        nombreUsuario: pacienteData.NombreUsuario,
        password: pacienteData.password
      }
    });
      if (response.data) {
        
        console.log(response.data);
        alert('Paciente registrado con éxito.');
      }
    } catch (error) {
      console.error('Error al registrar paciente:', error.response || error);
      alert('Fallo al registrar paciente: ' + (error.response ? error.response.data.message : error.message));
    }
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
           
            <Col md={6}>
              
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
            maxLength={18} 
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

    <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">Historia Medica</Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="Historia Medica"
            name="historiaMedica" 
            value={pacienteData.historiaMedica}
            onChange={handleInputChange}
            maxLength={50} 
          />
        </Col>
      </Form.Group>

              
             
            </Col>

            
            <Col md={6}>
              

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">Usuario</Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="Usuario"
            name="NombreUsuario"
            value={pacienteData.NombreUsuario}
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
            name="password"
            value={pacienteData.password}
            onChange={handleInputChange}
            maxLength={255} 
          />
        </Col>
      </Form.Group>

          <Row>
            <Col md={12} className="text-center">
              <Button variant="primary" type="submit" >Registrar Paciente</Button>
            </Col>
          </Row>
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