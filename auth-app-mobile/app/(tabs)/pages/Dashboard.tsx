import React, { useEffect, useState } from "react";
import { View, ScrollView, Alert, StyleSheet } from "react-native";
import { Appbar, TextInput, Button, Card, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Dashboard = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({
    displayName: "",
    userName: "",
    title: "",
    id: "",
    email: "",
    organization: "",
    department: "",
    phoneNumber: "",
    employeeCode: "",
    certificates: [],
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const storedUserInfo = await AsyncStorage.getItem("userInfo");
        if (storedUserInfo) {
          const parsedData = JSON.parse(storedUserInfo);
          setUserInfo({
            displayName: parsedData.displayName || "",
            userName: parsedData.userName || "",
            title: parsedData.title || "",
            id: parsedData.id || "",
            email: parsedData.emails?.[0]?.value || "",
            organization: parsedData.organization || "",
            department: parsedData.department || "",
            phoneNumber: parsedData.phoneNumbers?.[0]?.value || "",
            employeeCode: parsedData.employeeCode || "",
            certificates: Array.isArray(parsedData.certificates) ? parsedData.certificates : [],
          });
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchUserInfo();
  }, []);

  const handleUpdate = async () => {
    try {
      await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
      Alert.alert("Success", "User info updated successfully!");
      navigation.navigate("Login"); // Redirect to login or logout screen
    } catch (error) {
      console.error("Error updating user info:", error);
      Alert.alert("Error", "Failed to update user info");
    }
  };

  const handleChange = (name, value) => {
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="User Dashboard" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.card}>
          <Card.Title title={`Welcome, ${userInfo.displayName || "User"}`} />
          <Card.Content>
            <TextInput label="Display Name" value={userInfo.displayName} onChangeText={(text) => handleChange("displayName", text)} />
            <TextInput label="Username" value={userInfo.userName} onChangeText={(text) => handleChange("userName", text)} />
            <TextInput label="Title" value={userInfo.title} onChangeText={(text) => handleChange("title", text)} />
            <TextInput label="Email" value={userInfo.email} onChangeText={(text) => handleChange("email", text)} keyboardType="email-address" />
            <TextInput label="Phone Number" value={userInfo.phoneNumber} onChangeText={(text) => handleChange("phoneNumber", text)} keyboardType="phone-pad" />
            <TextInput label="Organization" value={userInfo.organization} onChangeText={(text) => handleChange("organization", text)} />
            <TextInput label="Department" value={userInfo.department} onChangeText={(text) => handleChange("department", text)} />
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" onPress={handleUpdate}>Update</Button>
            <Button onPress={() => navigation.navigate("Login")}>Logout</Button>
          </Card.Actions>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  card: {
    width: "100%",
    padding: 20,
  },
});

export default Dashboard;
