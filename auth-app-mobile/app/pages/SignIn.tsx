import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Appbar, Card, TextInput, Button, Text } from "react-native-paper";
//import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const navigation = useNavigation();
  const router = useRouter();

  const handleSignIn = async () => {
    const stateId = localStorage.getItem("stateId");
    if (!stateId) {
      console.error("State ID is missing. Please log in first.");
      return;
    }
    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ username, password, stateId }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.cookies) {
          localStorage.setItem("authCookies", data.cookies);
        }

        const authCookies = localStorage.getItem("authCookies");
        if (authCookies) {
          const userResponse = await fetch("http://localhost:4000/api/auth/user", {
            method: "GET",
            headers: {
              "Cookie": authCookies,
            },
          });

          if (userResponse.ok) {
            const userData = await userResponse.json();
            localStorage.setItem("userInfo", JSON.stringify(userData)); // Store user info
            router.push("/dashboard"); // Redirect to Dashboard
          } else {
            console.error("Failed to authenticate user.");
            // Call init if needed...
          }
        }
      } else {
        console.error("Sign-in failed");
        // Call init if needed...
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      // Call init if needed...
    }
  };

  return (
    <>
      {/* Header */}
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="IBM Security Verify Access" />
      </Appbar.Header>

      {/* Main Content */}
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="headlineSmall" style={styles.title}>
              Sign In
            </Text>
            <TextInput
              label="Username"
              value={username}
              onChangeText={setUsername}
              style={[styles.input, styles.button, { width: "40%",alignSelf: "center"}]}
              mode="outlined"
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={[styles.input, styles.button, { width: "40%",alignSelf: "center"}]}
              mode="outlined"
            />
            <Button mode="contained" onPress={handleSignIn} style={[styles.button, { width: "25%" , alignSelf: "center"}]}>   
              Sign In
            </Button>
          </Card.Content>
        </Card>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© {new Date().getFullYear()} IBM Security. All rights reserved.</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#041E42",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#052F5F",
    borderRadius: 10,
    width: "50%",
    padding: 20,
  },
  title: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
  },
  button: {
    marginTop: 20,
  },
  footer: {
    backgroundColor: "#041E42",
    padding: 15,
    alignItems: "center",
  },
  footerText: {
    color: "#FFFFFF",
  },
});

export default SignIn;
