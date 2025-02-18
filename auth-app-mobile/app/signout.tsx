import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import SignOutPage from "./pages/SignOut";

export default function SignIn() {
  const router = useRouter();

  return (
    <View>
      <SignOutPage/>
    </View>
  );
}
