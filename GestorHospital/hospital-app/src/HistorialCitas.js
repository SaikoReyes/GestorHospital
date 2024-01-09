import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table } from 'react-bootstrap';
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

function HistorialCitasPaciente() {
    const [historialCitas, setHistorialCitas] = useState([]);

    useEffect(() => {
      const idPaciente = sessionStorage.getItem('idPersona'); // Asegúrate de que este es el nombre correcto de la clave en sessionStorage
      const fetchHistorialCitas = async () => {
        try {
          const response = await axios.get('https://dbstapi.azurewebsites.net/Paciente/ObtenerHistorialCitasPaciente', {
            params: { "idPaciente": idPaciente }
          });
          console.log(response.data);
          console.log(idPaciente);
          setHistorialCitas(response.data);
        } catch (error) {
          console.error('Error al obtener el historial de citas:', error);
        }
      };

      fetchHistorialCitas();
    }, []);

    return (
      <PageBackground>
        <TopBar>Historial de Citas</TopBar>
        <Container className="mt-4">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Médico</th>
                <th>Fecha y Hora</th>
                <th>Estado</th>
                <th>Costo</th>
              </tr>
            </thead>
            <tbody>
              {historialCitas.map((cita, index) => (
                <tr key={index}>
                  <td>{cita.Medico}</td>
                  <td>{cita.FechaHora}</td>
                  <td>{cita.Estado}</td>
                  <td>{cita.Costo}</td>
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

export default HistorialCitasPaciente;
