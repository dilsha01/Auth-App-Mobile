import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Card } from "react-native-paper";

const UserProfile = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:4000/user", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  if (!user) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title={`Welcome, ${user.name}`} subtitle="User Profile" />
        <Card.Content>
          <Text>Email: {user.email}</Text>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    padding: 16,
    borderRadius: 8,
  },
});

export default UserProfile;
