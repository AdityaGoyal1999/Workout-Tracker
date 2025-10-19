import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { useWorkout } from '../contexts/WorkoutContext';
import { WorkoutPlan } from '../types/workout';

export default function WorkoutPlansScreen() {
  const { theme } = useTheme();
  const { workoutPlans, deleteWorkoutPlan, setActivePlan } = useWorkout();
  const router = useRouter();

  const handleCreatePlan = () => {
    router.push('/create-workout-plan');
  };

  const handleViewPlan = (plan: WorkoutPlan) => {
    router.push(`/workout-plan-detail/${plan.id}`);
  };

  const handleDeletePlan = (plan: WorkoutPlan) => {
    Alert.alert(
      'Delete Workout Plan',
      `Are you sure you want to delete "${plan.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteWorkoutPlan(plan.id),
        },
      ]
    );
  };

  const handleSetActive = (plan: WorkoutPlan) => {
    setActivePlan(plan);
    Alert.alert('Success', `"${plan.name}" is now your active workout plan!`);
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
    createButton: {
      backgroundColor: theme.colors.primary,
      padding: theme.spacing.xl,
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
      marginBottom: theme.spacing.xl,
      ...theme.shadows.sm,
    },
    createButtonText: {
      color: theme.colors.text.inverse,
      fontSize: theme.typography.fontSize.lg,
      fontWeight: '600' as const,
    },
    plansList: {
      gap: theme.spacing.md,
    },
    planCard: {
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.lg,
      borderRadius: theme.borderRadius.md,
      ...theme.shadows.sm,
    },
    planHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: theme.spacing.sm,
    },
    planName: {
      fontSize: theme.typography.fontSize.xl,
      fontWeight: 'bold' as const,
      color: theme.colors.text.primary,
      flex: 1,
    },
    planActions: {
      flexDirection: 'row',
      gap: theme.spacing.sm,
    },
    actionButton: {
      padding: theme.spacing.sm,
      borderRadius: theme.borderRadius.sm,
    },
    actionButtonText: {
      fontSize: theme.typography.fontSize.sm,
      fontWeight: '500' as const,
    },
    viewButton: {
      backgroundColor: theme.colors.primary,
    },
    viewButtonText: {
      color: theme.colors.text.inverse,
    },
    setActiveButton: {
      backgroundColor: theme.colors.secondary,
    },
    setActiveButtonText: {
      color: theme.colors.text.inverse,
    },
    deleteButton: {
      backgroundColor: theme.colors.error,
    },
    deleteButtonText: {
      color: theme.colors.text.inverse,
    },
    planDescription: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
      marginBottom: theme.spacing.sm,
    },
    planStats: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    statItem: {
      alignItems: 'center',
    },
    statValue: {
      fontSize: theme.typography.fontSize.lg,
      fontWeight: 'bold' as const,
      color: theme.colors.primary,
    },
    statLabel: {
      fontSize: theme.typography.fontSize.xs,
      color: theme.colors.text.secondary,
    },
    emptyState: {
      alignItems: 'center',
      padding: theme.spacing['3xl'],
    },
    emptyStateText: {
      fontSize: theme.typography.fontSize.lg,
      color: theme.colors.text.secondary,
      textAlign: 'center',
      marginBottom: theme.spacing.lg,
    },
    emptyStateSubtext: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
      textAlign: 'center',
      opacity: 0.7,
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Workout Plans</Text>
        <Text style={styles.subtitle}>Create and manage your workout routines</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.createButton} onPress={handleCreatePlan}>
            <Text style={styles.createButtonText}>+ Create New Plan</Text>
          </TouchableOpacity>

          {workoutPlans.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No workout plans yet</Text>
              <Text style={styles.emptyStateSubtext}>
                Create your first workout plan to get started with structured training
              </Text>
            </View>
          ) : (
            <View style={styles.plansList}>
              {workoutPlans.map((plan) => (
                <View key={plan.id} style={styles.planCard}>
                  <View style={styles.planHeader}>
                    <Text style={styles.planName}>{plan.name}</Text>
                    <View style={styles.planActions}>
                      <TouchableOpacity
                        style={[styles.actionButton, styles.viewButton]}
                        onPress={() => handleViewPlan(plan)}
                      >
                        <Text style={[styles.actionButtonText, styles.viewButtonText]}>View</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.actionButton, styles.setActiveButton]}
                        onPress={() => handleSetActive(plan)}
                      >
                        <Text style={[styles.actionButtonText, styles.setActiveButtonText]}>Set Active</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.actionButton, styles.deleteButton]}
                        onPress={() => handleDeletePlan(plan)}
                      >
                        <Text style={[styles.actionButtonText, styles.deleteButtonText]}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  
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
                        {plan.days.reduce((total, day) => total + day.exercises.length, 0)}
                      </Text>
                      <Text style={styles.statLabel}>Exercises</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Text style={styles.statValue}>
                        {plan.days.filter(day => day.isRestDay).length}
                      </Text>
                      <Text style={styles.statLabel}>Rest Days</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
