import React from "react";
import { Button, IconButton } from "react-native-paper";
import { Linking } from "react-native";

const LogoutButton = () => {
  const handleLogout = () => {
    // Redirect to SAML backend logout route
    Linking.openURL("http://localhost:4000/logout")
      .catch((err) => console.error("Failed to log out: ", err));
  };

  return (
    <Button
      icon="logout"
      mode="contained"
      onPress={handleLogout}
      style={{
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
      }}
      labelStyle={{
        fontSize: 16,
        textTransform: "none",
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
