import  { useState, useEffect } from 'react';
import { getUserInfo } from '../api/auth';

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        setUserInfo(data);
        setError(null);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div>
      <h2>User Info</h2>
      {userInfo ? (
        <pre>{JSON.stringify(userInfo, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default UserInfo;