import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
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

function CrearReceta() {
    const location = useLocation();
  
    const [diagnostico, setDiagnostico] = useState('');
    const [instrucciones, setInstrucciones] = useState('');
    const [medicamentos, setMedicamentos] = useState('');
    const [tratamiento, setTratamiento] = useState('');
    const [idDoctor, setIdDoctor] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [appointmentId, setAppointmentId] = useState('');
    const medicamentosMuestra = ["Paracetamol", "Ibuprofeno", "Amoxicilina"]; 
  
    
    const [idPaciente, setIdPaciente] = useState(location.state ? location.state.idPaciente : '');
  
    useEffect(() => {
      if (location.state && location.state.appointmentId && location.state.idPaciente) {
        setAppointmentId(location.state.appointmentId);
        setIdPaciente(location.state.idPaciente);
        setIdDoctor(sessionStorage.getItem('idPersona'));
        console.log(location.state.appointmentId);
        console.log(location.state.idPaciente);
        console.log(sessionStorage.getItem('idPersona'));
      }
    }, [location]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.get('https://dbstapi.azurewebsites.net/Doctor/InsertarReceta', {
          params: {
            diagnostico,
            instrucciones,
            medicamentos,
            tratamiento,
            idPaciente: parseInt(idPaciente),
            idDoctor: parseInt(idDoctor),
          }
        });
        if(response.data){
            console.log(response.data);
            alert("Receta creada con éxito");
            alert(diagnostico+' '+instrucciones+' '+medicamentos+' '+tratamiento);
        }
        
        
      } catch (error) {
        console.error('Error al enviar la receta:', error);
        alert('Error al enviar la receta');
      }
    };

  return (
    <PageBackground>
      <TopBar>Hospital</TopBar>
    <Container className="mt-5">
      <h1 className="text-center mb-4">Crear Receta Médica</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>ID de la Consulta</Form.Label>
              <Form.Control
                type="text"
                readOnly
                value={appointmentId}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Diagnóstico</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={diagnostico}
                onChange={(e) => setDiagnostico(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Instrucciones</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={instrucciones}
                onChange={(e) => setInstrucciones(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Medicamentos</Form.Label>
                <Form.Control as="select" value={medicamentos} onChange={(e) => setMedicamentos(e.target.value)}>
                  <option value="">Seleccione un medicamento</option>
                  {medicamentosMuestra.map((medicamento, index) => (
                    <option key={index} value={medicamento}>{medicamento}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tratamiento</Form.Label>
                <Form.Control
                  type="text"
                  value={tratamiento}
                  onChange={(e) => setTratamiento(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
        
        <div className="text-center">
          <Button variant="primary" type="submit">Crear Receta</Button>
        </div>
      </Form>
    </Container>
    <BottomBar>
    © {new Date().getFullYear()} Hospital. Todos los derechos reservados.
  </BottomBar>
</PageBackground>
  );
}

export default CrearReceta;
