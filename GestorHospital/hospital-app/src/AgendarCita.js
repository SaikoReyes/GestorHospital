import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ScheduleAppointment() {
    const [patientInfo, setPatientInfo] = useState({
        name: '',
        birthDate: '',
        address: '',
        email: ''
      });
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');

  useEffect(() => {
    // Fetch patients and specialties from the backend
    // axios.get('/api/patients').then(response => setPatients(response.data));
    // axios.get('/api/specialties').then(response => setSpecialties(response.data));
  }, []);

  
  const handleSpecialtyChange = (event) => {
    const selected = event.target.value;
    setSelectedSpecialty(selected);
    // Fetch doctors based on selected specialty
    // axios.get(`/api/doctors?specialty=${selected}`).then(response => setDoctors(response.data));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit the appointment data to the backend
    // You'll need to construct the data object based on whether it's a new patient or existing one
    // axios.post('/api/appointments', { /* data */ });
  };

  return (
    <div>
      <h1>Schedule an Appointment</h1>
      <form onSubmit={handleSubmit}>
        {/* Patient Selection or Information */}
        <div>
          <label>Patient: </label>
          
        </div>

        {/* Always display patient information fields */}
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={patientInfo.name}
            onChange={(e) => setPatientInfo({ ...patientInfo, name: e.target.value })}
          />
        </div>
        <div>
          <label>Birth Date: </label>
          <input
            type="date"
            value={patientInfo.birthDate}
            onChange={(e) => setPatientInfo({ ...patientInfo, birthDate: e.target.value })}
          />
        </div>
        <div>
          <label>Address: </label>
          <input
            type="text"
            value={patientInfo.address}
            onChange={(e) => setPatientInfo({ ...patientInfo, address: e.target.value })}
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={patientInfo.email}
            onChange={(e) => setPatientInfo({ ...patientInfo, email: e.target.value })}
          />
        </div>


        {/* Specialty Selection */}
        <div>
          <label>Specialty: </label>
          <select value={selectedSpecialty} onChange={handleSpecialtyChange}>
            {specialties.map(specialty => (
              <option key={specialty.id} value={specialty.id}>{specialty.name}</option>
            ))}
          </select>
        </div>

        {/* Doctor Selection */}
        <div>
          <label>Doctor: </label>
          <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}>
            {doctors.map(doctor => (
              <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
            ))}
          </select>
        </div>

        {/* Appointment Date and Time */}
        <div>
          <label>Date: </label>
          <input type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} />
        </div>
        <div>
          <label>Time: </label>
          <input type="time" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} />
        </div>

        <button type="submit">Schedule Appointment</button>
      </form>
    </div>
  );
}

export default ScheduleAppointment;
