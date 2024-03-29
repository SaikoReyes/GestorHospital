import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';



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
    const location = useLocation();
    const existingAppointment = location.state?.selectedAppointment;
    const [patientInfo, setPatientInfo] = useState({
        name: '',

    });
    const [showModal, setShowModal] = useState(false);
    const [appointmentDetails, setAppointmentDetails] = useState({
      folio: '',
      patientName: '',
      specialtyName: '',
      date: '',
      time: '',
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

        if (existingAppointment) {
            console.log(existingAppointment);
            setSelectedSpecialty(existingAppointment.specialtyId);
            setSelectedDoctor(existingAppointment.doctorId);
            setAppointmentDate(existingAppointment.date);
            setAppointmentTime(existingAppointment.time);
            
          }
      const savedUserId = sessionStorage.getItem('idPersona');
        if (savedUserId) {
          setPatientId(savedUserId);
        }
      const fetchSpecialties = async () => {
        try {
          const response = await axios.get('https://dbstapi.azurewebsites.net/Doctor/ObtenerEspecialidades');
          console.log(response.data);
          setSpecialties(response.data);
        } catch (error) {
          console.error('Error al obtener especialidades:', error);
        }
      };
  
      fetchSpecialties();
    }, [existingAppointment]);

    const formatDate = (dateString) => {
      const [year, month, day] = dateString.split('-');
      return `${month}/${day}/${year}`;
    };
  
    const handleSpecialtyChange = async (event) => {
      const specialtyId = event.target.value;
      setSelectedSpecialty(specialtyId);
      try {
        const response = await axios.get(`https://dbstapi.azurewebsites.net/Doctor/ObtenerDoctoresPorEspecialidad`, {
          params: { idEspecialidad: specialtyId }
        });
        console.log(response.data);
        setDoctors(response.data);
      } catch (error) {
        console.error('Error al obtener doctores:', error);
      }
    };

    const handleDoctorChange = async (event) => {
      const doctorId = event.target.value;
      setSelectedDoctor(doctorId);
      
      
      if (doctorId && appointmentDate) {
        checkDoctorAvailability(doctorId, appointmentDate);
      }
    };

    const checkDoctorAvailability = async (doctorId, date) => {
  try {
    
    const formattedDate = formatDate(date);

    
    const responseAppointments = await axios.get('https://dbstapi.azurewebsites.net/Paciente/ObtenerCitasDoctorPorDia', {
      params: { idDoctor: doctorId, fecha: formattedDate }
    });

    
    const responseSchedule = await axios.get('https://dbstapi.azurewebsites.net/Paciente/ObtenerHorarioDoctor', {
      params: { idDoc: doctorId }
    });

    
    setAvailableTimes(filterAvailableTimes(responseSchedule.data, responseAppointments.data, formattedDate));
  } catch (error) {
    console.error('Error al verificar la disponibilidad:', error);
  }
};

    const filterAvailableTimes = (schedule, appointments, selectedDate) => {
      const normalizeText = (text) => {
        return text
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();
      };
      
      const dayOfWeek = new Date(selectedDate).toLocaleString('es', { weekday: 'long' }).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"");;
      const dailySchedule = schedule.find(day => 
        normalizeText(day.dia.toLowerCase()) === normalizeText(dayOfWeek)
      );
      console.log(dayOfWeek)
      if (!dailySchedule) {
        console.log('No hay horario para este día');
        setAvailableTimes([]);
        return [];
      }
    
      let availableSlots = generateTimeSlots(dailySchedule.horaInicio, dailySchedule.horaFin);
    
      
      const occupiedTimes = appointments.map(appointment => appointment.hora.substring(0, 5)); // Formato HH:mm
      availableSlots = availableSlots.filter(time => !occupiedTimes.includes(time));
    
      console.log('Espacios disponibles:', availableSlots);
      setAvailableTimes(availableSlots);
      return availableSlots;
    };

    const generateTimeSlots = (start, end) => {
      const times = [];
      let current = new Date(`1970-01-01T${start}Z`);
      const endDate = new Date(`1970-01-01T${end}Z`);
    
      
      const appointmentDuration = 60 * 60 * 1000; 
    
      while (current < endDate) {
        times.push(current.toISOString().substring(11, 16)); 
        current = new Date(current.getTime() + appointmentDuration);
      }
      console.log('Horas generadas:', times);
      return times;
    };

    const handleDateChange = (e) => {
      const newDate = e.target.value;
      setAppointmentDate(newDate);
  
      
      if (new Date(newDate) > new Date(new Date().setMonth(new Date().getMonth() + 3))) {
        alert('Por favor, elija una fecha más cercana. La anticipación máxima es de 3 meses.');
        setAppointmentDate('');
        return;
      }
  
      
      if (selectedDoctor) {
        checkDoctorAvailability(selectedDoctor, newDate);
      }
    };

    const handleAppointmentSuccess = (response) => {
      
      setAppointmentDetails({
        folio: response.idCita,
        patientName: patientInfo.name,
        specialtyName: specialties.find(spec => spec.idEspecialidad === selectedSpecialty)?.nombre,
        date: appointmentDate,
        time: appointmentTime,
      });
      setShowModal(true);
    };
    const deletePreviousAppointment = async () => {
        try {
          await axios.get('https://dbstapi.azurewebsites.net/Paciente/CancelarCita', {
            params: { idCita: existingAppointment.idCita }
          });
          alert('La cita anterior ha sido modificada con éxito.');
        } catch (error) {
          console.error('Error al modificar la cita anterior:', error);
        }
      };

    const handleSubmit = async (event) => {
      event.preventDefault();
    
      
      const formattedDate = `${appointmentDate.split('-')[1]}/${appointmentDate.split('-')[2]}/${appointmentDate.split('-')[0]}`;
    
      
      if (!availableTimes.includes(appointmentTime)) {
        alert('La hora seleccionada ya está ocupada o no es válida.');
        return;
      }
    
      
      const currentDate = new Date();
      const selectedDate = new Date(appointmentDate);
      if (selectedDate > new Date(currentDate.setMonth(currentDate.getMonth() + 3))) {
        alert('La fecha de la cita no puede exceder un máximo de 3 meses de anticipación.');
        return;
      }
    
      
      try {
        const response = await axios.get('https://dbstapi.azurewebsites.net/Paciente/AgendarCita', {
          params: {
            idPaciente: patientId,
            idDoctor: selectedDoctor,
            fechaCita: formattedDate,
            horaCita: appointmentTime,
            costo: 100 
          }
        });
    
        
        if (response.data) {
          alert('Cita agendada con éxito.');
        
        }
        try {
        
          if (response.data) {
            handleAppointmentSuccess(response.data);
            await deletePreviousAppointment();
            alert("Datos de la cita:\n "+response.data.idCita+'\n'+response.data.nombrePaciente+'\n'+response.data.nombre+'\n'+response.data.fecha+'\n'+response.data.hora);
          }
        } catch (error) {
        
          console.error('Error al agendar la cita:', error);
        }
      } catch (error) {
        console.error('Error al agendar la cita:', error);
        alert('Error al agendar la cita. Intente nuevamente.');
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
          
          <Row className="mb-3">
          
            <Col md={6} className="mb-3">
            <Form.Group controlId="specialtySelect">
          <Form.Label>Especialidad</Form.Label>
          <Form.Control as="select" value={selectedSpecialty} onChange={handleSpecialtyChange}>
            <option value="">Seleccione una especialidad</option>
            {specialties.map(specialty => (
              <option key={specialty.idEspecialidad} value={specialty.idEspecialidad}>
                {specialty.nombre}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
              
        <Form.Group controlId="doctorSelect" className="mt-3">
  <Form.Label><strong>Doctor</strong></Form.Label>
  <Form.Control as="select" value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}>
    <option value="">Seleccione un doctor</option>
    {doctors.map(doctor => (
      <option key={doctor.idDoctor} value={doctor.idDoctor}>{doctor.nombre}</option>
    ))}
  </Form.Control>
</Form.Group>

            </Col>
          </Row>

          
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
                  
                  {availableTimes.map((time, index) => (
                    <option key={index} value={time}>{time}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          
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