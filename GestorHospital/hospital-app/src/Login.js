import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook to navigate to different routes

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', {
        username: username,
        password: password,
      });
      // If login is successful, redirect to the successful-login page
      if (response.data) {
        try{
        alert('Login successful'); // Consider replacing with a more robust solution
        const roleResponse = await axios.post(`http://localhost:3001/get-user-role/${username}`);
        const userRole = roleResponse.data.role;
        navigate('/hub', { state: { username: username , role: userRole }});
        }catch (error) {
          console.error('Error fetching user role: ', error.response || error);
        }
      }
    } catch (error) {
      // Handle errors (e.g., wrong credentials, server issues)
      alert('Login failed: ' + (error.response ? error.response.data.message : error.message)); // Consider replacing with a more robust solution
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleLogin}>
        <h2 style={styles.title}>Login</h2>

        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="username">Username</label>
          <input 
            style={styles.input} 
            type="text" 
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username" 
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="password">Password</label>
          <input 
            style={styles.input} 
            type="password" 
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password" 
          />
        </div>

        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
}

// Basic inline styles
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f7f7f7'
  },
  form: {
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    width: '310px'
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  inputGroup: {
    marginBottom: '25px'
  },
  label: {
    display: 'block',
    marginBottom: '5px'
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px'
  },
  button: {
    width: '100%',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer'
  }
};

export default Login;
