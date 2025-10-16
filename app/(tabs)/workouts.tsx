import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WorkoutsScreen() {
  const workouts = [
    { id: 1, name: "Push Day", exercises: 6, duration: "45 min" },
    { id: 2, name: "Pull Day", exercises: 5, duration: "40 min" },
    { id: 3, name: "Leg Day", exercises: 8, duration: "60 min" },
    { id: 4, name: "Cardio", exercises: 3, duration: "30 min" },
  ];

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
  workoutCard: {
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
  workoutName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 10,
  },
  workoutDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailText: {
    fontSize: 14,
    color: "#8E8E93",
  },
});
