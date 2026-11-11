import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#e3350d" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
          contentStyle: { backgroundColor: "#f5f5f7" },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="compare" options={{ title: 'Comparar' }} />
      </Stack>
    </SafeAreaProvider>
  );
}
