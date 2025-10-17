import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../contexts/ThemeContext";

export default function IndexScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    // Simulate checking if user is already logged in
    // In a real app, you would check AsyncStorage or your auth state here
    const timer = setTimeout(() => {
      router.replace("/auth");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: theme.spacing.xl,
    },
    logoContainer: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: theme.colors.surface,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: theme.spacing['3xl'],
      ...theme.shadows.lg,
    },
    title: {
      fontSize: theme.typography.fontSize['4xl'],
      fontWeight: 'bold' as const,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.md,
      textAlign: "center",
    },
    subtitle: {
      fontSize: theme.typography.fontSize.xl,
      color: theme.colors.text.secondary,
      textAlign: "center",
      lineHeight: theme.typography.lineHeight.normal,
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Ionicons name="fitness" size={80} color={theme.colors.primary} />
        </View>
        <Text style={styles.title}>Workout Tracker</Text>
        <Text style={styles.subtitle}>Your fitness journey starts here</Text>
      </View>
    </SafeAreaView>
  );
}
