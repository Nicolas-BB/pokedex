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
        <Stack.Screen name="index" options={{ title: 'Pokemons' }} />
        <Stack.Screen name="compare" options={{ title: 'Comparar' }} />
        <Stack.Screen name="pokemon/[name]" options={{ title: 'Detalhes' }} />
      </Stack>
    </SafeAreaProvider>
  );
}
