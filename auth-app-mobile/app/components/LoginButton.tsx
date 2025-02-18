import React from "react";
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";
import { BASE_URL } from '@env';

const LoginButton = () => {
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch(`{BASE_URL}/api/auth/init`, {
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

      // Navigate to sign-in screen
      router.push("/signin");
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
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        width: "50%",
        alignSelf: "center",
      }}
    >
      Click here to login
    </Button>
  );
};

export default LoginButton;
