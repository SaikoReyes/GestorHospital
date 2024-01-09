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

function RecetasMedico() {
    const [recetas, setRecetas] = useState([]);

    useEffect(() => {
      const idDoctor = sessionStorage.getItem('idPersona'); 
      const fetchRecetas = async () => {
        try {
          const response = await axios.get('https://dbstapi.azurewebsites.net/Doctor/ObtenerRecetasPorIdDoctor', {
            params: { "idDoctor": idDoctor }
          });
          setRecetas(response.data);
        } catch (error) {
          console.error('Error al obtener las recetas:', error);
        }
      };

      fetchRecetas();
    }, []);

    return (
      <PageBackground>
        <TopBar>Recetas Médicas</TopBar>
        <Container className="mt-4">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Diagnóstico</th>
                <th>Fecha</th>
                <th>Medicamentos</th>
                <th>Tratamiento</th>
                <th>Nombre del Doctor</th>
                <th>Nombre del Paciente</th>
              </tr>
            </thead>
            <tbody>
              {recetas.length > 0 ? (
                recetas.map((receta, index) => (
                  <tr key={index}>
                    <td>{receta.diagnostico}</td>
                    <td>{receta.fecha}</td>
                    <td>{receta.medicamentos}</td>
                    <td>{receta.tratamiento}</td>
                    <td>{receta.nombreMedico}</td>
                    <td>{receta.nombrePaciente}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">No hay recetas disponibles</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Container>
        <BottomBar>
            © {new Date().getFullYear()} Hospital. Todos los derechos reservados.
        </BottomBar>
      </PageBackground>
    );
}

export default RecetasMedico;
