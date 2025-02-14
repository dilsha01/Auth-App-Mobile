import React from "react";
import { Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

const LoginButton = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:4000/login"; // Backend login route
  };



  
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<LoginIcon />}
      onClick={handleLogin}
      sx={{
        fontSize: "1rem",
        padding: "10px 20px",
        borderRadius: "8px",
        textTransform: "none",
      }}
    >
      Click here to login 
    </Button>
  );
};

export default LoginButton;

