import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import exercisesData from "../../assets/data/exercises.json";

export default function ExercisesScreen() {
  const router = useRouter();

  const renderExercise = ({ item }) => (
    <TouchableOpacity
      style={styles.exerciseCard}
      onPress={() => router.push(`/exercise-detail/${item.id}`)}
    >
      <View style={styles.exerciseHeader}>
        <Text style={styles.exerciseName}>{item.name}</Text>
        <View style={[styles.difficultyBadge, getDifficultyStyle(item.difficulty)]}>
          <Text style={styles.difficultyText}>{item.difficulty}</Text>
        </View>
      </View>
      
      <Text style={styles.exerciseCategory}>{item.category}</Text>
      
      <View style={styles.muscleGroups}>
        {item.muscleGroups.map((muscle, index) => (
          <View key={index} style={styles.muscleTag}>
            <Text style={styles.muscleText}>{muscle}</Text>
          </View>
        ))}
      </View>
      
      <Text style={styles.exerciseDescription} numberOfLines={2}>
        {item.description}
      </Text>
      
      <View style={styles.exerciseFooter}>
        <Text style={styles.equipmentText}>{item.equipment}</Text>
        <Text style={styles.arrowText}>→</Text>
      </View>
    </TouchableOpacity>
  );

  const getDifficultyStyle = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return { backgroundColor: "#34C759" };
      case "Intermediate":
        return { backgroundColor: "#FF9500" };
      case "Advanced":
        return { backgroundColor: "#FF3B30" };
      default:
        return { backgroundColor: "#8E8E93" };
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Exercises</Text>
        <Text style={styles.subtitle}>Choose an exercise to learn more</Text>
      </View>
      
      <FlatList
        data={exercisesData}
        renderItem={renderExercise}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  header: {
    backgroundColor: "#FFFFFF",
    padding: 20,
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
  listContainer: {
    padding: 15,
  },
  exerciseCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  exerciseCategory: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
    marginBottom: 10,
  },
  muscleGroups: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  muscleTag: {
    backgroundColor: "#F2F2F7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 6,
    marginBottom: 4,
  },
  muscleText: {
    fontSize: 12,
    color: "#8E8E93",
    fontWeight: "500",
  },
  exerciseDescription: {
    fontSize: 14,
    color: "#8E8E93",
    lineHeight: 20,
    marginBottom: 15,
  },
  exerciseFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  equipmentText: {
    fontSize: 14,
    color: "#8E8E93",
    fontWeight: "500",
  },
  arrowText: {
    fontSize: 18,
    color: "#C7C7CC",
    fontWeight: "300",
  },
});
