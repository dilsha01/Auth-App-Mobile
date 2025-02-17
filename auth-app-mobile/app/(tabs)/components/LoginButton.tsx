import React from "react";
import { Button, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const LoginButton = () => {
  const navigation = useNavigation();

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
      navigation.navigate("SignIn"); // Navigate to sign-in screen
    } catch (error) {
      console.error("Error initiating authentication:", error);
    }
  };

  return (
    <Button
      icon="login"
      mode="contained"
      onPress={handleLogin}
      style={{
        fontSize: 16,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        textTransform: "none",
      }}
    >
      Click here to login
    </Button>
  );
};

export default LoginButton;
