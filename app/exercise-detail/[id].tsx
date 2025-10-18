import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import exercisesData from "../../assets/data/exercises.json";

export default function ExerciseDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const exercise = exercisesData.find(ex => ex.id === id);

  if (!exercise) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Exercise not found</Text>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const getDifficultyStyle = (level: string) => {
    switch (level?.toLowerCase()) {
      case "beginner":
        return { backgroundColor: "#10B981" };
      case "intermediate":
        return { backgroundColor: "#F59E0B" };
      case "expert":
        return { backgroundColor: "#EF4444" };
      default:
        return { backgroundColor: "#9CA3AF" };
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Exercise Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.exerciseHeader}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <View style={[styles.difficultyBadge, getDifficultyStyle(exercise.level)]}>
              <Text style={styles.difficultyText}>{exercise.level}</Text>
            </View>
          </View>

          <Text style={styles.exerciseCategory}>{exercise.category}</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Primary Muscles</Text>
            <View style={styles.muscleGroups}>
              {exercise.primaryMuscles.map((muscle, index) => (
                <View key={index} style={styles.muscleTag}>
                  <Text style={styles.muscleText}>{muscle}</Text>
                </View>
              ))}
            </View>
          </View>

          {exercise.secondaryMuscles.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Secondary Muscles</Text>
              <View style={styles.muscleGroups}>
                {exercise.secondaryMuscles.map((muscle, index) => (
                  <View key={index} style={[styles.muscleTag, styles.secondaryMuscleTag]}>
                    <Text style={styles.muscleText}>{muscle}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Equipment</Text>
            <Text style={styles.equipmentText}>{exercise.equipment}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Exercise Type</Text>
            <View style={styles.exerciseInfo}>
              <Text style={styles.infoText}>Force: {exercise.force}</Text>
              <Text style={styles.infoText}>Mechanic: {exercise.mechanic || 'N/A'}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            {exercise.instructions.map((instruction, index) => (
              <View key={index} style={styles.instructionItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.instructionText}>{instruction}</Text>
              </View>
            ))}
          </View>

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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
  },
  placeholder: {
    width: 34,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  exerciseName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000",
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  difficultyText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  exerciseCategory: {
    fontSize: 18,
    color: "#007AFF",
    fontWeight: "500",
    marginBottom: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 12,
  },
  muscleGroups: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  muscleTag: {
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  muscleText: {
    fontSize: 14,
    color: "#1976D2",
    fontWeight: "500",
  },
  secondaryMuscleTag: {
    backgroundColor: "#F3F4F6",
    opacity: 0.7,
  },
  exerciseInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoText: {
    fontSize: 16,
    color: "#8E8E93",
    fontWeight: "500",
  },
  equipmentText: {
    fontSize: 16,
    color: "#8E8E93",
    fontWeight: "500",
  },
  descriptionText: {
    fontSize: 16,
    color: "#8E8E93",
    lineHeight: 24,
  },
  instructionItem: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "flex-start",
  },
  stepNumber: {
    backgroundColor: "#007AFF",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  instructionText: {
    fontSize: 16,
    color: "#8E8E93",
    lineHeight: 24,
    flex: 1,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  tipText: {
    fontSize: 16,
    color: "#8E8E93",
    lineHeight: 24,
    marginLeft: 8,
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "#8E8E93",
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "500",
  },
});
