import React from "react";
import { Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

const LoginButton = () => {
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/auth/init", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to initialize authentication");
      }

      const data = await response.json();
      localStorage.setItem("stateId", data.stateId); // Store stateId in localStorage
      window.location.href = "/sign-in"; // Redirect to sign-in page
    } catch (error) {
      console.error("Error initiating authentication:", error);
    }
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
