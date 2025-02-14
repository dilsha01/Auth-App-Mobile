import React from "react";
import { Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

const SignInButton = () => {
  const handleSignIn = async () => {
    try {
      await fetch("http://localhost:4000/api/auth/signin", { method: "POST" });
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error initiating sign-in:", error);
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<LoginIcon />}
      onClick={handleSignIn}
      sx={{
        fontSize: "1rem",
        padding: "10px 20px",
        borderRadius: "8px",
        textTransform: "none",
      }}
    >
      Click here to sign in
    </Button>
  );
};

export default SignInButton;
