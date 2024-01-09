import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import styled from 'styled-components'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

function AltaDoctor() {
    const [especialidades, setEspecialidades] = useState([]);
    const [idRol, setRolId] = useState([]);
    const [doctorData, setDoctorData] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    fechaNacimiento: '',
    nss: '', // Número de Seguridad Social
    telefono: '',
    NombreUsuario: '',
    password: '',
    sueldo: '',
    turno: '',
    especialidad: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    

    setDoctorData({
      ...doctorData,
      [name]: value
    });
  };

  useEffect(() => {
    const idRol = Number(sessionStorage.getItem('idRol'));
    if (idRol) {
        setRolId(Number(idRol));
      }
    const obtenerEspecialidades = async () => {
      try {
        const response = await axios.get('https://dbstapi.azurewebsites.net/Doctor/ObtenerEspecialidades');
        setEspecialidades(response.data); // Utiliza directamente la respuesta de la API
      } catch (error) {
        console.error('Error al obtener especialidades:', error);
      }
    };
    
    obtenerEspecialidades();
  }, []);

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`;
  };
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    // Aquí manejarías la lógica para enviar los datos al backend
    console.log(doctorData);
    const formattedDate = formatDate(doctorData.fechaNacimiento);

    try {
        const response = await axios.get('https://dbstapi.azurewebsites.net/Registro/RegistrarNuevoDoctor', {
          params: {
            curp: doctorData.curp,
            nombre: doctorData.nombre,
            apellidoPat: doctorData.apellidoPaterno,
            apellidoMat: doctorData.apellidoMaterno,
            fechaNac: formattedDate,
            nss: doctorData.nss,
            telefono: doctorData.telefono,
            sueldo: doctorData.sueldo,
            turno: doctorData.turno,
            idEspecialidad: doctorData.especialidad, // Asegúrate de que este campo se llene con un ID y no con el nombre de la especialidad
            nombreUsuario: doctorData.NombreUsuario,
            password: doctorData.password // Considera hashear esta contraseña si es necesario
          }
        });
        
        if (response.data) {
          console.log(response.data);
          alert('Doctor registrado con éxito.');
          navigate('/hub', { state: { idRol: idRol }});
        }
      } catch (error) {
        console.error('Error al registrar doctor:', error.response || error);
        alert('Fallo al registrar doctor: ' + (error.response ? error.response.data.message : error.message));
      }
  };

  // Agrega las especialidades disponibles


  // Turnos como ejemplo
  const turnos = ["Matutino", "Vespertino", "Nocturno"];

  return (
    <PageBackground>
      <TopBar>Hospital</TopBar>
      <Container className="my-5">
        <Row>
          <Col md={12}>
            <h1 className="text-center mb-4">Alta de Doctor</h1>
          </Col>
        </Row>
        <Form onSubmit={handleSubmit}>
          <Row>
            {/* Columna izquierda */}
            <Col md={6}>
              {/* Aquí irían los Form.Group para nombre, apellido paterno, etc. */}
              {/* Ejemplo para el campo de nombre */}
              <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">Nombre</Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="Nombre"
            name="nombre"
            value={doctorData.nombre}
            onChange={handleInputChange}
            maxLength={50} 

          />
        </Col>
      </Form.Group>

              <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">Apellido Paterno</Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="Apellido Paterno"
            name="apellidoPaterno"
            value={doctorData.apellidoPaterno}
            onChange={handleInputChange}
            maxLength={50} 
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">Apellido Materno</Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="Apellido Materno"
            name="apellidoMaterno"
            value={doctorData.apellidoMaterno}
            onChange={handleInputChange}
            maxLength={50} 
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">Fecha de Nacimiento</Form.Label>
        <Col sm="10">
            <Form.Control
            type="date"
            name="fechaNacimiento"
            value={doctorData.fechaNacimiento}
            onChange={handleInputChange}
            />
        </Col>
        </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">NSS</Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="Número de seguridad social"
            name="nss"
            value={doctorData.nss}
            onChange={handleInputChange}
            maxLength={11} 
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">CURP</Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="CURP"
            name="curp"
            value={doctorData.curp}
            onChange={handleInputChange}
            maxLength={18} 
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>Teléfono</Form.Label>
        <Col sm={10}>
            <Form.Control
            type="tel"
            name="telefono"
            value={doctorData.telefono}
            onChange={handleInputChange}
            maxLength={15} 
            placeholder="Ingrese el número de teléfono"
            />
        </Col>
    </Form.Group>

              
              {/* Repite para otros campos en la columna izquierda */}
            </Col>

            {/* Columna derecha */}
            <Col md={6}>
              {/* Ejemplo para el campo de especialidad */}
             

              <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Especialidad</Form.Label>
          <Col sm="10">
            <Form.Control as="select" name="especialidad" value={doctorData.especialidad} onChange={handleInputChange}>
              <option value="">Seleccione una especialidad</option>
              {especialidades.map((especialidad) => (
                <option key={especialidad.idEspecialidad} value={especialidad.idEspecialidad}>{especialidad.nombre}</option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>

      {/* Selector de Turno */}
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">Turno</Form.Label>
        <Col sm="10">
          <Form.Control as="select" name="turno" value={doctorData.turno} onChange={handleInputChange}>
            <option value="">Seleccione un turno</option>
            {turnos.map((turno, index) => (
              <option key={index} value={turno}>{turno}</option>
            ))}
          </Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>Sueldo</Form.Label>
        <Col sm={10}>
            <Form.Control
            type="number"
            name="sueldo"
            value={doctorData.sueldo}
            onChange={handleInputChange}
            placeholder="Ingrese el sueldo"
            min="99" // Puedes establecer un mínimo si es necesario
            step="0.01" // Asume que se pueden tener centavos en el sueldo
            max="9999999999"
            />
        </Col>
        </Form.Group>


        <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">Usuario</Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="Usuario"
            name="NombreUsuario"
            value={doctorData.NombreUsuario}
            onChange={handleInputChange}
            maxLength={50} 
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">Contraseña</Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="Contraseña"
            name="password"
            value={doctorData.password}
            onChange={handleInputChange}
            maxLength={255} 
          />
        </Col>
      </Form.Group>
      <Row>
            <Col md={12} className="text-center">
              <Button variant="primary" type="submit">Registrar Doctor</Button>
            </Col>
          </Row>

      
              {/* Repite para otros campos en la columna derecha */}
            </Col>
          </Row>
          {/* ... más filas y columnas según sea necesario ... */}
         
        </Form>
      </Container>
      <BottomBar>
        © {new Date().getFullYear()} Hospital. Todos los derechos reservados.
      </BottomBar>
    </PageBackground>
  );
}

export default AltaDoctor;