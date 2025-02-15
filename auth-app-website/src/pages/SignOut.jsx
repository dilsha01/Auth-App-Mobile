import React from "react";
import { Container, Typography, Paper, Button, Box, AppBar, Toolbar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const SignOut = () => {
  const handleLogout = () => {
    localStorage.clear(); // Clear local storage
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, "=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;");
    });
    window.location.href = "/"; // Redirect to home
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: "center", borderRadius: 3, backgroundColor: "#052F5F", color: "#FFFFFF" }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Sucessfully Checked SCIM API Demo
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{ fontSize: "1rem", padding: "10px 20px", borderRadius: "8px", textTransform: "none" }}
        >
           Click here to Logout
        </Button>
      </Paper>
    </Container>
  );
};

export default SignOut;
