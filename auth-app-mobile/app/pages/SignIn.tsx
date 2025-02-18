import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Appbar, Card, TextInput, Button, Text } from "react-native-paper";
//import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const navigation = useNavigation();
  const router = useRouter();
  const BASE_URL = "http://172.20.10.6:4000";   

  // const handleSignIn = async () => {
  //   console.log("Signing in...");
  //   const stateId =AsyncStorage.getItem("stateId");
  //   if (!stateId) {
  //     console.error("State ID is missing. Please log in first.");
  //     return;
  //   }
  //   try {
  //     console.log("Signing in.2..");
  //     const response = await fetch(`${BASE_URL}/api/auth/login`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Accept": "application/json",
  //       },
  //       body: JSON.stringify({ username, password, stateId }),
  //     });
  //     console.log("Signing in.3..");
  //     console.log("response", response);
  //     if (response.ok || response.status === 200) {
  //       console.log("Sign-in successful");
  //       const data = await response.json();
  //       if (data.cookies) {
  //         AsyncStorage.setItem("authCookies", data.cookies);
  //       }

  //       const authCookies = await AsyncStorage.getItem("authCookies");
  //       if (authCookies) {
  //         console.log("Auth cookies:", authCookies);
  //         const userResponse = await fetch(`${BASE_URL}/api/auth/user`, {
  //           method: "GET",
  //           headers: {
  //             "Cookie": authCookies || "",
  //           },
  //         });

  //         if (userResponse.ok) {
  //           const userData = await userResponse.json();
  //           AsyncStorage.setItem("userInfo", JSON.stringify(userData)); // Store user info
  //           router.push("/dashboard"); // Redirect to Dashboard
  //         } else {
  //           console.error("Failed to authenticate user.");
  //           // Call init if needed...
  //         }
  //       }
  //     } else {
  //       console.error("Sign-in failed");
  //       // Call init if needed...
  //     }
  //   } catch (error) {
  //     console.error("Error during sign-in:", error);
  //     // Call init if needed...
  //   }
  // };

  const handleSignIn = async () => {
    console.log("Signing in...");
    
    const stateId = await AsyncStorage.getItem("stateId"); // Await needed!
    if (!stateId) {
      console.error("State ID is missing. Please log in first.");
      Alert.alert("Error", "State ID is missing. Please try again.");
      return;
    }
  
    try {
      console.log("Signing in.2..");
      const requestBody = JSON.stringify({ username, password, stateId });
      console.log("Request Body:", requestBody);
  
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: requestBody,
      });
  
      console.log("Signing in.3..");
      console.log("Response Status:", response.status);
  
      if (response.ok) {
        console.log("Sign-in successful");
        const data = await response.json();
        
        if (data.cookies) {
          await AsyncStorage.setItem("authCookies", data.cookies);
        }
  
        const authCookies = await AsyncStorage.getItem("authCookies");
        if (authCookies) {
          console.log("Auth cookies:", authCookies);
          const userResponse = await fetch(`${BASE_URL}/api/auth/user`, {
            method: "GET",
            headers: { "Cookie": authCookies || "" },
          });
  
          if (userResponse.ok) {
            const userData = await userResponse.json();
            await AsyncStorage.setItem("userInfo", JSON.stringify(userData));
            router.push("/dashboard");
          } else {
            console.error("Failed to authenticate user.");
          }
        }
      } else {
        const errorText = await response.text();
        console.error("Sign-in failed. Server response:", errorText);
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };
  
  return (
    <>
      {/* Header */}
      <Appbar.Header style={styles.header}>
              <Appbar.Content title="IBM Security Verify Access" titleStyle={styles.headerTitle} />
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
              style={[styles.input, styles.button, { width: "70%",alignSelf: "center"}]}
              mode="outlined"
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={[styles.input, styles.button, { width: "70%",alignSelf: "center"}]}
              mode="outlined"
            />
            <Button mode="contained" onPress={handleSignIn} style={[styles.button, { width: "50%" , alignSelf: "center"}]}>   
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
  headerTitle: {
    color: "#FFFFFF", // Ensure title is visible
    fontWeight: "bold",
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
