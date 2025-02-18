// import React from "react";
// import { View, StyleSheet, Alert } from "react-native";
// import { Button, Card, Text, Appbar } from "react-native-paper";
// import { useNavigation } from "@react-navigation/native";
// import { useRouter } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const SignOut = () => {
//   //const navigation = useNavigation();
//   const router = useRouter();

//   const handleLogout = () => {
//     AsyncStorage.clear(); // Clear local storage
//     document.cookie.split(";").forEach((cookie) => {
//       document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, "=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;");
//     });
//     router.push("/"); // Redirect to home
//   };

//   return (
//     <>
//       {/* Header */}
//       <Appbar.Header style={styles.header}>
//         <Appbar.Content title="IBM Security Verify Access" />
//       </Appbar.Header>

//       {/* Main Content */}
//       <View style={styles.container}>
//         <Card style={styles.card}>
//           <Card.Content>
//             <Text variant="headlineSmall" style={styles.title}>
//               Successfully Checked SCIM API Demo
//             </Text>
//             <Button
//               icon="logout"
//               mode="contained"
//               onPress={handleLogout}
//               style={styles.button}
//             >
//               Click here to Logout
//             </Button>
//           </Card.Content>
//         </Card>
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     backgroundColor: "#041E42",
//   },
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   card: {
//     backgroundColor: "#052F5F",
//     borderRadius: 10,
//     width: "90%",
//     padding: 20,
//   },
//   title: {
//     textAlign: "center",
//     color: "#FFFFFF",
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   button: {
//     marginTop: 20,
//   },
// });

// export default SignOut;

import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Button, Card, Text, Appbar } from "react-native-paper";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignOut: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear(); // Clear all stored user data
      Alert.alert("Logged Out", "You have been signed out successfully.");
      router.push("/"); // Redirect to home
    } catch (error) {
      console.error("Logout Error:", error);
      Alert.alert("Error", "Failed to sign out. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="IBM Security Verify Access" titleStyle={styles.headerTitle} />
      </Appbar.Header>

      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.title}>Successfully Checked SCIM API Demo</Text>
            <Button icon="logout" mode="contained" onPress={handleLogout} style={styles.button}>
              Click here to Logout
            </Button>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#041E42",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#052F5F",
    borderRadius: 10,
    padding: 20,
    width: "90%",
  },
  title: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
});

export default SignOut;
