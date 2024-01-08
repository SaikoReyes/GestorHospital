import React, { useState, useEffect } from 'react';
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

function ScheduleAppointment() {
    const [patientInfo, setPatientInfo] = useState({
        name: '',
        birthDate: '',
        address: '',
        email: ''
    });
    
    const [patientId, setPatientId] = useState(null);
    const [specialties, setSpecialties] = useState([]); // Datos muestra para especialidades
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    const [doctors, setDoctors] = useState([]); // Datos muestra para doctores
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [availableTimes, setAvailableTimes] = useState([]);
    const [cost, setPrice] = useState('');
    
    useEffect(() => {
      // Recuperar ID del paciente de sessionStorage y obtener sus datos
      const savedPatientId = sessionStorage.getItem('patientId');
      setPatientId(savedPatientId);

      // Simular la obtención de datos del paciente
      // En un caso real, aquí harías una petición al backend
      setPrice({
        price: 100
      });
      setPatientInfo({
          name: 'Juan Perez',
          birthDate: '1990-01-01',
          address: '123 Calle Principal',
          email: 'juan.perez@example.com'
      });
      setSpecialties([
        { id: '1', name: 'Cardiología' },
        { id: '2', name: 'Neurología' }
    ]);
    // Fetch patients and specialties from the backend
    // axios.get('/api/patients').then(response => setPatients(response.data));
    // axios.get('/api/specialties').then(response => setSpecialties(response.data));
  }, []);

  
  const handleSpecialtyChange = async (event) => {
    const selected = event.target.value;
    setSelectedSpecialty(selected);

    if (selected === '1') { // Suponiendo que '1' sea el ID de Cardiología
        // Hacer una solicitud al backend para obtener doctores de Cardiología
        // Ejemplo: const response = await axios.get(`/api/doctors?specialty=${selected}`);
        // setDoctors(response.data);

        // Para este ejemplo, usaré datos simulados
        setDoctors([
            { id: 'doc1', name: 'Dr. Cardiologo 1' },
            // ... otros doctores de cardiología
        ]);
    } else {
        // Manejar otras especialidades o limpiar la lista de doctores
        setDoctors([]);
    }
};

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit the appointment data to the backend
    // You'll need to construct the data object based on whether it's a new patient or existing one
    // axios.post('/api/appointments', { /* data */ });
  };

  const handleDateChange = async (e) => {
    setAppointmentDate(e.target.value);
    if (selectedDoctor && e.target.value) {
        // Aquí se hace una solicitud al backend para obtener las horas disponibles
        // basadas en el doctor seleccionado y la fecha
        // Ejemplo:
        // const response = await axios.get(`/api/available-times/${selectedDoctor}?date=${e.target.value}`);
        // setAvailableTimes(response.data);

        // Para este ejemplo, usaré datos simulados
        setAvailableTimes(['09:00', '10:00', '11:00']); // Datos simulados de horas disponibles
    }
};



return (
  <PageBackground>
      <TopBar>Hospital</TopBar>
  <Container className="my-5">
    
    <Row>
      <Col md={12}>
        <h1 className="text-center mb-4">Agendar una Cita</h1>
        <Form onSubmit={handleSubmit}>
          {/* Información del paciente */}
          <Row className="mb-3">
            <Col md={6} className="mb-3">
              <h2>Información del Paciente</h2>
              <p><strong>Nombre:</strong> {patientInfo.name}</p>
              <p><strong>Fecha de Nacimiento:</strong> {patientInfo.birthDate}</p>
              <p><strong>Dirección:</strong> {patientInfo.address}</p>
              <p><strong>Email:</strong> {patientInfo.email}</p>
            </Col>
            
            {/* Selección de especialidad y doctor */}
            <Col md={6} className="mb-3">
              <Form.Group controlId="specialtySelect">
                <Form.Label><strong>Especialidad</strong></Form.Label>
                <Form.Control as="select" value={selectedSpecialty} onChange={handleSpecialtyChange}>
                  <option value="">Seleccione una especialidad</option>
                  {/* Opciones de especialidades */}
                  {specialties.map(specialty => (
                    <option key={specialty.id} value={specialty.id}>{specialty.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              
              <Form.Group controlId="doctorSelect" className="mt-3">
                <Form.Label><strong>Doctor</strong></Form.Label>
                <Form.Control as="select" value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}>
                  <option value="">Seleccione un doctor</option>
                  {/* Opciones de doctores */}
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          {/* Selección de fecha y hora */}
          <Row>
            <Col md={12} className="mb-3">
              <Form.Group controlId="dateSelect">
                <Form.Label><strong>Fecha</strong></Form.Label>
                <Form.Control type="date" value={appointmentDate} onChange={handleDateChange} />
              </Form.Group>
            </Col>
            <Col md={12} className="mb-3">
              <Form.Group controlId="timeSelect">
                <Form.Label><strong>Hora</strong></Form.Label>
                <Form.Control as="select" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)}>
                  <option value="">Seleccione una hora</option>
                  {/* Opciones de horarios disponibles */}
                  {availableTimes.map((time, index) => (
                    <option key={index} value={time}>{time}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          {/* Botón para agendar cita */}
          <Row>
            <Col md={12} className="text-center">
              <Button variant="primary" type="submit">Agendar Cita</Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  </Container>
  <BottomBar>
        © {new Date().getFullYear()} Hospital. Todos los derechos reservados.
      </BottomBar>
    </PageBackground>
);
}

export default ScheduleAppointment;