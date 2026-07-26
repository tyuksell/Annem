export interface UserProfile {
  name: string;
  email: string;
  isLoggedIn: boolean;
  isProfileCreated?: boolean; // Profile created by user
  height: number; // cm
  startWeight: number; // kg
  currentWeight: number; // kg
  targetWeight: number; // kg
  dailyCalorieTarget: number;
  activityLevel: 'az' | 'orta' | 'yuksek';
  password?: string;
  isNursing: boolean; // Emziren anne mi?
  hasKneeIssue: boolean; // Diz problemi var mı?
  startDate: string; // YYYY-MM-DD
  targetDays: number; // 68 gün
}

export interface DailyRoutineItem {
  id: string;
  title: string;
  time: string;
  iconName: string;
  completed: boolean;
  category: 'sabah' | 'kahvalti' | 'vitamin' | 'egzersiz' | 'su' | 'dua' | 'ertugrul' | 'gece' | 'custom';
}

export interface WaterLog {
  date: string;
  glasses: number; // Target usually 8 (2000 ml)
  targetGlasses: number;
}

export interface WeightLog {
  id: string;
  date: string;
  weight: number;
  note?: string;
}

export interface BodyMeasurement {
  id: string;
  date: string;
  waist: number; // Bel (cm)
  hips: number; // Basen (cm)
  chest: number; // Göğüs (cm)
  arms: number; // Kol (cm)
  thighs: number; // Bacak (cm)
}

export interface Habit {
  id: string;
  title: string;
  iconName: string;
  completedDates: string[]; // ['2026-07-24', ...]
}

export interface Recipe {
  id: string;
  title: string;
  category: 'Kahvaltı' | 'Ana yemek' | 'Ara öğün' | 'Tatlı' | 'İçecek';
  prepTime: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  instructions: string[];
  isNursingFriendly: boolean;
  image: string;
  isFavorite?: boolean;
}

export interface ExerciseRoutine {
  id: string;
  title: string;
  durationMinutes: number;
  intensity: 'Kolay' | 'Orta' | 'Yoğun';
  isKneeFriendly: boolean;
  videoUrl?: string;
  description: string;
  steps: string[];
  completedDates: string[];
}

export interface NoteItem {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'Motivasyon' | 'Beslenme' | 'Genel' | 'Ertuğrul';
}

export interface ShoppingItem {
  id: string;
  title: string;
  category: string;
  checked: boolean;
}

export interface ReminderSetting {
  id: string;
  type: 'water' | 'vitamin' | 'exercise' | 'weigh' | 'measure';
  title: string;
  time: string;
  enabled: boolean;
  daysText: string;
}

export interface SpiritualQuote {
  id: string;
  text: string;
  source: string;
}

export interface DhikrItem {
  id: string;
  title: string;
  phrase: string;
  targetCount: number;
  currentCount: number;
  category: string;
  meaning?: string;
  completedDates: string[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export type TabType =
  | 'home'
  | 'plan'
  | 'husu'
  | 'nutrition'
  | 'water'
  | 'weight'
  | 'exercise'
  | 'habits'
  | 'calendar'
  | 'recipes'
  | 'notes'
  | 'reminders'
  | 'stats'
  | 'profile'
  | 'ai';
