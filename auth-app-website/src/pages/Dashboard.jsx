import React from "react";
import { Container, Typography, Paper, Box, AppBar, Toolbar } from "@mui/material";
import UserProfile from "../components/UserProfile";
import LogoutButton from "../components/LogoutButton";




const Dashboard = () => {
  return (
    <>
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: "#041E42" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            User Dashboard
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
            maxWidth: "700px",
          }}
        >
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Welcome to Your Dashboard
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: "white" }}>
            View your profile details and manage your authentication settings.
          </Typography>

          {/* User Profile Section */}
          <Box sx={{ mb: 4 }}>
            <UserProfile />
          </Box>

          {/* Logout Button */}
          <Box>
            <LogoutButton />
          </Box>
        </Paper>
      </Container>

      {/* Footer */}
      <Box sx={{ textAlign: "center", p: 2, backgroundColor: "#041E42", color: "#FFFFFF" }}>
        <Typography variant="body2">© {new Date().getFullYear()} IBM Security. All rights reserved.</Typography>
      </Box>
    </>
  );
};

export default Dashboard;
