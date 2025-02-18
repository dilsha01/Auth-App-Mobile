import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import HomePage from "./pages/Home";

export default function Home() {
  const router = useRouter();

  return (
    <View>
      <HomePage />
    </View>
  );
}
