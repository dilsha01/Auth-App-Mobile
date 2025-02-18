import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import DashboardPage from "./pages/Dashboard";

export default function SignIn() {
  const router = useRouter();

  return (
    <View>
      <DashboardPage/>
    </View>
  );
}
