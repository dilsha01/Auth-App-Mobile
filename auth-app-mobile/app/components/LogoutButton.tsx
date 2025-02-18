import React from "react";
import { Button, IconButton } from "react-native-paper";
import { Linking } from "react-native";

const LogoutButton = () => {
  	const BASE_URL = "http://172.20.10.6:4000";

  const handleLogout = () => {
    // Redirect to SAML backend logout route
    Linking.openURL(`${BASE_URL}/logout`)
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
        width: "25%",
        alignSelf: "center",
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
