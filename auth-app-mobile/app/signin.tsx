import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import SignInPage from "./pages/SignIn";

export default function SignIn() {
  const router = useRouter();

  return (
      <SignInPage/>

  );
}
