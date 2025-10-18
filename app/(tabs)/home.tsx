
import CustomModal from "@/components/Modal";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../contexts/ThemeContext";

export default function HomeScreen() {
  const { theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  
  const todayWorkout = {
    name: "Push Day",
    exercises: ["Bench Press", "Overhead Press", "Dips", "Tricep Extensions"],
    duration: "45 min",
    completed: false,
  };

  const quickStats = [
    { label: "This Week", value: "3 workouts" },
    { label: "Streak", value: "5 days" },
    { label: "Next Goal", value: "10 workouts" },
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
      backgroundColor: theme.colors.primary,
      padding: theme.spacing.xl,
      paddingTop: theme.spacing['4xl'],
    },
    greeting: {
      fontSize: theme.typography.fontSize['3xl'],
      fontWeight: 'bold' as const,
      color: theme.colors.text.inverse,
      marginBottom: theme.spacing.xs,
    },
    subtitle: {
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.text.inverse,
      opacity: 0.8,
    },
    todayWorkout: {
      margin: theme.spacing.lg,
    },
    sectionTitle: {
      fontSize: theme.typography.fontSize.xl,
      fontWeight: '600' as const,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.lg,
    },
    workoutCard: {
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.xl,
      borderRadius: theme.borderRadius.md,
      ...theme.shadows.sm,
    },
    workoutName: {
      fontSize: theme.typography.fontSize['2xl'],
      fontWeight: 'bold' as const,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.xs,
    },
    workoutDuration: {
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.text.secondary,
      marginBottom: theme.spacing.lg,
    },
    exercisesList: {
      marginBottom: theme.spacing.xl,
    },
    exerciseItem: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
      marginBottom: theme.spacing.xs,
    },
    startButton: {
      backgroundColor: theme.colors.primary,
      padding: theme.spacing.lg,
      borderRadius: theme.borderRadius.sm,
      alignItems: "center",
    },
    startButtonText: {
      color: theme.colors.text.inverse,
      fontSize: theme.typography.fontSize.base,
      fontWeight: '600' as const,
    },
    statsSection: {
      margin: theme.spacing.lg,
    },
    statsGrid: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    statCard: {
      backgroundColor: theme.colors.surface,
      flex: 1,
      padding: theme.spacing.lg,
      borderRadius: theme.borderRadius.md,
      marginHorizontal: theme.spacing.xs,
      alignItems: "center",
      ...theme.shadows.sm,
    },
    statValue: {
      fontSize: theme.typography.fontSize.lg,
      fontWeight: 'bold' as const,
      color: theme.colors.primary,
      marginBottom: theme.spacing.xs,
    },
    statLabel: {
      fontSize: theme.typography.fontSize.xs,
      color: theme.colors.text.secondary,
      textAlign: "center",
    },
    quickActions: {
      margin: theme.spacing.lg,
      marginBottom: theme.spacing['3xl'],
    },
    actionsGrid: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    actionButton: {
      backgroundColor: theme.colors.surface,
      flex: 1,
      padding: theme.spacing.xl,
      borderRadius: theme.borderRadius.md,
      marginHorizontal: theme.spacing.xs,
      alignItems: "center",
      ...theme.shadows.sm,
    },
    actionText: {
      fontSize: theme.typography.fontSize.base,
      fontWeight: '500' as const,
      color: theme.colors.primary,
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView}>
        {/* <View style={styles.header}>
          <Text style={styles.greeting}>Good morning!</Text>
          <Text style={styles.subtitle}>Ready for your workout?</Text>
        </View> */}

        <View style={styles.todayWorkout}>
          <Text style={styles.sectionTitle}>Today's Workout</Text>
          <View style={styles.workoutCard}>
            <Text style={styles.workoutName}>{todayWorkout.name}</Text>
            <Text style={styles.workoutDuration}>{todayWorkout.duration}</Text>
            <View style={styles.exercisesList}>
              {todayWorkout.exercises.map((exercise, index) => (
                <Text key={index} style={styles.exerciseItem}>• {exercise}</Text>
              ))}
            </View>
            <TouchableOpacity style={styles.startButton}>
              <Text style={styles.startButtonText}>
                {todayWorkout.completed ? "Completed" : "Start Workout"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <TouchableOpacity 
            style={styles.startButton}
            onPress = {() => setModalVisible(true)}
          >
            <Text style={styles.startButtonText}>Instant Workout</Text>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Quick Stats</Text>
          <View style={styles.statsGrid}>
            {quickStats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View> */}

        {/* <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionText}>Log Workout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionText}>View Progress</Text>
            </TouchableOpacity>
          </View>
        </View> */}
      </ScrollView>

      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Instant Workout"
      >
        <Text>Hello custom modal</Text>
      </CustomModal>
    </SafeAreaView>
  );
}