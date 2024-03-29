import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { createGlobalStyle } from 'styled-components';

function Hub() {
  const location = useLocation();
  const navigate = useNavigate();
  const [rolId, setRolId] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const idRol = location.state?.idRol;
    if (idRol) {
      setRolId(idRol); 
    } else {
      console.error('No role ID provided');
    }
  
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    
    return () => clearInterval(timer);
  }, [location.state, navigate]);

  const logout = () => {

    navigate('/');
  };
  const renderContentBasedOnRole = (rolId) => {
    switch (rolId) {
      case 1:
        return <PatientView />;
      case 2:
        return <ReceptionistView />;
      case 3:
          return <DoctorView />;
      default:
        return <p>No hay un rol definido</p>;
    }
  };
  return (
    <Container fluid style={{ backgroundColor: '#f0f8ff', height: '100vh' }}>
      <GlobalStyle />
      <div style={styles.navbar}>
        <h1 style={styles.hospitalName}>Hospital</h1>
        <div style={styles.navbarRight}>
          <span style={styles.time}>{currentTime}</span>
          <Button variant="danger" onClick={logout}>Cerrar Sesión</Button>
        </div>
      </div>
      <div style={styles.footer}>
      <p style={styles.footerText}>© {new Date().getFullYear()} Hospital. Todos los derechos reservados.</p>
    </div>
      <center>
      <h1>Bienvenid@ de nuevo</h1>
      <h1><p>Selecciona una opción de la lista: </p></h1></center>
      {renderContentBasedOnRole(rolId)}
    </Container>

  );
}

const DoctorView = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.actionsContainer}>
      <Button variant="primary" style={styles.action} onClick={() => navigate('/completar-cita')}>Completar cita</Button>
      <p style={styles.actionDescription}>Registrar los detalles y resultados de las citas de los pacientes.</p>

      <Button variant="primary" style={styles.action} onClick={() => navigate('/consultar-recetas')}>Consultar Recetas</Button>
      <p style={styles.actionDescription}>Consultar las recetas de los pacientes.</p>
    </div>

    
  );
};

const ReceptionistView = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.actionsContainer}>
     <Row>
    
    <Col>
      <Button variant="primary" style={styles.action} onClick={() => navigate('/rec-agendar-cita')}>Agendar cita a paciente</Button>
      <p style={styles.actionDescription}>Programar nuevas citas para los pacientes.</p>

      <Button variant="primary" style={styles.action} onClick={() => navigate('/cancelar-cita')}>Cancelar cita</Button>
      <p style={styles.actionDescription}>Eliminar citas programadas previamente.</p>

      <Button variant="primary" style={styles.action} onClick={() => navigate('/pagar-cita')}>Pagar cita</Button>
      <p style={styles.actionDescription}>Pagar una cita ya programada.</p>
    </Col>

    
    <Col>
      <Button variant="primary" style={styles.action} onClick={() => navigate('/alta-doctor')}>Alta doctor</Button>
      <p style={styles.actionDescription}>Dar de alta un nuevo doctor.</p>

      <Button variant="primary" style={styles.action} onClick={() => navigate('/baja-doctor')}>Baja doctor</Button>
      <p style={styles.actionDescription}>Dar de baja un doctor.</p>

      <Button variant="primary" style={styles.action} onClick={() => navigate('/baja-paciente')}>Baja Paciente</Button>
      <p style={styles.actionDescription}>Dar de baja un Paciente.</p>

      
    </Col>
  </Row>
    </div>
  );
};

const PatientView = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.actionsContainer}>
      <Button variant="primary" style={styles.action} onClick={() => navigate('/agendar-cita')}>Agendar cita</Button>
      <p style={styles.actionDescription}>Reservar una cita para consulta médica.</p>

      <Button variant="primary" style={styles.action} onClick={() => navigate('/cancelar-cita')}>Cancelar cita</Button>
      <p style={styles.actionDescription}>Cancelar una cita ya programada.</p>

      <Button variant="primary" style={styles.action} onClick={() => navigate('/historial-citas')}>Historial de citas</Button>
      <p style={styles.actionDescription}>Observar el historial de Citas.</p>

      <Button variant="primary" style={styles.action} onClick={() => navigate('/modificacion-citas')}>Modificacion Cita</Button>
      <p style={styles.actionDescription}>Modificar una Cita.</p>

      
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  actionsContainer: {
    marginTop: '30px',
  },
  action: {
    display: 'inline-block',
    margin: '10px',
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
  },
  hospitalName: {
    fontWeight: 'bold',
    color: 'white',
    textDecoration: 'none',
  },
  navbarRight: {
    display: 'flex',
    alignItems: 'center',
  },
  time: {
    marginRight: '20px',
  },
  logoutButton: {
    backgroundColor: 'red',
    borderColor: 'red',
  },
  actionsContainer: {
    marginTop: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  action: {
    marginBottom: '5px',
    transition: 'transform 0.3s',
  },
  actionDescription: {
    fontSize: '0.9em',
    color: '#666',
    maxWidth: '200px',
    textAlign: 'center', 
    marginBottom: '20px', 
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px',
    textAlign: 'center'
  },
  footerText: {
    fontSize: '0.8em',
    margin: 0
  }


};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
  .action:hover {
    transform: scale(1.05);
  }
`;

export default Hub;
