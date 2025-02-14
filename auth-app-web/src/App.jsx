// import  { useState } from 'react';
// import AuthInit from './components/AuthInit';
// import Login from './components/Login';
// import UserInfo from './components/UserInfo';
// import UpdateUser from './components/UpdateUser';

// const App = () => {
//   const [stateId, setStateId] = useState(null);

//   return (
//     <div>
//       <h1>React App with Backend Integration</h1>
//       <AuthInit setStateId={setStateId} />
//       {stateId && <Login stateId={stateId} />}
//       <UserInfo />
//       <UpdateUser />
//     </div>
//   );
// };

// export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
// import Header from './components/Header';
// import Footer from './components/Footer';
import './index.css';


const App = () => {
    return (
        <Router>
          {/* <div id='navcontent'>
            <Header />
          </div > */}
          <div id = 'bodycontent'>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
          </div>
          {/* <div id='footercontent'>
            <Footer />
          </div> */}
      </Router>
    );
};

export default App;