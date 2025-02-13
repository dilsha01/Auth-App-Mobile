import  { useState } from 'react';
import AuthInit from './components/AuthInit';
import Login from './components/Login';
import UserInfo from './components/UserInfo';
import UpdateUser from './components/UpdateUser';

const App = () => {
  const [stateId, setStateId] = useState(null);

  return (
    <div>
      <h1>React App with Backend Integration</h1>
      <AuthInit setStateId={setStateId} />
      {stateId && <Login stateId={stateId} />}
      <UserInfo />
      <UpdateUser />
    </div>
  );
};

export default App;