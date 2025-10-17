import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import exercisesData from "../../assets/data/exercises.json";
import { useTheme } from "../../contexts/ThemeContext";

export default function ExercisesScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const renderExercise = ({ item }: { item: any }) => (
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
        {item.muscleGroups.map((muscle: string, index: number) => (
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

  const getDifficultyStyle = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return { backgroundColor: theme.colors.success };
      case "Intermediate":
        return { backgroundColor: theme.colors.warning };
      case "Advanced":
        return { backgroundColor: theme.colors.error };
      default:
        return { backgroundColor: theme.colors.text.tertiary };
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.xl,
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
    listContainer: {
      padding: theme.spacing.lg,
    },
    exerciseCard: {
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.xl,
      borderRadius: theme.borderRadius.md,
      marginBottom: theme.spacing.lg,
      ...theme.shadows.sm,
    },
    exerciseHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: theme.spacing.sm,
    },
    exerciseName: {
      fontSize: theme.typography.fontSize.xl,
      fontWeight: '600' as const,
      color: theme.colors.text.primary,
      flex: 1,
    },
    difficultyBadge: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.borderRadius.sm,
    },
    difficultyText: {
      fontSize: theme.typography.fontSize.xs,
      fontWeight: '600' as const,
      color: theme.colors.white,
    },
    exerciseCategory: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.primary,
      fontWeight: '500' as const,
      marginBottom: theme.spacing.md,
    },
    muscleGroups: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: theme.spacing.md,
    },
    muscleTag: {
      backgroundColor: theme.colors.gray[100],
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.borderRadius.sm,
      marginRight: theme.spacing.xs,
      marginBottom: theme.spacing.xs,
    },
    muscleText: {
      fontSize: theme.typography.fontSize.xs,
      color: theme.colors.text.secondary,
      fontWeight: '500' as const,
    },
    exerciseDescription: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
      lineHeight: theme.typography.lineHeight.normal,
      marginBottom: theme.spacing.lg,
    },
    exerciseFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    equipmentText: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
      fontWeight: '500' as const,
    },
    arrowText: {
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.text.tertiary,
      fontWeight: '300' as const,
    },
  });

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
