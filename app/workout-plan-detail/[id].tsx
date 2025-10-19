import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';
import { useWorkout } from '../../contexts/WorkoutContext';

export default function WorkoutPlanDetailScreen() {
  const { theme } = useTheme();
  const { workoutPlans, deleteDayFromPlan, addExerciseToDay, deleteExerciseFromDay } = useWorkout();
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const plan = workoutPlans.find((p: any) => p.id === id);

  if (!plan) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: theme.colors.text.primary, fontSize: 18 }}>Plan not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: theme.colors.primary, marginTop: 16 }}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleDeleteDay = (dayId: string, dayName: string) => {
    Alert.alert(
      'Delete Day',
      `Are you sure you want to delete "${dayName}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteDayFromPlan(plan.id, dayId),
        },
      ]
    );
  };

  const handleAddExercise = (dayId: string) => {
    // For now, we'll add a placeholder exercise
    // In a real app, you'd navigate to an exercise selection screen
    const exerciseName = prompt('Enter exercise name:');
    if (exerciseName) {
      addExerciseToDay(plan.id, dayId, {
        name: exerciseName,
        sets: 3,
        reps: 10,
      });
    }
  };

  const handleDeleteExercise = (dayId: string, exerciseId: string, exerciseName: string) => {
    Alert.alert(
      'Delete Exercise',
      `Are you sure you want to delete "${exerciseName}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteExerciseFromDay(plan.id, dayId, exerciseId),
        },
      ]
    );
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
    planInfo: {
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.lg,
      borderRadius: theme.borderRadius.md,
      marginBottom: theme.spacing.xl,
      ...theme.shadows.sm,
    },
    planName: {
      fontSize: theme.typography.fontSize['2xl'],
      fontWeight: 'bold' as const,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.sm,
    },
    planDescription: {
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.text.secondary,
      marginBottom: theme.spacing.lg,
    },
    planStats: {
      flexDirection: 'row',
      justifyContent: 'space-around',
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
    },
    daysList: {
      gap: theme.spacing.lg,
    },
    dayCard: {
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.lg,
      borderRadius: theme.borderRadius.md,
      ...theme.shadows.sm,
    },
    dayHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
    },
    dayName: {
      fontSize: theme.typography.fontSize.xl,
      fontWeight: 'bold' as const,
      color: theme.colors.text.primary,
    },
    dayActions: {
      flexDirection: 'row',
      gap: theme.spacing.sm,
    },
    actionButton: {
      padding: theme.spacing.sm,
      borderRadius: theme.borderRadius.sm,
    },
    addExerciseButton: {
      backgroundColor: theme.colors.primary,
    },
    deleteDayButton: {
      backgroundColor: theme.colors.error,
    },
    actionButtonText: {
      fontSize: theme.typography.fontSize.sm,
      fontWeight: '500' as const,
      color: theme.colors.text.inverse,
    },
    restDayText: {
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.text.secondary,
      fontStyle: 'italic',
      textAlign: 'center',
      padding: theme.spacing.xl,
    },
    exercisesList: {
      gap: theme.spacing.sm,
    },
    exerciseItem: {
      backgroundColor: theme.colors.background,
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.sm,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    exerciseInfo: {
      flex: 1,
    },
    exerciseName: {
      fontSize: theme.typography.fontSize.base,
      fontWeight: '500' as const,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.xs,
    },
    exerciseDetails: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
    },
    deleteExerciseButton: {
      backgroundColor: theme.colors.error,
      padding: theme.spacing.sm,
      borderRadius: theme.borderRadius.sm,
    },
    deleteExerciseButtonText: {
      color: theme.colors.text.inverse,
      fontSize: theme.typography.fontSize.xs,
      fontWeight: '500' as const,
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>{plan.name}</Text>
        <Text style={styles.subtitle}>Manage your workout routine</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.planInfo}>
            <Text style={styles.planName}>{plan.name}</Text>
            {plan.description && (
              <Text style={styles.planDescription}>{plan.description}</Text>
            )}
            <View style={styles.planStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{plan.days.length}</Text>
                <Text style={styles.statLabel}>Days</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {plan.days.reduce((total: number, day: any) => total + day.exercises.length, 0)}
                </Text>
                <Text style={styles.statLabel}>Exercises</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {plan.days.filter((day: any) => day.isRestDay).length}
                </Text>
                <Text style={styles.statLabel}>Rest Days</Text>
              </View>
            </View>
          </View>

          <View style={styles.daysList}>
            {plan.days.map((day: any) => (
              <View key={day.id} style={styles.dayCard}>
                <View style={styles.dayHeader}>
                  <Text style={styles.dayName}>{day.name}</Text>
                  <View style={styles.dayActions}>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.addExerciseButton]}
                      onPress={() => handleAddExercise(day.id)}
                    >
                      <Text style={styles.actionButtonText}>+ Exercise</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.deleteDayButton]}
                      onPress={() => handleDeleteDay(day.id, day.name)}
                    >
                      <Text style={styles.actionButtonText}>Delete Day</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {day.isRestDay ? (
                  <Text style={styles.restDayText}>Rest Day</Text>
                ) : (
                  <View style={styles.exercisesList}>
                    {day.exercises.length === 0 ? (
                      <Text style={{ color: theme.colors.text.secondary, textAlign: 'center', padding: theme.spacing.lg }}>
                        No exercises added yet
                      </Text>
                    ) : (
                      day.exercises.map((exercise: any) => (
                        <View key={exercise.id} style={styles.exerciseItem}>
                          <View style={styles.exerciseInfo}>
                            <Text style={styles.exerciseName}>{exercise.name}</Text>
                            <Text style={styles.exerciseDetails}>
                              {exercise.sets && exercise.reps 
                                ? `${exercise.sets} sets × ${exercise.reps} reps`
                                : exercise.duration 
                                ? `${Math.floor(exercise.duration / 60)}:${(exercise.duration % 60).toString().padStart(2, '0')}`
                                : 'No details'
                              }
                            </Text>
                          </View>
                          <TouchableOpacity
                            style={styles.deleteExerciseButton}
                            onPress={() => handleDeleteExercise(day.id, exercise.id, exercise.name)}
                          >
                            <Text style={styles.deleteExerciseButtonText}>Delete</Text>
                          </TouchableOpacity>
                        </View>
                      ))
                    )}
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
