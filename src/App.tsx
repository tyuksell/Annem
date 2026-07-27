import React, { useState, useEffect } from 'react';
import { 
  UserProfile, 
  DailyRoutineItem, 
  WaterLog, 
  WeightLog, 
  BodyMeasurement, 
  Habit, 
  Recipe, 
  ExerciseRoutine, 
  NoteItem, 
  ShoppingItem, 
  ReminderSetting, 
  Badge, 
  TabType,
  DhikrItem 
} from './types';
import { 
  initialProfile, 
  motivationalQuotes, 
  initialRoutineList, 
  initialRecipes, 
  initialExercises, 
  initialHabits, 
  initialBadges, 
  initialWeightLogs, 
  initialMeasurements, 
  initialNotes, 
  initialShopping, 
  initialReminders,
  initialDhikrList 
} from './data';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { HomeTab } from './components/HomeTab';
import { PlanTab } from './components/PlanTab';
import { HusuTab } from './components/HusuTab';
import { NutritionTab } from './components/NutritionTab';
import { WaterTab } from './components/WaterTab';
import { WeightTab } from './components/WeightTab';
import { ExerciseTab } from './components/ExerciseTab';
import { HabitTab } from './components/HabitTab';
import { CalendarTab } from './components/CalendarTab';
import { RecipesTab } from './components/RecipesTab';
import { NotesTab } from './components/NotesTab';
import { RemindersTab } from './components/RemindersTab';
import { StatsTab } from './components/StatsTab';
import { ProfileTab } from './components/ProfileTab';
import { AiAssistantTab } from './components/AiAssistantTab';
import { EvIsleriTab } from './components/EvIsleriTab';
import { AuthModal } from './components/AuthModal';
import { ProfileSetupModal } from './components/ProfileSetupModal';
import { RecipeModal } from './components/RecipeModal';
import { Sidebar } from './components/Sidebar';

