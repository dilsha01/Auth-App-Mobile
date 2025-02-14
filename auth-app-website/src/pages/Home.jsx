import React from "react";
import { Container, Typography, Paper, Button, Box, AppBar, Toolbar } from "@mui/material";
import LoginButton from "../components/LoginButton";

const Home = () => {
  return (
    <>
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: "#041E42" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            IBM Security Verify Access
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 5, 
            textAlign: "center", 
            borderRadius: 3, 
            backgroundColor: "#052F5F", 
            color: "#FFFFFF",
            maxWidth: "700px"
          }}
        >
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Welcome to IBM Security Verify Access SCIM API Demo
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: "white" }}>
            Experience secure and seamless user provisioning using SCIM (System for Cross-domain Identity Management). 
            Our system ensures standardized and automated identity lifecycle management.
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: "white" }}>
            Click the button below to authenticate securely and manage user identities using SCIM API:
          </Typography>
          <Box>
            <LoginButton />
          </Box>
        </Paper>
      </Container>

      {/* Footer */}
      <Box sx={{ textAlign: "center", p: 4, backgroundColor: "#041E42", color: "#FFFFFF" }}>
        <Typography variant="body2">© {new Date().getFullYear()} IBM Security. All rights reserved.</Typography>
      </Box>
    </>
  );
};

export default Home;
