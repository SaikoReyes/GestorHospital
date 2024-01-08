import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row } from 'react-bootstrap';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', {
        username: username,
        password: password,
      });
      if (response.data) {
        try{
        alert('Inicio de sesión exitoso');
        const userId = response.data.userId;
        sessionStorage.setItem('userId', userId);
        const roleResponse = await axios.post(`http://localhost:3001/get-user-role/${username}`);
        const userRole = roleResponse.data.role;
        navigate('/hub', { state: { username: username , role: userRole }});
        }catch (error) {
          console.error('Error obteniendo información del usuario: ', error.response || error);
        }
      }
    } catch (error) {
      alert('Login failed: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <div style={{ 
      backgroundImage: 'url(/background-image.png)',
      backgroundSize: 'cover',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Row>
      <Container style={styles.formContainer}>
        <Form style={styles.form} onSubmit={handleLogin}>
          <h2 style={styles.title}>Inicio de sesión</h2>
          <Form.Group>
            <Form.Label>Usuario</Form.Label>
            <Form.Control 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingrese su usuario"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
            />
          </Form.Group>

          <Button type="submit" style={styles.button}>Acceder</Button>
        </Form>
        <br>
        </br>
        <center>¿Aún no tienes cuenta?</center>
        <center>
        <Button variant="primary" style={styles.action} onClick={() => navigate('/registro')}>Registrate</Button>
        </center>
        
      </Container>
      
      
      </Row>
    </div>
  );
}

const styles = {
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)'
  },
  form: {
    width: '100%'
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  button: {
    marginTop: '20px',
    width: '100%'
  }
};

export default Login;
