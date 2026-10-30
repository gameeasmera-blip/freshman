import { Stack } from "expo-router";

import AuthProvider from "../context/authProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
 
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ title: "Home", headerShown: false }}
          />
          <Stack.Screen
            name="HomeScreen"
            options={{ title: "HomeScreen", headerShown: false }}
          />
          <Stack.Screen
            name="ProfileScreen"
            options={{ title: "ProfileScreen", headerShown: false }}
          />
          <Stack.Screen
            name="Payment"
            options={{ title: "Payment", headerShown: false }}
          />

          <Stack.Screen
            name="CourseDetailScreen"
            options={{ title: "CourseDetailScreen", headerShown: false }}
          />
          <Stack.Screen
            name="ContactAndCommentsScreen"
            options={{ title: "ContactAndCommentsScreen", headerShown: false }}
          />
          <Stack.Screen
            name="signUp"
            options={{ title: "Sign-Up", headerShown: false }}
          />
          <Stack.Screen
            name="Signin"
            options={{ title: "Sign-In", headerShown: false }}
          />
        </Stack>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
