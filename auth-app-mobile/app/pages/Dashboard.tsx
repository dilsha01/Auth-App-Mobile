import React, { useEffect, useState } from "react";
import { View, ScrollView, Alert, StyleSheet, Platform } from "react-native";
import { Appbar, TextInput, Button, Card, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";

const Dashboard = () => {
  //const navigation = useNavigation();
  const router = useRouter();
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
            employeeCode: parsedData["urn:custom:attributes"]?.employeeCode || "",
          certificates: Array.isArray(parsedData["urn:custom:attributes"]?.certificates) 
            ? parsedData["urn:custom:attributes"].certificates 
            : [], 
          });
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchUserInfo();
  }, []);

  interface AuthCookies {
    authCookies: string;
  }

  interface OriginalData {
    displayName?: string;
    userName?: string;
    title?: string;
    "urn:custom:attributes"?: {
      employeeCode?: string;
      certificates?: string[];
    };
  }

  interface UpdatedUserInfo extends OriginalData {
    displayName: string;
    userName: string;
    title: string;
    "urn:custom:attributes": {
      employeeCode: string;
      certificates: string[];
    };
  }

  const handleUpdate = async (): Promise<void> => {
    try {
      const authCookies = await AsyncStorage.getItem("authCookies");
      if (!authCookies) {
        Alert.alert("Error", "You are not logged in. Please log in and try again.");
        return;
      }

      const storedUserInfo = await AsyncStorage.getItem("userInfo");
      const originalData: OriginalData = storedUserInfo ? JSON.parse(storedUserInfo) : {};
      console.log("originalData", originalData);
      console.log("userInfo", userInfo);

      const updatedUserInfo: UpdatedUserInfo = {
        ...originalData,
        displayName: userInfo.displayName,
        userName: userInfo.userName,
        title: userInfo.title,
        "urn:custom:attributes": {
          employeeCode: userInfo.employeeCode,
          certificates: userInfo.certificates,
        },
      };

      const API_BASE_URL =
        Platform.OS === "ios" || Platform.OS === "android"
          ? "http://192.168.x.x:4000" // Replace with your local network IP
          : "http://localhost:4000";

      const response = await fetch(`${API_BASE_URL}/api/auth/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: authCookies, // Ensure all required cookies are included
        },
        body: JSON.stringify(updatedUserInfo),
      });

      if (response.ok) {
        await AsyncStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
        Alert.alert("Success", "User info updated successfully!");
        router.push("/signout"); // Redirect to logout screen
      } else {
        const errorResponse = await response.json();
        console.error("Failed to update user info:", errorResponse);
        Alert.alert("Update failed", errorResponse.detail || "Unknown error");
      }
    } catch (error) {
      console.error("Error during update:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    }
  };

  interface UserInfo {
    displayName: string;
    userName: string;
    title: string;
    id: string;
    email: string;
    organization: string;
    department: string;
    phoneNumber: string;
    employeeCode: string;
    certificates: string[];
  }

  const handleChange = (name: keyof UserInfo, value: string | string[]) => {
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
            <TextInput label="Display Name" value={userInfo.displayName} style={[styles.input, styles.button, { width: "50%" , alignSelf: "center"}]} onChangeText={(text) => handleChange("displayName", text)} />
            <TextInput label="Username" value={userInfo.userName} style={[styles.input, styles.button, { width: "50%" , alignSelf: "center"}]}  onChangeText={(text) => handleChange("userName", text)} />
            <TextInput label="Title" value={userInfo.title} style={[styles.input, styles.button, { width: "50%" , alignSelf: "center"}]}  onChangeText={(text) => handleChange("title", text)} />
            <TextInput label="Email" value={userInfo.email} style={[styles.input, styles.button, { width: "50%" , alignSelf: "center"}]}  onChangeText={(text) => handleChange("email", text)} keyboardType="email-address" />
            {/* <TextInput label="Phone Number" value={userInfo.phoneNumber} style={[styles.input, styles.button, { width: "50%" , alignSelf: "center"}]}  onChangeText={(text) => handleChange("phoneNumber", text)} keyboardType="phone-pad" />
            <TextInput label="Organization" value={userInfo.organization} style={[styles.input, styles.button, { width: "50%" , alignSelf: "center"}]}  onChangeText={(text) => handleChange("organization", text)} />
            <TextInput label="Department" value={userInfo.department} style={[styles.input, styles.button, { width: "50%" , alignSelf: "center"}]}  onChangeText={(text) => handleChange("department", text)} /> */}
            <TextInput label="Employee Code" value={userInfo.employeeCode} style={[styles.input, styles.button, { width: "50%" , alignSelf: "center"}]} onChangeText={(text) => handleChange("employeeCode", text)} />
            <TextInput label="Certificates" value={userInfo.certificates.join(", ")} style={[styles.input, styles.button, { width: "50%" , alignSelf: "center"}]} onChangeText={(text) => handleChange("certificates", text.split(","))} />
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" onPress={() => handleUpdate()}>Update</Button>
            <Button onPress={() => router.push("/signout")}>Logout</Button>
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
  button: {
    marginBottom: 10,
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  card: {
    width: "75%",
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
});

export default Dashboard;
