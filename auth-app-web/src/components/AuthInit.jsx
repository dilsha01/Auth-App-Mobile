import  { useState } from 'react';
import { initAuth } from '../api/auth';

const AuthInit = () => {
  const [stateId, setStateId] = useState(null);
  const [error, setError] = useState(null);

  const handleInit = async () => {
    try {
      const data = await initAuth();
      setStateId(data.stateId);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Initialize Authentication</h2>
      <button onClick={handleInit}>Init Auth</button>
      {stateId && <p>State ID: {stateId}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AuthInit;