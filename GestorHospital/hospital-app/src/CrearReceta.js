import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
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
  const [appointmentId, setAppointmentId] = useState('');
  const [diagnostico, setDiagnostico] = useState('');
  const [instrucciones, setInstrucciones] = useState('');

  useEffect(() => {
    // Suponiendo que el ID de la consulta se pasa a través de los props de location.state
    if (location.state && location.state.appointmentId) {
      setAppointmentId(location.state.appointmentId);
      console.log(location.state.appointmentId);
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí lógica para enviar los datos al backend
    console.log({
      appointmentId,
      diagnostico,
      instrucciones
    });
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