export default function App() {
  // Helper for localStorage state
  const useLocalStorage = <T,>(key: string, initialValue: T): [T, (val: T | ((prev: T) => T)) => void] => {
    const [state, setState] = useState<T>(() => {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (e) {
        return initialValue;
      }
    });

    useEffect(() => {
      try {
        window.localStorage.setItem(key, JSON.stringify(state));
      } catch (e) {
        console.error("Local storage error:", e);
      }
    }, [key, state]);

    return [state, setState];
  };

  // Main Persistent States
  const [userProfile, setUserProfile] = useLocalStorage<UserProfile>('annem_profile_v10', initialProfile);
  const [routineList, setRoutineList] = useLocalStorage<DailyRoutineItem[]>('annem_routines_v10', initialRoutineList);
  const [waterLog, setWaterLog] = useLocalStorage<WaterLog>('annem_water_v10', { date: new Date().toISOString().split('T')[0], glasses: 0, targetGlasses: 8 });
  const [weightLogs, setWeightLogs] = useLocalStorage<WeightLog[]>('annem_weights_v10', initialWeightLogs);
  const [measurements, setMeasurements] = useLocalStorage<BodyMeasurement[]>('annem_measurements_v10', initialMeasurements);
  const [habits, setHabits] = useLocalStorage<Habit[]>('annem_habits_v10', initialHabits);
  const [recipes, setRecipes] = useLocalStorage<Recipe[]>('annem_recipes_v10', initialRecipes);
  const [exercises, setExercises] = useLocalStorage<ExerciseRoutine[]>('annem_exercises_v10', initialExercises);
  const [notes, setNotes] = useLocalStorage<NoteItem[]>('annem_notes_v10', initialNotes);
  const [shoppingList, setShoppingList] = useLocalStorage<ShoppingItem[]>('annem_shopping_v10', initialShopping);
  const [reminders, setReminders] = useLocalStorage<ReminderSetting[]>('annem_reminders_v10', initialReminders);
  const [badges, setBadges] = useLocalStorage<Badge[]>('annem_badges_v10', initialBadges);
  const [dhikrList, setDhikrList] = useLocalStorage<DhikrItem[]>('annem_dhikr_v10', initialDhikrList);

  // Tab & Modal Navigation
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'forgot'>('login');
  const [isSetupModalOpen, setIsSetupModalOpen] = useState<boolean>(!userProfile.isProfileCreated);
  const [setupProfile, setSetupProfile] = useState<UserProfile | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [quoteIndex, setQuoteIndex] = useState<number>(() => Math.floor(Math.random() * motivationalQuotes.length));

  // Reset legacy sample profile data if present
  useEffect(() => {
    if (userProfile.name === 'Filiz' || !userProfile.isProfileCreated) {
      if (userProfile.name === 'Filiz' || userProfile.email.includes('filiz')) {
        setUserProfile(initialProfile);
        setWeightLogs([]);
        setMeasurements([]);
      }
    }
  }, []);

  // Ensure initial data is populated if empty & heal outdated images
  useEffect(() => {
    if (!recipes || recipes.length < initialRecipes.length) {
      setRecipes(initialRecipes);
    } else {
      const hasCatImage = recipes.some(r => r.image && (r.image.includes('photo-1541781774459') || r.image.includes('photo-1517849845537')));
      if (hasCatImage) {
        setRecipes(recipes.map(r => {
          if (r.image && (r.image.includes('photo-1541781774459') || r.image.includes('photo-1517849845537'))) {
            const match = initialRecipes.find(ir => ir.id === r.id);
            return { ...r, image: match ? match.image : 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop&q=80' };
          }
          return r;
        }));
      }
    }
  }, [recipes]);

  useEffect(() => {
    if ((!exercises || exercises.length < initialExercises.length) && initialExercises.length > 0) {
      setExercises(initialExercises);
    }
  }, [exercises]);

  useEffect(() => {
    if ((!routineList || routineList.length === 0) && initialRoutineList.length > 0) {
      setRoutineList(initialRoutineList);
    }
  }, [routineList]);

  useEffect(() => {
    if ((!habits || habits.length === 0) && initialHabits.length > 0) {
      setHabits(initialHabits);
    }
  }, [habits]);

  useEffect(() => {
    if ((!shoppingList || shoppingList.length === 0) && initialShopping.length > 0) {
      setShoppingList(initialShopping);
    }
  }, [shoppingList]);

  useEffect(() => {
    if ((!reminders || reminders.length === 0) && initialReminders.length > 0) {
      setReminders(initialReminders);
    }
  }, [reminders]);

  useEffect(() => {
    if ((!notes || notes.length === 0) && initialNotes.length > 0) {
      setNotes(initialNotes);
    }
  }, [notes]);

  useEffect(() => {
    if (!dhikrList || dhikrList.length === 0) {
      setDhikrList(initialDhikrList);
    } else {
      const missingDefaults = initialDhikrList.filter(
        (init) => !dhikrList.some((existing) => existing.id === init.id || existing.phrase === init.phrase)
      );
      if (missingDefaults.length > 0) {
        setDhikrList([...missingDefaults, ...dhikrList]);
      }
    }
  }, [dhikrList]);

  // Profile Save Handler
  const handleSaveProfile = (newProfile: UserProfile) => {
    setUserProfile(newProfile);
    if (weightLogs.length === 0 && newProfile.currentWeight > 0) {
      const todayStr = new Date().toISOString().split('T')[0];
      setWeightLogs([
        {
          id: Date.now().toString(),
          date: todayStr,
          weight: newProfile.currentWeight,
          note: 'Sisteme Başlangıç Kilosu Kaydedildi 🎉',
        },
      ]);
    }
  };

  // PWA Prompt
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isPwaInstalled, setIsPwaInstalled] = useState<boolean>(false);

  useEffect(() => {
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsPwaInstalled(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const openProfileSetup = (profile?: UserProfile | null) => {
    setSetupProfile(profile === undefined ? userProfile : profile);
    setIsSetupModalOpen(true);
  };

  const openAuthModal = (mode: 'login' | 'register' | 'forgot' = 'login') => {
    if (mode === 'register') {
      openProfileSetup(null);
      setIsAuthOpen(false);
      return;
    }

    setAuthMode(mode === 'login' ? 'login' : 'forgot');
    setIsAuthOpen(true);
  };

  const installPwa = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          setIsPwaInstalled(true);
        }
        setDeferredPrompt(null);
      });
    } else {
      alert("Uygulamayı tarayıcınızın menüsünden 'Ana Ekrana Ekle' seçeneği ile telefonunuza yükleyebilirsiniz.");
    }
  };

  // Quote Refresh
  const refreshQuote = () => {
    setQuoteIndex((prev) => {
      let next;
      do {
        next = Math.floor(Math.random() * motivationalQuotes.length);
      } while (next === prev && motivationalQuotes.length > 1);
      return next;
    });
  };

  // Days remaining calculation
  const start = new Date(userProfile.startDate).getTime();
  const today = new Date().getTime();
  const diffDays = Math.floor((today - start) / (1000 * 3600 * 24));
  const daysRemaining = Math.max(0, userProfile.targetDays - diffDays);

  // Routine Handlers
  const toggleRoutineItem = (id: string) => {
    setRoutineList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const addRoutineItem = (title: string, time: string, category: DailyRoutineItem['category']) => {
    const newItem: DailyRoutineItem = {
      id: Date.now().toString(),
      title,
      time,
      iconName: 'Clock',
      completed: false,
      category,
    };
    setRoutineList((prev) => [...prev, newItem]);
  };

  const deleteRoutineItem = (id: string) => {
    setRoutineList((prev) => prev.filter((item) => item.id !== id));
  };

  // Water Handlers
  const incrementWater = () => {
    setWaterLog((prev) => ({ ...prev, glasses: Math.min(prev.targetGlasses + 4, prev.glasses + 1) }));
  };

  const decrementWater = () => {
    setWaterLog((prev) => ({ ...prev, glasses: Math.max(0, prev.glasses - 1) }));
  };

  const resetWater = () => {
    setWaterLog((prev) => ({ ...prev, glasses: 0 }));
  };

  const setGlasses = (count: number) => {
    setWaterLog((prev) => ({ ...prev, glasses: count }));
  };

  // Weight Logs Handlers
  const addWeightLog = (weight: number, note?: string) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const newLog: WeightLog = {
      id: Date.now().toString(),
      date: todayStr,
      weight,
      note,
    };
    setWeightLogs((prev) => [...prev, newLog]);
    setUserProfile((prev) => ({ ...prev, currentWeight: weight }));
  };

  // Measurement Handlers
  const addMeasurement = (m: Omit<BodyMeasurement, 'id'>) => {
    const newM: BodyMeasurement = { ...m, id: Date.now().toString() };
    setMeasurements((prev) => [...prev, newM]);
  };

  // Habit Handlers
  const toggleHabitForDate = (habitId: string, dateStr: string) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== habitId) return h;
        const exists = h.completedDates.includes(dateStr);
        const updatedDates = exists
          ? h.completedDates.filter((d) => d !== dateStr)
          : [...h.completedDates, dateStr];
        return { ...h, completedDates: updatedDates };
      })
    );
  };

  const addHabit = (title: string) => {
    const newH: Habit = {
      id: Date.now().toString(),
      title,
      iconName: 'CheckSquare',
      completedDates: [],
    };
    setHabits((prev) => [...prev, newH]);
  };

  const deleteHabit = (habitId: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== habitId));
  };

  // Recipe Handlers
  const addRecipe = (recipe: Omit<Recipe, 'id'>) => {
    const newRecipe: Recipe = { ...recipe, id: Date.now().toString() };
    setRecipes((prev) => [newRecipe, ...prev]);
  };

  const deleteRecipe = (id: string) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  // Exercise Handlers
  const addExercise = (exercise: Omit<ExerciseRoutine, 'id' | 'completedDates'>) => {
    const newEx: ExerciseRoutine = { ...exercise, id: Date.now().toString(), completedDates: [] };
    setExercises((prev) => [newEx, ...prev]);
  };

  const deleteExercise = (id: string) => {
    setExercises((prev) => prev.filter((e) => e.id !== id));
  };

  // Exercise Complete Handler
  const completeExercise = (id: string) => {
    const todayStr = new Date().toISOString().split('T')[0];
    setExercises((prev) =>
      prev.map((e) => {
        if (e.id !== id) return e;
        const exists = e.completedDates.includes(todayStr);
        const updated = exists
          ? e.completedDates.filter((d) => d !== todayStr)
          : [...e.completedDates, todayStr];
        return { ...e, completedDates: updated };
      })
    );
  };

  // Shopping Handlers
  const toggleShoppingItem = (id: string) => {
    setShoppingList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, checked: !s.checked } : s))
    );
  };

  const addShoppingItem = (title: string, category: string) => {
    const newS: ShoppingItem = {
      id: Date.now().toString(),
      title,
      category,
      checked: false,
    };
    setShoppingList((prev) => [...prev, newS]);
  };

  const deleteShoppingItem = (id: string) => {
    setShoppingList((prev) => prev.filter((s) => s.id !== id));
  };

  // Notes Handlers
  const addNote = (title: string, content: string, category: NoteItem['category']) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const newN: NoteItem = {
      id: Date.now().toString(),
      title,
      content,
      date: todayStr,
      category,
    };
    setNotes((prev) => [newN, ...prev]);
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  // Reminder Toggle
  const toggleReminder = (id: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const addReminder = (title: string, time: string, type: ReminderSetting['type'], daysText: string) => {
    const newR: ReminderSetting = {
      id: Date.now().toString(),
      type,
      title,
      time,
      enabled: true,
      daysText,
    };
    setReminders((prev) => [...prev, newR]);
  };

  const deleteReminder = (id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  // User Profile Update
  const updateProfile = (updated: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updated }));
  };

  const loginUser = (email: string, password: string) => {
    if (!userProfile.isProfileCreated) return false;
    if (userProfile.email !== email || userProfile.password !== password) return false;

    setUserProfile((prev) => ({
      ...prev,
      isLoggedIn: true,
    }));
    return true;
  };

  const logoutUser = () => {
    setUserProfile((prev) => ({
      ...prev,
      isLoggedIn: false,
    }));
    setCurrentTab('home');
    openAuthModal('login');
  };

  // Dhikr Handlers
  const incrementDhikr = (id: string, amount: number = 1) => {
    setDhikrList((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const newCount = item.currentCount + amount;
        const todayStr = new Date().toISOString().split('T')[0];
        const isNewlyCompleted = newCount >= item.targetCount && !item.completedDates.includes(todayStr);
        const updatedCompletedDates = isNewlyCompleted
          ? [...item.completedDates, todayStr]
          : item.completedDates;
        return { ...item, currentCount: newCount, completedDates: updatedCompletedDates };
      })
    );
  };

  const decrementDhikr = (id: string) => {
    setDhikrList((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        return { ...item, currentCount: Math.max(0, item.currentCount - 1) };
      })
    );
  };

  const resetDhikr = (id: string) => {
    setDhikrList((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        return { ...item, currentCount: 0 };
      })
    );
  };

  const resetAllDhikrs = () => {
    setDhikrList((prev) => prev.map((item) => ({ ...item, currentCount: 0 })));
  };

  const addDhikr = (title: string, phrase: string, targetCount: number, category: string, meaning?: string) => {
    const newItem: DhikrItem = {
      id: Date.now().toString(),
      title,
      phrase,
      targetCount,
      currentCount: 0,
      category,
      meaning,
      completedDates: [],
    };
    setDhikrList((prev) => [...prev, newItem]);
  };

  const deleteDhikr = (id: string) => {
    setDhikrList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased flex flex-col selection:bg-rose-500 selection:text-white">
      
      {/* Top Sticky Header */}
      <Header
        currentTab={currentTab}
        setActiveTab={setCurrentTab}
        userProfile={userProfile}
        daysRemaining={daysRemaining}
        openAuthModal={() => openAuthModal('login')}
        openSetupModal={() => openProfileSetup()}
        isPwaInstalled={isPwaInstalled}
        installPwa={installPwa}
      />

      {/* Navigation Bar */}
      <Navbar 
        currentTab={currentTab} 
        setActiveTab={setCurrentTab} 
        onOpenSidebar={() => setIsSidebarOpen(true)}
      />

      {/* Mobile Drawer Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentTab={currentTab}
        setActiveTab={setCurrentTab}
        userProfile={userProfile}
        daysRemaining={daysRemaining}
        openAuthModal={() => openAuthModal('login')}
        openSetupModal={() => openProfileSetup()}
      />

      {/* Main Container View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-20 lg:pb-12">
        {currentTab === 'home' && (
          <HomeTab
            userProfile={userProfile}
            routineList={routineList}
            waterLog={waterLog}
            weightLogs={weightLogs}
            habits={habits}
            daysRemaining={daysRemaining}
            quote={motivationalQuotes[quoteIndex]}
            refreshQuote={refreshQuote}
            setActiveTab={setCurrentTab}
            toggleRoutineItem={toggleRoutineItem}
            incrementWater={incrementWater}
            openSetupModal={() => openProfileSetup()}
          />
        )}

        {currentTab === 'plan' && (
          <PlanTab
            routineList={routineList}
            toggleRoutineItem={toggleRoutineItem}
            addRoutineItem={addRoutineItem}
            deleteRoutineItem={deleteRoutineItem}
          />
        )}

        {currentTab === 'husu' && (
          <HusuTab
            dhikrList={dhikrList}
            incrementDhikr={incrementDhikr}
            decrementDhikr={decrementDhikr}
            resetDhikr={resetDhikr}
            addDhikr={addDhikr}
            deleteDhikr={deleteDhikr}
            resetAllDhikrs={resetAllDhikrs}
          />
        )}

        {currentTab === 'nutrition' && (
          <NutritionTab
            recipes={recipes}
            userProfile={userProfile}
            shoppingList={shoppingList}
            toggleShoppingItem={toggleShoppingItem}
            addShoppingItem={addShoppingItem}
            deleteShoppingItem={deleteShoppingItem}
            openRecipeModal={(r) => setSelectedRecipe(r)}
          />
        )}

        {currentTab === 'water' && (
          <WaterTab
            waterLog={waterLog}
            incrementWater={incrementWater}
            decrementWater={decrementWater}
            resetWater={resetWater}
            setGlasses={setGlasses}
          />
        )}

        {currentTab === 'weight' && (
          <WeightTab
            userProfile={userProfile}
            weightLogs={weightLogs}
            measurements={measurements}
            onAddWeightLog={addWeightLog}
            onAddMeasurement={addMeasurement}
          />
        )}

        {currentTab === 'exercise' && (
          <ExerciseTab
            exercises={exercises}
            userProfile={userProfile}
            completeExercise={completeExercise}
            addExercise={addExercise}
            deleteExercise={deleteExercise}
          />
        )}

        {currentTab === 'habits' && (
          <HabitTab
            habits={habits}
            toggleHabitForDate={toggleHabitForDate}
            addHabit={addHabit}
            deleteHabit={deleteHabit}
          />
        )}

        {currentTab === 'evisleri' && (
          <EvIsleriTab />
        )}

        {currentTab === 'calendar' && (
          <CalendarTab
            routineList={routineList}
            weightLogs={weightLogs}
            habits={habits}
          />
        )}

        {currentTab === 'recipes' && (
          <RecipesTab
            recipes={recipes}
            openRecipeModal={(r) => setSelectedRecipe(r)}
            selectedRecipe={selectedRecipe}
            closeRecipeModal={() => setSelectedRecipe(null)}
            addShoppingItem={addShoppingItem}
            addRecipe={addRecipe}
            deleteRecipe={deleteRecipe}
          />
        )}

        {currentTab === 'notes' && (
          <NotesTab
            notes={notes}
            addNote={addNote}
            deleteNote={deleteNote}
          />
        )}

        {currentTab === 'reminders' && (
          <RemindersTab
            reminders={reminders}
            toggleReminder={toggleReminder}
            addReminder={addReminder}
            deleteReminder={deleteReminder}
          />
        )}

        {currentTab === 'stats' && (
          <StatsTab
            userProfile={userProfile}
            weightLogs={weightLogs}
            waterLog={waterLog}
            routineList={routineList}
            habits={habits}
            exercises={exercises}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileTab
            userProfile={userProfile}
            onUpdateProfile={updateProfile}
            onLogout={logoutUser}
            onOpenAuthModal={openAuthModal}
          />
        )}

        {currentTab === 'ai' && (
          <AiAssistantTab
            userProfile={userProfile}
            routineList={routineList}
            waterLog={waterLog}
            weightLogs={weightLogs}
          />
        )}
      </main>

      {/* Security Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        userProfile={userProfile}
        loginUser={loginUser}
        initialMode={authMode}
        onRegister={() => {
          setIsAuthOpen(false);
          openProfileSetup(null);
        }}
      />

      {/* User Profile Creation Modal */}
      <ProfileSetupModal
        isOpen={isSetupModalOpen}
        onClose={() => setIsSetupModalOpen(false)}
        onSaveProfile={handleSaveProfile}
        existingProfile={setupProfile ?? undefined}
      />

      {/* Recipe Detail Modal */}
      <RecipeModal
        selectedRecipe={selectedRecipe}
        closeRecipeModal={() => setSelectedRecipe(null)}
        addShoppingItem={addShoppingItem}
      />
    </div>
  );
}
