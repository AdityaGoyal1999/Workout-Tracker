import React, { createContext, useContext, useEffect, useState } from 'react';
import { Exercise, WorkoutDay, WorkoutPlan } from '../types/workout';

interface WorkoutContextType {
  workoutPlans: WorkoutPlan[];
  activePlan: WorkoutPlan | null;
  addWorkoutPlan: (plan: Omit<WorkoutPlan, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateWorkoutPlan: (id: string, plan: Partial<WorkoutPlan>) => void;
  deleteWorkoutPlan: (id: string) => void;
  setActivePlan: (plan: WorkoutPlan | null) => void;
  addDayToPlan: (planId: string, day: Omit<WorkoutDay, 'id'>) => void;
  updateDayInPlan: (planId: string, dayId: string, day: Partial<WorkoutDay>) => void;
  deleteDayFromPlan: (planId: string, dayId: string) => void;
  addExerciseToDay: (planId: string, dayId: string, exercise: Omit<Exercise, 'id'>) => void;
  updateExerciseInDay: (planId: string, dayId: string, exerciseId: string, exercise: Partial<Exercise>) => void;
  deleteExerciseFromDay: (planId: string, dayId: string, exerciseId: string) => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
};

interface WorkoutProviderProps {
  children: React.ReactNode;
}

export const WorkoutProvider: React.FC<WorkoutProviderProps> = ({ children }) => {
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);
  const [activePlan, setActivePlan] = useState<WorkoutPlan | null>(null);

  // Load data from storage on mount
  useEffect(() => {
    // TODO: Load from AsyncStorage or other persistence
    // For now, we'll start with some sample data
    const samplePlan: WorkoutPlan = {
      id: 'sample-1',
      name: 'Push/Pull/Legs',
      description: 'A classic 3-day split focusing on different muscle groups',
      days: [
        {
          id: 'day-1',
          name: 'Push Day',
          exercises: [
            { id: 'ex-1', name: 'Bench Press', sets: 4, reps: 8, weight: 135 },
            { id: 'ex-2', name: 'Overhead Press', sets: 3, reps: 10, weight: 95 },
            { id: 'ex-3', name: 'Dips', sets: 3, reps: 12 },
            { id: 'ex-4', name: 'Tricep Extensions', sets: 3, reps: 15, weight: 25 },
          ],
        },
        {
          id: 'day-2',
          name: 'Pull Day',
          exercises: [
            { id: 'ex-5', name: 'Pull-ups', sets: 4, reps: 8 },
            { id: 'ex-6', name: 'Barbell Rows', sets: 4, reps: 10, weight: 115 },
            { id: 'ex-7', name: 'Bicep Curls', sets: 3, reps: 12, weight: 30 },
            { id: 'ex-8', name: 'Face Pulls', sets: 3, reps: 15, weight: 20 },
          ],
        },
        {
          id: 'day-3',
          name: 'Legs Day',
          exercises: [
            { id: 'ex-9', name: 'Squats', sets: 4, reps: 8, weight: 185 },
            { id: 'ex-10', name: 'Romanian Deadlifts', sets: 3, reps: 10, weight: 135 },
            { id: 'ex-11', name: 'Lunges', sets: 3, reps: 12 },
            { id: 'ex-12', name: 'Calf Raises', sets: 4, reps: 20, weight: 50 },
          ],
        },
        {
          id: 'day-4',
          name: 'Rest Day',
          exercises: [],
          isRestDay: true,
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    };
    
    setWorkoutPlans([samplePlan]);
    setActivePlan(samplePlan);
  }, []);

  const addWorkoutPlan = (planData: Omit<WorkoutPlan, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPlan: WorkoutPlan = {
      ...planData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setWorkoutPlans(prev => [...prev, newPlan]);
  };

  const updateWorkoutPlan = (id: string, planData: Partial<WorkoutPlan>) => {
    setWorkoutPlans(prev => 
      prev.map(plan => 
        plan.id === id 
          ? { ...plan, ...planData, updatedAt: new Date() }
          : plan
      )
    );
  };

  const deleteWorkoutPlan = (id: string) => {
    setWorkoutPlans(prev => prev.filter(plan => plan.id !== id));
    if (activePlan?.id === id) {
      setActivePlan(null);
    }
  };

  const addDayToPlan = (planId: string, dayData: Omit<WorkoutDay, 'id'>) => {
    const newDay: WorkoutDay = {
      ...dayData,
      id: Date.now().toString(),
    };
    
    setWorkoutPlans(prev => 
      prev.map(plan => 
        plan.id === planId 
          ? { ...plan, days: [...plan.days, newDay], updatedAt: new Date() }
          : plan
      )
    );
  };

  const updateDayInPlan = (planId: string, dayId: string, dayData: Partial<WorkoutDay>) => {
    setWorkoutPlans(prev => 
      prev.map(plan => 
        plan.id === planId 
          ? {
              ...plan,
              days: plan.days.map(day => 
                day.id === dayId 
                  ? { ...day, ...dayData }
                  : day
              ),
              updatedAt: new Date()
            }
          : plan
      )
    );
  };

  const deleteDayFromPlan = (planId: string, dayId: string) => {
    setWorkoutPlans(prev => 
      prev.map(plan => 
        plan.id === planId 
          ? {
              ...plan,
              days: plan.days.filter(day => day.id !== dayId),
              updatedAt: new Date()
            }
          : plan
      )
    );
  };

  const addExerciseToDay = (planId: string, dayId: string, exerciseData: Omit<Exercise, 'id'>) => {
    const newExercise: Exercise = {
      ...exerciseData,
      id: Date.now().toString(),
    };
    
    setWorkoutPlans(prev => 
      prev.map(plan => 
        plan.id === planId 
          ? {
              ...plan,
              days: plan.days.map(day => 
                day.id === dayId 
                  ? { ...day, exercises: [...day.exercises, newExercise] }
                  : day
              ),
              updatedAt: new Date()
            }
          : plan
      )
    );
  };

  const updateExerciseInDay = (planId: string, dayId: string, exerciseId: string, exerciseData: Partial<Exercise>) => {
    setWorkoutPlans(prev => 
      prev.map(plan => 
        plan.id === planId 
          ? {
              ...plan,
              days: plan.days.map(day => 
                day.id === dayId 
                  ? {
                      ...day,
                      exercises: day.exercises.map(exercise => 
                        exercise.id === exerciseId 
                          ? { ...exercise, ...exerciseData }
                          : exercise
                      )
                    }
                  : day
              ),
              updatedAt: new Date()
            }
          : plan
      )
    );
  };

  const deleteExerciseFromDay = (planId: string, dayId: string, exerciseId: string) => {
    setWorkoutPlans(prev => 
      prev.map(plan => 
        plan.id === planId 
          ? {
              ...plan,
              days: plan.days.map(day => 
                day.id === dayId 
                  ? {
                      ...day,
                      exercises: day.exercises.filter(exercise => exercise.id !== exerciseId)
                    }
                  : day
              ),
              updatedAt: new Date()
            }
          : plan
      )
    );
  };

  const value: WorkoutContextType = {
    workoutPlans,
    activePlan,
    addWorkoutPlan,
    updateWorkoutPlan,
    deleteWorkoutPlan,
    setActivePlan,
    addDayToPlan,
    updateDayInPlan,
    deleteDayFromPlan,
    addExerciseToDay,
    updateExerciseInDay,
    deleteExerciseFromDay,
  };

  return (
    <WorkoutContext.Provider value={value}>
      {children}
    </WorkoutContext.Provider>
  );
};
