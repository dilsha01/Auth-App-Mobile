import React, { useState } from "react";
import { Container, Typography, Paper, TextField, Button, Box, AppBar, Toolbar } from "@mui/material";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      
      if (response.ok) {
        window.location.href = "/dashboard";
      } else {
        console.error("Sign-in failed");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

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
      <Container maxWidth="sm" sx={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 5, 
            textAlign: "center", 
            borderRadius: 3, 
            backgroundColor: "#052F5F", 
            color: "#FFFFFF",
            maxWidth: "400px"
          }}
        >
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Sign In
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ backgroundColor: "#FFFFFF", borderRadius: 1 }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ backgroundColor: "#FFFFFF", borderRadius: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSignIn}
            sx={{ mt: 2, fontSize: "1rem", padding: "10px 20px", borderRadius: "8px", textTransform: "none" }}
          >
            Sign In
          </Button>
        </Paper>
      </Container>

      {/* Footer */}
      <Box sx={{ textAlign: "center", p: 4, backgroundColor: "#041E42", color: "#FFFFFF" }}>
        <Typography variant="body2">© {new Date().getFullYear()} IBM Security. All rights reserved.</Typography>
      </Box>
    </>
  );
};

export default SignIn;