import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "../contexts/ThemeContext";
import { WorkoutProvider } from "../contexts/WorkoutContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <WorkoutProvider>
        <SafeAreaProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="auth" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="exercise-detail" options={{ headerShown: false }} />
            <Stack.Screen name="workout-plans" options={{ headerShown: false }} />
            <Stack.Screen name="create-workout-plan" options={{ headerShown: false }} />
            <Stack.Screen name="workout-plan-detail" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaProvider>
      </WorkoutProvider>
    </ThemeProvider>
  );
}
