import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import RedirectHandler from "./handler";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/assert" element={<RedirectHandler />} />
      </Routes>
    </Router>
  );
}

export default App;

// import React, { useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from "react-router-dom";
// import Home from "./pages/Home";
// import Dashboard from "./pages/Dashboard";

// const AuthHandler = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     if (location.pathname === "http://localhost:4000/assert") {
//       navigate("http://localhost:3000/dashboard");
//     }
//   }, [location, navigate]);

//   return null; // No UI needed, just handling the redirect
// };

// function App() {
//   return (
//     <Router>
//       <AuthHandler />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
