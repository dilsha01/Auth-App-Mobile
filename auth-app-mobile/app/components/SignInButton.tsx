import React from "react";
import { Button } from "react-native-paper";
import { Linking } from "react-native";

const SignInButton = () => {
  const BASE_URL = "http://172.20.10.6:4000";

  const handleSignIn = async () => {
    try {
      console.log("Signing in...");
      const response = await fetch(`${BASE_URL}/api/auth/signin`, {
        method: "POST",
      });

      if (response.ok) {
        // Navigate to the dashboard if sign-in is successful
        Linking.openURL("/dashboard").catch((err) => console.error("Failed to navigate: ", err));
      } else {
        console.error("Failed to sign in");
      }
    } catch (error) {
      console.error("Error initiating sign-in:", error);
    }
  };

  return (
    <Button
      icon="login"
      mode="contained"
      onPress={handleSignIn}
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
      Click here to sign in
    </Button>
  );
};

export default SignInButton;
