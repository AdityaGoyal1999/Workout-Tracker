import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../contexts/ThemeContext";

export default function ProgressScreen() {
  const { theme } = useTheme();
  const stats = [
    { label: "Workouts Completed", value: "24", change: "+3 this week" },
    { label: "Total Time", value: "18h 30m", change: "+2h 15m" },
    { label: "Calories Burned", value: "2,450", change: "+320" },
    { label: "Personal Records", value: "5", change: "+2 this month" },
  ];

  const recentWorkouts = [
    { date: "Today", workout: "Push Day", duration: "45 min" },
    { date: "Yesterday", workout: "Cardio", duration: "30 min" },
    { date: "2 days ago", workout: "Pull Day", duration: "40 min" },
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
    statsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      padding: theme.spacing.lg,
      justifyContent: "space-between",
    },
    statCard: {
      backgroundColor: theme.colors.surface,
      width: "48%",
      padding: theme.spacing.lg,
      borderRadius: theme.borderRadius.md,
      marginBottom: theme.spacing.md,
      alignItems: "center",
      ...theme.shadows.sm,
    },
    statValue: {
      fontSize: theme.typography.fontSize['2xl'],
      fontWeight: 'bold' as const,
      color: theme.colors.primary,
      marginBottom: theme.spacing.xs,
    },
    statLabel: {
      fontSize: theme.typography.fontSize.xs,
      color: theme.colors.text.secondary,
      textAlign: "center",
      marginBottom: theme.spacing.xs,
    },
    statChange: {
      fontSize: theme.typography.fontSize.xs,
      color: theme.colors.success,
      fontWeight: '600' as const,
    },
    section: {
      backgroundColor: theme.colors.surface,
      margin: theme.spacing.lg,
      padding: theme.spacing.xl,
      borderRadius: theme.borderRadius.md,
      ...theme.shadows.sm,
    },
    sectionTitle: {
      fontSize: theme.typography.fontSize.xl,
      fontWeight: '600' as const,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.lg,
    },
    workoutItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.borderLight,
    },
    workoutName: {
      fontSize: theme.typography.fontSize.base,
      fontWeight: '500' as const,
      color: theme.colors.text.primary,
    },
    workoutDate: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
      marginTop: theme.spacing.xs,
    },
    workoutDuration: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.primary,
      fontWeight: '500' as const,
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Progress</Text>
          <Text style={styles.subtitle}>Track your fitness journey</Text>
        </View>

        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statChange}>{stat.change}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Workouts</Text>
          {recentWorkouts.map((workout, index) => (
            <View key={index} style={styles.workoutItem}>
              <View>
                <Text style={styles.workoutName}>{workout.workout}</Text>
                <Text style={styles.workoutDate}>{workout.date}</Text>
              </View>
              <Text style={styles.workoutDuration}>{workout.duration}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
