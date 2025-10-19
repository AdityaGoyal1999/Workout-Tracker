import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../contexts/ThemeContext";

interface Set {
  id: string;
  setNumber: number;
  weight: number;
  reps: number;
  completed: boolean;
  previousWeight?: number;
  previousReps?: number;
}

interface Exercise {
  id: string;
  name: string;
  sets?: number;
  reps?: number;
  weight?: number;
  duration?: number;
  notes?: string;
  completedSets?: Set[];
}

interface WorkoutData {
  name: string;
  exercises: Exercise[];
  completed: boolean;
}

export default function WorkoutPage() {
  const { theme } = useTheme();
  const { workoutData } = useLocalSearchParams<{ workoutData: string }>();
  const router = useRouter();
  
  // Parse the workout data from the navigation params
  const todayWorkout: WorkoutData = workoutData ? JSON.parse(workoutData) : {
    name: "No workout data",
    exercises: [],
    completed: false,
  };

  // State management
  const [workoutSession, setWorkoutSession] = useState<Exercise[]>([]);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);

  // Initialize workout session with sets
  useEffect(() => {
    const initializedExercises = todayWorkout.exercises.map(exercise => ({
      ...exercise,
      completedSets: Array.from({ length: exercise.sets || 1 }, (_, index) => ({
        id: `${exercise.id}-set-${index + 1}`,
        setNumber: index + 1,
        weight: exercise.weight || 0,
        reps: exercise.reps || 0,
        completed: false,
        previousWeight: undefined,
        previousReps: undefined,
      }))
    }));
    setWorkoutSession(initializedExercises);
  }, [todayWorkout]);

  // Timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Timer formatting
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handler functions
  const startWorkout = () => {
    setSessionStarted(true);
    setIsTimerRunning(true);
  };

  const toggleSetCompletion = (exerciseId: string, setId: string) => {
    setWorkoutSession(prev => prev.map(exercise => 
      exercise.id === exerciseId 
        ? {
            ...exercise,
            completedSets: exercise.completedSets?.map(set =>
              set.id === setId ? { ...set, completed: !set.completed } : set
            )
          }
        : exercise
    ));
  };

  const updateSetWeight = (exerciseId: string, setId: string, weight: string) => {
    const weightNum = parseFloat(weight) || 0;
    setWorkoutSession(prev => prev.map(exercise => 
      exercise.id === exerciseId 
        ? {
            ...exercise,
            completedSets: exercise.completedSets?.map(set =>
              set.id === setId ? { ...set, weight: weightNum } : set
            )
          }
        : exercise
    ));
  };

  const updateSetReps = (exerciseId: string, setId: string, reps: string) => {
    const repsNum = parseInt(reps) || 0;
    setWorkoutSession(prev => prev.map(exercise => 
      exercise.id === exerciseId 
        ? {
            ...exercise,
            completedSets: exercise.completedSets?.map(set =>
              set.id === setId ? { ...set, reps: repsNum } : set
            )
          }
        : exercise
    ));
  };

  const addSet = (exerciseId: string) => {
    setWorkoutSession(prev => prev.map(exercise => 
      exercise.id === exerciseId 
        ? {
            ...exercise,
            completedSets: [
              ...(exercise.completedSets || []),
              {
                id: `${exerciseId}-set-${(exercise.completedSets?.length || 0) + 1}`,
                setNumber: (exercise.completedSets?.length || 0) + 1,
                weight: 0,
                reps: 0,
                completed: false,
                previousWeight: undefined,
                previousReps: undefined,
              }
            ]
          }
        : exercise
    ));
  };

  const finishWorkout = () => {
    Alert.alert(
      "Finish Workout",
      "Are you sure you want to finish this workout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Finish",
          onPress: () => {
            setIsTimerRunning(false);
            // Here you could save the workout data
            router.back();
          }
        }
      ]
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    scrollView: {
      flex: 1,
    },
    header: {
      backgroundColor: '#FFFFFF',
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing['4xl'],
      paddingBottom: theme.spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: '#E5E5E5',
    },
    headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.lg,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#F5F5F5',
      justifyContent: 'center',
      alignItems: 'center',
    },
    finishButton: {
      backgroundColor: '#007AFF',
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.sm,
      borderRadius: 20,
    },
    finishButtonText: {
      color: '#FFFFFF',
      fontSize: theme.typography.fontSize.base,
      fontWeight: '600' as const,
    },
    sessionInfo: {
      alignItems: 'center',
    },
    sessionTitle: {
      fontSize: theme.typography.fontSize['2xl'],
      fontWeight: 'bold' as const,
      color: '#000000',
      marginBottom: theme.spacing.xs,
    },
    routineName: {
      fontSize: theme.typography.fontSize.base,
      color: '#666666',
      marginBottom: theme.spacing.md,
    },
    timer: {
      fontSize: theme.typography.fontSize['2xl'],
      fontWeight: 'bold' as const,
      color: '#000000',
      marginBottom: theme.spacing.lg,
    },
    motivationalText: {
      fontSize: theme.typography.fontSize.base,
      color: '#000000',
      textAlign: 'center',
      lineHeight: 20,
    },
    content: {
      padding: theme.spacing.lg,
    },
    exerciseCard: {
      backgroundColor: '#FFFFFF',
      marginBottom: theme.spacing.xl,
      borderRadius: theme.borderRadius.md,
      borderWidth: 1,
      borderColor: '#E5E5E5',
    },
    exerciseHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: '#E5E5E5',
    },
    exerciseName: {
      fontSize: theme.typography.fontSize.lg,
      fontWeight: 'bold' as const,
      color: '#007AFF',
    },
    exerciseStats: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
    },
    statsButton: {
      backgroundColor: '#F0F8FF',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      borderRadius: 15,
    },
    statsButtonText: {
      color: '#007AFF',
      fontSize: theme.typography.fontSize.sm,
      fontWeight: '600' as const,
    },
    moreButton: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: '#F5F5F5',
      justifyContent: 'center',
      alignItems: 'center',
    },
    setsTable: {
      padding: theme.spacing.lg,
    },
    tableHeader: {
      flexDirection: 'row',
      paddingVertical: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: '#E5E5E5',
    },
    headerCell: {
      flex: 1,
      fontSize: theme.typography.fontSize.sm,
      fontWeight: 'bold' as const,
      color: '#000000',
    },
    sortIcon: {
      marginLeft: theme.spacing.xs,
    },
    setRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0',
    },
    setRowCompleted: {
      backgroundColor: '#F0F8F0',
    },
    setNumber: {
      flex: 0.5,
      fontSize: theme.typography.fontSize.base,
      color: '#000000',
    },
    previousCell: {
      flex: 1.5,
      fontSize: theme.typography.fontSize.sm,
      color: '#999999',
    },
    inputCell: {
      flex: 1,
      height: 40,
      borderWidth: 1,
      borderColor: '#E5E5E5',
      borderRadius: 6,
      paddingHorizontal: theme.spacing.sm,
      fontSize: theme.typography.fontSize.base,
      color: '#000000',
      textAlign: 'center',
    },
    completedCell: {
      flex: 1,
      fontSize: theme.typography.fontSize.base,
      color: '#000000',
      textAlign: 'center',
    },
    actionCell: {
      flex: 0.5,
      alignItems: 'center',
    },
    completeButton: {
      width: 24,
      height: 24,
      borderRadius: 4,
      backgroundColor: '#4CAF50',
      justifyContent: 'center',
      alignItems: 'center',
    },
    incompleteButton: {
      width: 24,
      height: 24,
      borderRadius: 4,
      backgroundColor: '#F5F5F5',
      justifyContent: 'center',
      alignItems: 'center',
    },
    addSetButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: theme.spacing.md,
      borderWidth: 1,
      borderColor: '#E5E5E5',
      borderRadius: 6,
      marginTop: theme.spacing.sm,
    },
    addSetText: {
      fontSize: theme.typography.fontSize.base,
      color: '#000000',
      marginLeft: theme.spacing.sm,
    },
    startWorkoutButton: {
      backgroundColor: '#007AFF',
      paddingVertical: theme.spacing.lg,
      paddingHorizontal: theme.spacing.xl,
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
      marginVertical: theme.spacing.xl,
    },
    startWorkoutText: {
      color: '#FFFFFF',
      fontSize: theme.typography.fontSize.lg,
      fontWeight: 'bold' as const,
    },
    noExercisesText: {
      fontSize: theme.typography.fontSize.base,
      color: '#666666',
      textAlign: 'center',
      fontStyle: 'italic',
      padding: theme.spacing.xl,
    },
  });

  const renderSetRow = (exercise: Exercise, set: Set) => {
    const isCompleted = set.completed;
    
    return (
      <View key={set.id} style={[styles.setRow, isCompleted && styles.setRowCompleted]}>
        <Text style={styles.setNumber}>{set.setNumber}</Text>
        <Text style={styles.previousCell}>No Previous</Text>
        
        {isCompleted ? (
          <>
            <Text style={styles.completedCell}>{set.weight} kg</Text>
            <Text style={styles.completedCell}>{set.reps}</Text>
          </>
        ) : (
          <>
            <TextInput
              style={styles.inputCell}
              value={set.weight.toString()}
              onChangeText={(text) => updateSetWeight(exercise.id, set.id, text)}
              keyboardType="numeric"
              placeholder="0"
            />
            <TextInput
              style={styles.inputCell}
              value={set.reps.toString()}
              onChangeText={(text) => updateSetReps(exercise.id, set.id, text)}
              keyboardType="numeric"
              placeholder="0"
            />
          </>
        )}
        
        <View style={styles.actionCell}>
          <TouchableOpacity
            style={isCompleted ? styles.completeButton : styles.incompleteButton}
            onPress={() => toggleSetCompletion(exercise.id, set.id)}
          >
            {isCompleted && <Text style={{ color: 'white', fontSize: 12 }}>✓</Text>}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderExercise = (exercise: Exercise, index: number) => {
    const completedSets = exercise.completedSets?.filter(set => set.completed).length || 0;
    const totalSets = exercise.completedSets?.length || 0;
    const totalWeight = exercise.completedSets?.reduce((sum, set) => sum + (set.weight * set.reps), 0) || 0;

    return (
      <View key={exercise.id || index} style={styles.exerciseCard}>
        <View style={styles.exerciseHeader}>
          <Text style={styles.exerciseName}>{exercise.name}</Text>
          <View style={styles.exerciseStats}>
            <View style={styles.statsButton}>
              <Text style={styles.statsButtonText}>{totalWeight} kg</Text>
            </View>
            <TouchableOpacity style={styles.moreButton}>
              <Text style={{ color: '#666666' }}>⋯</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.setsTable}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Set</Text>
            <Text style={styles.headerCell}>Previous</Text>
            <Text style={styles.headerCell}>kg</Text>
            <Text style={styles.headerCell}>Rep</Text>
            <View style={styles.actionCell} />
          </View>
          
          {exercise.completedSets?.map(set => renderSetRow(exercise, set))}
          
          <TouchableOpacity 
            style={styles.addSetButton}
            onPress={() => addSet(exercise.id)}
          >
            <Text style={{ color: '#000000' }}>+</Text>
            <Text style={styles.addSetText}>Add a Set</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (!sessionStarted) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Text style={{ color: '#000000', fontSize: 18 }}>↶</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.finishButton} onPress={finishWorkout}>
              <Text style={styles.finishButtonText}>Finish</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.sessionInfo}>
            <Text style={styles.sessionTitle}>Today's session</Text>
            <Text style={styles.routineName}>{todayWorkout.name}</Text>
            <Text style={styles.timer}>{formatTime(timer)}</Text>
            <Text style={styles.motivationalText}>
              Ready to start your workout?{'\n'}
              Let's make it count!
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <TouchableOpacity style={styles.startWorkoutButton} onPress={startWorkout}>
            <Text style={styles.startWorkoutText}>Start Workout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={{ color: '#000000', fontSize: 18 }}>↶</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.finishButton} onPress={finishWorkout}>
            <Text style={styles.finishButtonText}>Finish</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.sessionInfo}>
          <Text style={styles.sessionTitle}>Today's session</Text>
          <Text style={styles.routineName}>{todayWorkout.name}</Text>
          <Text style={styles.timer}>{formatTime(timer)}</Text>
          {/* <Text style={styles.motivationalText}>
            Felt super successful with this workout.{'\n'}
            Definitely having a good night's rest helped!
          </Text> */}
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {workoutSession.length > 0 ? (
            workoutSession.map((exercise, index) => renderExercise(exercise, index))
          ) : (
            <Text style={styles.noExercisesText}>No exercises planned for this workout</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}