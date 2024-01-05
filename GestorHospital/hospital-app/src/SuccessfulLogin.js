import React from 'react';
import { useLocation } from 'react-router-dom';

function SuccessfulLogin() {
  const location = useLocation();
  const username = location.state?.username; // Retrieve the username passed in the state

  return (
    <div>
      <h1>Welcome, {username}</h1>
    </div>
  );
}

export default SuccessfulLogin;
