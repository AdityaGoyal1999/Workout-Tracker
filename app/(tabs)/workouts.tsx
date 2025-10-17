import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../contexts/ThemeContext";

export default function WorkoutsScreen() {
  const { theme } = useTheme();
  const workouts = [
    { id: 1, name: "Push Day", exercises: 6, duration: "45 min" },
    { id: 2, name: "Pull Day", exercises: 5, duration: "40 min" },
    { id: 3, name: "Leg Day", exercises: 8, duration: "60 min" },
    { id: 4, name: "Cardio", exercises: 3, duration: "30 min" },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollView: {
      flex: 1,
    },
    header: {
      padding: theme.spacing.xl,
      backgroundColor: theme.colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    title: {
      fontSize: theme.typography.fontSize['3xl'],
      fontWeight: 'bold' as const,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.xs,
    },
    subtitle: {
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.text.secondary,
    },
    workoutCard: {
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.xl,
      borderRadius: theme.borderRadius.md,
      margin: theme.spacing.lg,
      ...theme.shadows.sm,
    },
    workoutName: {
      fontSize: theme.typography.fontSize.xl,
      fontWeight: '600' as const,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.md,
    },
    workoutDetails: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    detailText: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>My Workouts</Text>
          <Text style={styles.subtitle}>Choose a workout to start</Text>
        </View>
        
        {workouts.map((workout) => (
          <View key={workout.id} style={styles.workoutCard}>
            <Text style={styles.workoutName}>{workout.name}</Text>
            <View style={styles.workoutDetails}>
              <Text style={styles.detailText}>{workout.exercises} exercises</Text>
              <Text style={styles.detailText}>{workout.duration}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
