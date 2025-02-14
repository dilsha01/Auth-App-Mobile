import React, { useEffect, useState } from "react";
import { Container, TextField, Button, Paper, Typography, Box, AppBar, Toolbar } from "@mui/material";

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState({
    displayName: "",
    userName: "",
    title: "",
    id: "",
    email: "",
    organization: "",
    department: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      const parsedData = JSON.parse(storedUserInfo);
      setUserInfo({
        displayName: parsedData.displayName || "",
        userName: parsedData.userName || "",
        title: parsedData.title || "",
        id: parsedData.id || "",
        email: parsedData.emails?.[0]?.value || "",
        organization: parsedData["urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"]?.organization || "",
        department: parsedData["urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"]?.department || "",
        phoneNumber: parsedData.phoneNumbers?.[0]?.value || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      // Update local storage first
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      // Retrieve auth token or cookies
      const authCookies = localStorage.getItem("authCookies");
      if (!authCookies) {
        console.error("No authentication cookies found.");
        return;
      }

      // Prepare data for PUT request
      const updatedUserInfo = {
        displayName: userInfo.displayName,
        userName: userInfo.userName,
        title: userInfo.title,
        emails: [{ type: "work", value: userInfo.email, primary: true }],
        "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {
          organization: userInfo.organization,
          department: userInfo.department,
        },
        phoneNumbers: [{ type: "work", value: userInfo.phoneNumber, primary: true }],
      };

      // Send PUT request
      const response = await fetch("http://localhost:4000/api/auth/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Cookie": authCookies,
        },
        body: JSON.stringify(updatedUserInfo),
      });

      if (response.ok) {
        console.log("User info updated successfully!");
      } else {
        console.error("Failed to update user info.");
      }
    } catch (error) {
      console.error("Error during update:", error);
    }
  };

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

      {/* User Info Form */}
      <Container maxWidth="sm" sx={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, maxWidth: "500px" }}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Welcome, {userInfo.displayName || "User"}
          </Typography>

          <TextField fullWidth margin="normal" label="Display Name" name="displayName" value={userInfo.displayName} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Username" name="userName" value={userInfo.userName} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Title" name="title" value={userInfo.title} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Email" name="email" value={userInfo.email} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Organization" name="organization" value={userInfo.organization} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Department" name="department" value={userInfo.department} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Phone Number" name="phoneNumber" value={userInfo.phoneNumber} onChange={handleChange} />

          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleUpdate}>
            Update Info
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

export default Dashboard;
