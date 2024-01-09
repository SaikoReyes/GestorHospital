import React, { useState } from 'react';
import { Container, Table, Button, Form, InputGroup, Alert } from 'react-bootstrap';
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
function PatientList() {
    const [patients, setPatients] = useState([]);
    const [patientId, setPatientId] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

const handleDeletePatient = async (patientId) => {
    try {
      const response = await axios.get('https://dbstapi.azurewebsites.net/Bajas/DarDeBajaPaciente', {
        params: {"idPaciente": patientId}
      });
      console.log(response.data);
      console.log(patientId);
      if(response.data){
        alert(response.data);
        window.location.reload();
      }


      
      
    } catch (error) {
      console.error('Error al dar de baja al paciente:', error);
      alert('Error al intentar dar de baja al paciente.');

    }
  };

  return (
    <PageBackground>
      <TopBar>Hospital</TopBar>
      <Container>
        <InputGroup className="mb-3">
          <Form.Control
            type="number"
            placeholder="Ingrese ID del paciente"
            value={patientId} onChange={(e) => setPatientId(e.target.value)}
            />
            
          </InputGroup>
  
          {showAlert && (
            <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
              {alertMessage}
            </Alert>
          )}
  
          <Button variant="danger" onClick={() => handleDeletePatient(patientId)}>
            Dar de Baja Paciente
          </Button>
        </Container>
        <BottomBar>
          © {new Date().getFullYear()} Hospital. Todos los derechos reservados.
        </BottomBar>
      </PageBackground>
    );
  
          }
  export default PatientList;