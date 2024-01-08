import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import { createGlobalStyle } from 'styled-components';

function Hub() {
  const location = useLocation();
  const navigate = useNavigate();
  const { username, role } = location.state || { username: 'Usuario', role: 'Invitado' };
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const logout = () => {
    // Lógica para cerrar sesión
    navigate('/login');
  };
  const renderContentBasedOnRole = (role) => {
    switch (role) {
      case 'Doctor':
        return <DoctorView />;
      case 'Recepcionista':
        return <ReceptionistView />;
      case 'Paciente':
        return <PatientView />;
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
      {renderContentBasedOnRole(role)}
    </Container>

  );
}

const DoctorView = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.actionsContainer}>
      <Button variant="primary" style={styles.action} onClick={() => navigate('/completar-cita')}>Completar cita</Button>
      <p style={styles.actionDescription}>Registrar los detalles y resultados de las citas de los pacientes.</p>
    </div>
  );
};

const ReceptionistView = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.actionsContainer}>
      <Button variant="primary" style={styles.action} onClick={() => navigate('/agendar-cita')}>Agendar cita</Button>
      <p style={styles.actionDescription}>Programar nuevas citas para los pacientes.</p>

      <Button variant="primary" style={styles.action} onClick={() => navigate('/cancelar-cita')}>Cancelar cita</Button>
      <p style={styles.actionDescription}>Eliminar citas programadas previamente.</p>

      <Button variant="primary" style={styles.action} onClick={() => navigate('/alta-doctor')}>Alta doctor</Button>
      <p style={styles.actionDescription}>Dar de alta un nuevo doctor.</p>

      <Button variant="primary" style={styles.action} onClick={() => navigate('/baja-doctor')}>Baja doctor</Button>
      <p style={styles.actionDescription}>Dar de baja un doctor.</p>

      {/* Agrega más botones si es necesario */}
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
    </div>
  );
};

// Basic inline styles
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
    alignItems: 'center', // Centra los elementos horizontalmente
  },
  action: {
    // ... estilos existentes para action
    marginBottom: '5px',
    transition: 'transform 0.3s',
  },
  actionDescription: {
    fontSize: '0.9em',
    color: '#666',
    maxWidth: '200px',
    textAlign: 'center', // Centra el texto de descripción
    marginBottom: '20px', // Espacio entre descripción y siguiente botón
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

// Añade :hover a action para el efecto de agrandar
const hoverStyles = `
  .action:hover {
    transform: scale(1.05);
  }
`;
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
  .action:hover {
    transform: scale(1.05);
  }
`;

// Agrega el estilo de hover al componente


export default Hub;
