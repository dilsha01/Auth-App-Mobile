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
      try {
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
      } catch (error) {
        console.error("Error parsing user info from local storage:", error);
      }
    }
  }, []);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  // const handleUpdate = async () => {
  //   try {
  //     const authToken = localStorage.getItem("authCookies");
  //     if (!authToken) {
  //       alert("You are not logged in. Please log in and try again.");
  //       return;
  //     }

  //     const storedUserInfo = localStorage.getItem("userInfo");
  //     const originalData = storedUserInfo ? JSON.parse(storedUserInfo) : {};
  //     const updatedUserInfo = {
  //       ...originalData,
  //       displayName: userInfo.displayName,
  //       userName: userInfo.userName,
  //       title: userInfo.title,
  //       emails: [{ type: "work", value: userInfo.email, primary: true }],
  //       "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {
  //         organization: userInfo.organization,
  //         department: userInfo.department,
  //       },
  //       "urn:ietf:params:scim:schemas:extension:isam:1.0:User": {
  //         passwordValid: true,
  //         accountValid: true,
  //       },
  //       phoneNumbers: [{ type: "work", value: userInfo.phoneNumber, primary: true }],
  //       schemas: [
  //         "urn:ietf:params:scim:schemas:core:2.0:User",
  //         "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User",
  //         "urn:ietf:params:scim:schemas:extension:isam:1.0:User",
  //       ],
  //     };

  //     localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
  //     const updatedStoredUserInfo = localStorage.getItem("userInfo");
      
      
  //     const response = await fetch("http://localhost:4000/api/auth/user", {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Cookie": localStorage.getItem("authCookies"),
  //       },
  //       body: JSON.stringify(updatedStoredUserInfo),
  //     });

  //     if (response.ok) {
  //       console.log("User info updated successfully!");
  //     } else {
  //       const errorResponse = await response.json();
  //       console.error("Failed to update user info:", errorResponse);
  //       alert(`Update failed: ${errorResponse.detail || "Unknown error"}`);
  //     }
  //   } catch (error) {
  //     console.error("Error during update:", error);
  //     alert("An unexpected error occurred. Please try again.");
  //   }
  // };

  const handleUpdate = async () => {
    try {
      const authCookies = localStorage.getItem("authCookies");
      if (!authCookies) {
        alert("You are not logged in. Please log in and try again.");
        return;
      }
  
      const storedUserInfo = localStorage.getItem("userInfo");
      const originalData = storedUserInfo ? JSON.parse(storedUserInfo) : {};
  
      const updatedUserInfo = {
        ...originalData,
        displayName: userInfo.displayName,
        userName: userInfo.userName,
        title: userInfo.title
      };
  
      const response = await fetch("http://localhost:4000/api/auth/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Cookie": authCookies, // Ensure all required cookies are included
        },
       
        body: JSON.stringify(updatedUserInfo),
      });
  
      if (response.ok) {
        console.log("User info updated successfully!");
        window.location.href = "/sign-out";
      } else {
        const errorResponse = await response.json();
        console.error("Failed to update user info:", errorResponse);
        alert(`Update failed: ${errorResponse.detail || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error during update:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const handleCancel = () => {
    window.location.href = "/sign-out"; // Navigates the user away without making changes
  };
  

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#041E42" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            User Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, maxWidth: "500px" }}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Welcome, {userInfo.displayName || "User"}
          </Typography>

          <TextField fullWidth margin="normal" label="Display Name" name="displayName" value={userInfo.displayName} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Username" name="userName" value={userInfo.userName} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Title" name="title" value={userInfo.title} onChange={handleChange} />
          {/* <TextField fullWidth margin="normal" label="Email" name="email" value={userInfo.email} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Organization" name="organization" value={userInfo.organization} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Department" name="department" value={userInfo.department} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Phone Number" name="phoneNumber" value={userInfo.phoneNumber} onChange={handleChange} /> */}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="contained" color="primary" sx={{ flex: 1, mr: 1 }} onClick={handleUpdate}>
              Update Info
            </Button>
            <Button variant="contained" color="primary" sx={{ flex: 1, ml: 1 }} onClick={handleCancel}>
              Cancel
            </Button>
          </Box>

        </Paper>
      </Container>

      <Box sx={{ textAlign: "center", p: 4, backgroundColor: "#041E42", color: "#FFFFFF" }}>
        <Typography variant="body2">© {new Date().getFullYear()} IBM Security. All rights reserved.</Typography>
      </Box>
    </>
  );
};

export default Dashboard;
