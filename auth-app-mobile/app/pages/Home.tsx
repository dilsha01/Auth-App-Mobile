// import React from "react";
// import { View, StyleSheet, ScrollView } from "react-native";
// import { Appbar, Card, Text, Button } from "react-native-paper";
// //import { useNavigation } from "@react-navigation/native";
// import LoginButton from "../components/LoginButton"; // Ensure this is React Native compatible
// import { useRouter } from "expo-router";


// const Home = () => {
//   //const navigation = useNavigation();
//   const router = useRouter();

//   return (
//     <>
//       {/* Header */}
//       <Appbar.Header style={styles.header}>
//         <Appbar.Content title="IBM Security Verify Access" />
//       </Appbar.Header>

//       {/* Main Content */}
//       <ScrollView contentContainerStyle={styles.container}>
//         <Card style={styles.card}>
//           <Card.Content>
//             <Text variant="headlineMedium" style={styles.title}>
//               Welcome to IBM Security Verify Access SCIM API Demo
//             </Text>
//             <Text style={styles.description}>
//               Experience secure and seamless user provisioning using SCIM (System for Cross-domain Identity Management). 
//               Our system ensures standardized and automated identity lifecycle management.
//             </Text>
//             <Text style={styles.description}>
//               Click the button below to authenticate securely and manage user identities using SCIM API:
//             </Text>
//             <View style={styles.buttonContainer}>
//               <LoginButton />
//             </View>
//           </Card.Content>
//         </Card>
//       </ScrollView>

//       {/* Footer */}
//       <View style={styles.footer}>
//         <Text style={styles.footerText}>© {new Date().getFullYear()} IBM Security. All rights reserved.</Text>
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     backgroundColor: "#041E42",
//   },
//   container: {
//     flexGrow: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   card: {
//     backgroundColor: "#052F5F",
//     borderRadius: 10,
//     padding: 20,
//     width: "90%",
//     alignItems: "center",
//   },
//   title: {
//     textAlign: "center",
//     fontWeight: "bold",
//     color: "#FFFFFF",
//     marginBottom: 10,
//   },
//   description: {
//     textAlign: "center",
//     color: "#FFFFFF",
//     marginBottom: 10,
//   },
//   buttonContainer: {
//     marginTop: 15,
//   },
//   footer: {
//     backgroundColor: "#041E42",
//     padding: 15,
//     alignItems: "center",
//   },
//   footerText: {
//     color: "#FFFFFF",
//   },
// });

// export default Home;

import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Appbar, Card, Text } from "react-native-paper";
import LoginButton from "../components/LoginButton"; // Ensure this is React Native compatible
import { useRouter } from "expo-router";

const Home = () => {
  const router = useRouter();

  return (
    <View style={styles.mainContainer}>
      {/* Header */}
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="IBM Security Verify Access" titleStyle={styles.headerTitle} />
      </Appbar.Header>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="headlineMedium" style={styles.title}>
              Welcome to IBM Security Verify Access SCIM API Demo
            </Text>
            <Text style={styles.description}>
              Experience secure and seamless user provisioning using SCIM (System for Cross-domain Identity Management).
              Our system ensures standardized and automated identity lifecycle management.
            </Text>
            <Text style={styles.description}>
              Click the button below to authenticate securely and manage user identities using SCIM API:
            </Text>
            <View style={styles.buttonContainer}>
              <LoginButton />
            </View>
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Fixed Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© {new Date().getFullYear()} IBM Security. All rights reserved.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#041E42",
  },
  headerTitle: {
    color: "#FFFFFF", // Ensure title is visible
    fontWeight: "bold",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#052F5F",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  description: {
    textAlign: "center",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 15,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#041E42",
    padding: 15,
    alignItems: "center",
  },
  footerText: {
    color: "#FFFFFF",
  },
});

export default Home;

