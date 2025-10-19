import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { useWorkout } from '../contexts/WorkoutContext';
import { WorkoutDay } from '../types/workout';

export default function CreateWorkoutPlanScreen() {
  const { theme } = useTheme();
  const { addWorkoutPlan } = useWorkout();
  const router = useRouter();
  
  const [planName, setPlanName] = useState('');
  const [planDescription, setPlanDescription] = useState('');
  const [days, setDays] = useState<Omit<WorkoutDay, 'id'>[]>([
    { name: 'Day 1', exercises: [], isRestDay: false },
  ]);

  const addDay = () => {
    setDays(prev => [...prev, { 
      name: `Day ${prev.length + 1}`, 
      exercises: [], 
      isRestDay: false 
    }]);
  };

  const removeDay = (index: number) => {
    if (days.length > 1) {
      setDays(prev => prev.filter((_, i) => i !== index));
    }
  };

  const updateDayName = (index: number, name: string) => {
    setDays(prev => prev.map((day, i) => i === index ? { ...day, name } : day));
  };

  const toggleRestDay = (index: number) => {
    setDays(prev => prev.map((day, i) => 
      i === index ? { ...day, isRestDay: !day.isRestDay } : day
    ));
  };

  const handleCreatePlan = () => {
    if (!planName.trim()) {
      Alert.alert('Error', 'Please enter a plan name');
      return;
    }

    if (days.length === 0) {
      Alert.alert('Error', 'Please add at least one day to your plan');
      return;
    }

    addWorkoutPlan({
      name: planName.trim(),
      description: planDescription.trim() || undefined,
      days: days.map(day => ({
        ...day,
        id: Date.now().toString() + Math.random().toString(),
      })),
      isActive: false,
    });

    Alert.alert(
      'Success', 
      'Workout plan created successfully!',
      [{ text: 'OK', onPress: () => router.back() }]
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
    inputGroup: {
      marginBottom: theme.spacing.xl,
    },
    label: {
      fontSize: theme.typography.fontSize.lg,
      fontWeight: '600' as const,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.sm,
    },
    input: {
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.lg,
      borderRadius: theme.borderRadius.md,
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.text.primary,
      ...theme.shadows.sm,
    },
    textArea: {
      height: 100,
      textAlignVertical: 'top',
    },
    daysSection: {
      marginBottom: theme.spacing.xl,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.lg,
    },
    addDayButton: {
      backgroundColor: theme.colors.secondary,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.borderRadius.sm,
    },
    addDayButtonText: {
      color: theme.colors.text.inverse,
      fontSize: theme.typography.fontSize.sm,
      fontWeight: '600' as const,
    },
    dayCard: {
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.lg,
      borderRadius: theme.borderRadius.md,
      marginBottom: theme.spacing.md,
      ...theme.shadows.sm,
    },
    dayHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.sm,
    },
    dayInput: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: theme.spacing.sm,
      borderRadius: theme.borderRadius.sm,
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.text.primary,
      marginRight: theme.spacing.sm,
    },
    dayActions: {
      flexDirection: 'row',
      gap: theme.spacing.sm,
    },
    dayActionButton: {
      padding: theme.spacing.sm,
      borderRadius: theme.borderRadius.sm,
    },
    restDayButton: {
      backgroundColor: theme.colors.secondary,
    },
    restDayButtonActive: {
      backgroundColor: theme.colors.primary,
    },
    removeDayButton: {
      backgroundColor: theme.colors.error,
    },
    dayActionButtonText: {
      fontSize: theme.typography.fontSize.xs,
      fontWeight: '500' as const,
      color: theme.colors.text.inverse,
    },
    restDayText: {
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.text.secondary,
      fontStyle: 'italic',
    },
    createButton: {
      backgroundColor: theme.colors.primary,
      padding: theme.spacing.xl,
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
      marginTop: theme.spacing.lg,
    },
    createButtonText: {
      color: theme.colors.text.inverse,
      fontSize: theme.typography.fontSize.lg,
      fontWeight: '600' as const,
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Workout Plan</Text>
        <Text style={styles.subtitle}>Design your personalized workout routine</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Plan Name *</Text>
            <TextInput
              style={styles.input}
              value={planName}
              onChangeText={setPlanName}
              placeholder="Enter plan name (e.g., Push/Pull/Legs)"
              placeholderTextColor={theme.colors.text.secondary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description (Optional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={planDescription}
              onChangeText={setPlanDescription}
              placeholder="Describe your workout plan..."
              placeholderTextColor={theme.colors.text.secondary}
              multiline
            />
          </View>

          <View style={styles.daysSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.label}>Workout Days</Text>
              <TouchableOpacity style={styles.addDayButton} onPress={addDay}>
                <Text style={styles.addDayButtonText}>+ Add Day</Text>
              </TouchableOpacity>
            </View>

            {days.map((day, index) => (
              <View key={index} style={styles.dayCard}>
                <View style={styles.dayHeader}>
                  <TextInput
                    style={styles.dayInput}
                    value={day.name}
                    onChangeText={(text) => updateDayName(index, text)}
                    placeholder="Day name"
                    placeholderTextColor={theme.colors.text.secondary}
                  />
                  <View style={styles.dayActions}>
                    <TouchableOpacity
                      style={[
                        styles.dayActionButton,
                        day.isRestDay ? styles.restDayButtonActive : styles.restDayButton
                      ]}
                      onPress={() => toggleRestDay(index)}
                    >
                      <Text style={styles.dayActionButtonText}>
                        {day.isRestDay ? 'Rest' : 'Work'}
                      </Text>
                    </TouchableOpacity>
                    {days.length > 1 && (
                      <TouchableOpacity
                        style={[styles.dayActionButton, styles.removeDayButton]}
                        onPress={() => removeDay(index)}
                      >
                        <Text style={styles.dayActionButtonText}>Remove</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
                {day.isRestDay && (
                  <Text style={styles.restDayText}>Rest day - no exercises</Text>
                )}
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.createButton} onPress={handleCreatePlan}>
            <Text style={styles.createButtonText}>Create Workout Plan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
