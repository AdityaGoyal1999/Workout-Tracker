export interface Exercise {
  id: string;
  name: string;
  sets?: number;
  reps?: number;
  weight?: number;
  duration?: number; // in seconds
  restTime?: number; // in seconds
  notes?: string;
}

export interface WorkoutDay {
  id: string;
  name: string;
  exercises: Exercise[];
  isRestDay?: boolean;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description?: string;
  days: WorkoutDay[];
  createdAt: Date;
  updatedAt: Date;
  isActive?: boolean;
}

export interface WorkoutSession {
  id: string;
  planId: string;
  dayId: string;
  startedAt: Date;
  completedAt?: Date;
  exercises: Exercise[];
  notes?: string;
}
