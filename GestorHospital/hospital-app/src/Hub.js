import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function Hub() {
  const location = useLocation();
  const {username, role} = location.state;

  const renderContentBasedOnRole = (role) => {
    switch (role) {
      case 'Doctor':
        return <DoctorView />;
      case 'Recepcionista':
        return <ReceptionistView />;
      case 'Admin':
        return <AdminView />;
      case 'Paciente':
        return <PatientView />;
      default:
        return <p>No valid role found</p>;
    }
  };
  return (
    <div style={styles.container}>
      <h1>Welcome, {username}!</h1>
      {renderContentBasedOnRole(role)}
    </div>
  );
}


const DoctorView = () => {
  return (
    <div style={styles.container}>
      <div style={styles.actionsContainer}>
        <Link to="/agendar-cita" style={styles.action}>Schedule Appointment</Link>
        
      </div>
    </div>
  );
};
const ReceptionistView = () => {
  return (
    <div style={styles.container}>
      <div style={styles.actionsContainer}>
        <Link to="/agendar-cita" style={styles.action}>Schedule Appointment</Link>
        
      </div>
    </div>
  );
};
const AdminView = () => {
  return (
    <div style={styles.container}>
      <div style={styles.actionsContainer}>
        <Link to="/agendar-cita" style={styles.action}>Schedule Appointment</Link>
        <Link to="/cancel-appointment" style={styles.action}>Cancel Appointment</Link>
        <Link to="/register-doctor" style={styles.action}>Register Doctor</Link>
        <Link to="/unsubscribe-user" style={styles.action}>Unsubscribe User</Link>
      </div>
    </div>
  );
};
const PatientView = () => {
  return (
    <div style={styles.container}>
      <div style={styles.actionsContainer}>
        <Link to="/agendar-cita" style={styles.action}>Schedule Appointment</Link>
        <Link to="/cancel-appointment" style={styles.action}>Cancel Appointment</Link>
        
      </div>
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
  }
};

export default Hub;
