import React from "react";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const LogoutButton = () => {
  // const handleLogout = () => {
  //   window.location.href = "http://localhost:4000/logout"; // Redirect to SAML backend logout route
  // };
  const handleLogout = () => {
    const form = document.createElement("form");
    form.method = "GET";
    form.action = "http://localhost:4000/logout";
  
    document.body.appendChild(form);
    form.submit();
  };
  

  return (
    <Button
      variant="contained"
      color="secondary"
      startIcon={<LogoutIcon />}
      onClick={handleLogout}
      sx={{
        fontSize: "1rem",
        padding: "10px 20px",
        borderRadius: "8px",
        textTransform: "none",
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;



