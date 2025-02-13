import  { useState } from 'react';
import { updateUserInfo } from '../api/auth';

const UpdateUser = () => {
  const [userData, setUserData] = useState({});
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleUpdate = async () => {
    try {
      const data = await updateUserInfo(userData);
      setMessage(data.message);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Update User Info</h2>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
      />
      <button onClick={handleUpdate}>Update</button>
      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default UpdateUser;