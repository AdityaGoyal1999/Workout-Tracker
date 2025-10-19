import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../contexts/ThemeContext";

interface Exercise {
  id: string;
  name: string;
  sets?: number;
  reps?: number;
  weight?: number;
  duration?: number;
  notes?: string;
}

interface WorkoutData {
  name: string;
  exercises: Exercise[];
  completed: boolean;
}

export default function WorkoutPage() {
  const { theme } = useTheme();
  const { workoutData } = useLocalSearchParams<{ workoutData: string }>();
  
  // Parse the workout data from the navigation params
  const todayWorkout: WorkoutData = workoutData ? JSON.parse(workoutData) : {
    name: "No workout data",
    exercises: [],
    completed: false,
  };

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
    title: {
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
    content: {
      padding: theme.spacing.lg,
    },
    workoutCard: {
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.xl,
      borderRadius: theme.borderRadius.md,
      marginBottom: theme.spacing.xl,
      ...theme.shadows.sm,
    },
    workoutName: {
      fontSize: theme.typography.fontSize['2xl'],
      fontWeight: 'bold' as const,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.lg,
      textAlign: 'center',
    },
    workoutStats: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: theme.spacing.xl,
      paddingVertical: theme.spacing.md,
      backgroundColor: theme.colors.background,
      borderRadius: theme.borderRadius.sm,
    },
    statItem: {
      alignItems: 'center',
    },
    statValue: {
      fontSize: theme.typography.fontSize.xl,
      fontWeight: 'bold' as const,
      color: theme.colors.primary,
    },
    statLabel: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
      marginTop: theme.spacing.xs,
    },
    exercisesList: {
      gap: theme.spacing.lg,
    },
    exerciseCard: {
      backgroundColor: theme.colors.background,
      padding: theme.spacing.lg,
      borderRadius: theme.borderRadius.md,
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.primary,
    },
    exerciseName: {
      fontSize: theme.typography.fontSize.lg,
      fontWeight: 'bold' as const,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.md,
    },
    exerciseDetails: {
      gap: theme.spacing.sm,
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    detailLabel: {
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.text.secondary,
      flex: 1,
    },
    detailValue: {
      fontSize: theme.typography.fontSize.base,
      fontWeight: '600' as const,
      color: theme.colors.text.primary,
      flex: 1,
      textAlign: 'right',
    },
    setsRepsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: theme.spacing.sm,
    },
    setsRepsItem: {
      flex: 1,
      alignItems: 'center',
      padding: theme.spacing.sm,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.sm,
      marginHorizontal: theme.spacing.xs,
    },
    setsRepsValue: {
      fontSize: theme.typography.fontSize.lg,
      fontWeight: 'bold' as const,
      color: theme.colors.primary,
    },
    setsRepsLabel: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
      marginTop: theme.spacing.xs,
    },
    weightContainer: {
      alignItems: 'center',
      marginTop: theme.spacing.sm,
      padding: theme.spacing.md,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.sm,
    },
    weightValue: {
      fontSize: theme.typography.fontSize['2xl'],
      fontWeight: 'bold' as const,
      color: theme.colors.primary,
    },
    weightLabel: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
      marginTop: theme.spacing.xs,
    },
    durationContainer: {
      alignItems: 'center',
      marginTop: theme.spacing.sm,
      padding: theme.spacing.md,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.sm,
    },
    durationValue: {
      fontSize: theme.typography.fontSize.lg,
      fontWeight: 'bold' as const,
      color: theme.colors.primary,
    },
    durationLabel: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
      marginTop: theme.spacing.xs,
    },
    noExercisesText: {
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.text.secondary,
      textAlign: 'center',
      fontStyle: 'italic',
      padding: theme.spacing.xl,
    },
  });

  // Calculate workout statistics
  const totalExercises = todayWorkout.exercises.length;
  const totalSets = todayWorkout.exercises.reduce((sum, exercise) => sum + (exercise.sets || 0), 0);
  const totalReps = todayWorkout.exercises.reduce((sum, exercise) => sum + ((exercise.sets || 0) * (exercise.reps || 0)), 0);

  const renderExercise = (exercise: Exercise, index: number) => {
    const hasSetsReps = exercise.sets && exercise.reps;
    const hasWeight = exercise.weight && exercise.weight > 0;
    const hasDuration = exercise.duration && exercise.duration > 0;

    return (
      <View key={exercise.id || index} style={styles.exerciseCard}>
        <Text style={styles.exerciseName}>{exercise.name}</Text>
        
        <View style={styles.exerciseDetails}>
          {hasSetsReps && (
            <View style={styles.setsRepsContainer}>
              <View style={styles.setsRepsItem}>
                <Text style={styles.setsRepsValue}>{exercise.sets}</Text>
                <Text style={styles.setsRepsLabel}>Sets</Text>
              </View>
              <View style={styles.setsRepsItem}>
                <Text style={styles.setsRepsValue}>{exercise.reps}</Text>
                <Text style={styles.setsRepsLabel}>Reps</Text>
              </View>
            </View>
          )}

          {hasWeight && (
            <View style={styles.weightContainer}>
              <Text style={styles.weightValue}>{exercise.weight} lbs</Text>
              <Text style={styles.weightLabel}>Weight</Text>
            </View>
          )}

          {hasDuration && (
            <View style={styles.durationContainer}>
              <Text style={styles.durationValue}>
                {Math.floor(exercise.duration! / 60)}:{(exercise.duration! % 60).toString().padStart(2, '0')}
              </Text>
              <Text style={styles.durationLabel}>Duration</Text>
            </View>
          )}

          {exercise.notes && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Notes:</Text>
              <Text style={styles.detailValue}>{exercise.notes}</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Workout</Text>
        <Text style={styles.subtitle}>Let's get started!</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.workoutCard}>
            <Text style={styles.workoutName}>{todayWorkout.name}</Text>
            
            {/* Workout Statistics */}
            <View style={styles.workoutStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{totalExercises}</Text>
                <Text style={styles.statLabel}>Exercises</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{totalSets}</Text>
                <Text style={styles.statLabel}>Sets</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{totalReps}</Text>
                <Text style={styles.statLabel}>Reps</Text>
              </View>
            </View>
            
            {/* Exercises List */}
            <View style={styles.exercisesList}>
              {todayWorkout.exercises.length > 0 ? (
                todayWorkout.exercises.map((exercise, index) => renderExercise(exercise, index))
              ) : (
                <Text style={styles.noExercisesText}>No exercises planned for this workout</Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}