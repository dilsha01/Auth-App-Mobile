import React from "react";
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";


const LoginButton = () => {
  const router = useRouter();
  const BASE_URL = "http://172.20.10.6:4000";

  const handleLogin = async () => {
    try {
      console.log("Initializing authentication...");
      const response = await fetch(`${BASE_URL}/api/auth/init`, {
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
      AsyncStorage.setItem("stateId", data.stateId); // Store stateId in localStorage

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
