import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProgressScreen() {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#8E8E93",
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 15,
    justifyContent: "space-between",
  },
  statCard: {
    backgroundColor: "#FFFFFF",
    width: "48%",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: "#8E8E93",
    textAlign: "center",
    marginBottom: 5,
  },
  statChange: {
    fontSize: 10,
    color: "#34C759",
    fontWeight: "600",
  },
  section: {
    backgroundColor: "#FFFFFF",
    margin: 15,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 15,
  },
  workoutItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  workoutName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
  },
  workoutDate: {
    fontSize: 14,
    color: "#8E8E93",
    marginTop: 2,
  },
  workoutDuration: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
  },
});
