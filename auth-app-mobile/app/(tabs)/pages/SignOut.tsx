import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Button, Card, Text, Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const SignOut = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    localStorage.clear(); // Clear local storage
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, "=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;");
    });
    navigation.navigate("Home"); // Redirect to home
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
              Successfully Checked SCIM API Demo
            </Text>
            <Button
              icon="logout"
              mode="contained"
              onPress={handleLogout}
              style={styles.button}
            >
              Click here to Logout
            </Button>
          </Card.Content>
        </Card>
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
    width: "90%",
    padding: 20,
  },
  title: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
});

export default SignOut;
