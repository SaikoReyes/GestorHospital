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



function DoctorList() {
  
  const [appointments, setAppointments] = useState([]);
  const [patientId, setPatientId] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({});
  const [selectedExtraService, setSelectedExtraService] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

 
  const paymentMethods = ["Efectivo", "Tarjeta de crédito"];
  const extraServices = ["Servicio 1", "Servicio 2", "Servicio 3", "Servicio 4", "Servicio 5"];

 
  const handleSearch = async () => {
    try {
      const response = await axios.get('https://dbstapi.azurewebsites.net/Paciente/ObtenerCitasPaciente', {
        params: { idPaciente: patientId }
      });
        const filteredAppointments = response.data.filter(appointment => appointment.estado === "Agendada");
        setAppointments(filteredAppointments);
    } catch (error) {
      console.error('Error al buscar citas:', error);
    }
  };

 
  const handlePaymentChange = (appointmentId, method) => {
    setSelectedPaymentMethod({ ...selectedPaymentMethod, [appointmentId]: method });
  };

  const handleExtraServiceChange = (appointmentId, service) => {
    setSelectedExtraService({ ...selectedExtraService, [appointmentId]: service });
  };

 
  const handlePay = async (appointmentId) => {
    try {
      const method = selectedPaymentMethod[appointmentId];
      const service = selectedExtraService[appointmentId];
      const cost = appointments.find(appointment => appointment.idCita === appointmentId)?.costo;
      const response = await axios.get('https://dbstapi.azurewebsites.net/Paciente/Pagar', {
        params:{idCita: appointmentId,
        monto: cost,
        servicio: service,
        metodo: method}
      });
      setAlertMessage(response.data);
      setShowAlert(true);
      window.location.reload();
    } catch (error) {
      console.error('Error al pagar:', error);
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
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
          />
          <Button variant="outline-secondary" onClick={() => handleSearch()}>Buscar Citas</Button>
    </InputGroup>
    {showAlert && (
      <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
        {alertMessage}
      </Alert>
    )}

    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Doctor</th>
          <th>Fecha y Hora</th>
          <th>Método de Pago</th>
          <th>Servicios Extras</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((appointment) => (
          <tr key={appointment.idCita}>
            <td>{appointment.nombreDoctor}</td>
            <td>{`${new Date(appointment.fecha).toLocaleDateString()} ${appointment.hora}`}</td>
            <td>
              <Form.Control
                as="select"
                value={selectedPaymentMethod[appointment.idCita] || ''}
                onChange={(e) => handlePaymentChange(appointment.idCita, e.target.value)}
              >
                <option value="">Seleccione un método</option>
                {paymentMethods.map((method, index) => (
                  <option key={index} value={method}>{method}</option>
                ))}
              </Form.Control>
            </td>
            <td>
              <Form.Control
                as="select"
                value={selectedExtraService[appointment.idCita] || ''}
                onChange={(e) => handleExtraServiceChange(appointment.idCita, e.target.value)}
              >
                <option value="">Seleccione un servicio</option>
                {extraServices.map((service, index) => (
                  <option key={index} value={service}>{service}</option>
                ))}
              </Form.Control>
            </td>
            <td>
              <Button variant="success" onClick={() => handlePay(appointment.idCita)}>
                Pagar
              </Button>
            </td>
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

export default DoctorList;
