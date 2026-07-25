import React from 'react';
import { UserProfile, WeightLog, WaterLog, DailyRoutineItem, Habit, ExerciseRoutine } from '../types';
import { PieChart, TrendingDown, Droplet, CheckCircle2, Flame, Award } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface StatsTabProps {
  userProfile: UserProfile;
  weightLogs: WeightLog[];
  waterLog: WaterLog;
  routineList: DailyRoutineItem[];
  habits?: Habit[];
  exercises?: ExerciseRoutine[];
}

export const StatsTab: React.FC<StatsTabProps> = ({
  userProfile,
  weightLogs,
  waterLog,
  routineList,
  habits = [],
  exercises = [],
}) => {
  const totalWeightLost = (userProfile.startWeight > 0 && userProfile.currentWeight > 0)
    ? Math.max(0, userProfile.startWeight - userProfile.currentWeight).toFixed(1)
    : '0.0';

  const totalWaterLiters = ((waterLog.glasses * 250) / 1000).toFixed(1);

  // Dynamic set of completed goal dates
  const completedDaysSet = new Set<string>();

  habits.forEach((h) => {
    h.completedDates?.forEach((d) => completedDaysSet.add(d));
  });

  exercises.forEach((e) => {
    e.completedDates?.forEach((d) => completedDaysSet.add(d));
  });

  const todayIso = new Date().toISOString().split('T')[0];

  if (routineList.length > 0 && routineList.some((r) => r.completed)) {
    completedDaysSet.add(todayIso);
  }

  if (waterLog.glasses >= waterLog.targetGlasses && waterLog.glasses > 0) {
    completedDaysSet.add(waterLog.date || todayIso);
  }

  weightLogs.forEach((w) => {
    if (w.date) completedDaysSet.add(w.date);
  });

  const daysCompleted = completedDaysSet.size;

  const targetCalories = userProfile.dailyCalorieTarget || 1800;

  // Chart data: calculate weekly water consumption dynamically
  const daysOfWeek = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
  const now = new Date();
  const currentDayIndex = (now.getDay() + 6) % 7; // Monday = 0, ..., Saturday = 5, Sunday = 6

  const weeklyData = daysOfWeek.map((dayName, idx) => {
    // If it's today's day of week, show actual waterLog liters
    const waterLiters = idx === currentDayIndex ? Number(totalWaterLiters) : 0;
    return {
      day: dayName,
      water: waterLiters,
      calories: targetCalories,
    };
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e5e0d5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-[#f07052] font-bold text-xs uppercase tracking-wider mb-1">
            <PieChart className="w-4 h-4" />
            <span>Genel Performans & Veri Analizi</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#2e4033] tracking-tight">İstatistikler & Başarı Tablosu</h2>
          <p className="text-[#526356] text-sm mt-0.5">
            Tüm emeğinin, içtiğin suyun ve kaydettiğin gelişimlerin canlı analizi.
          </p>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-[#e5e0d5] shadow-xs">
          <span className="text-xs font-bold text-[#526356] uppercase block">Toplam Verilen Kilo</span>
          <span className="text-3xl font-serif font-bold text-[#f07052] mt-1 block">-{totalWeightLost} kg</span>
          <span className="text-[11px] text-[#526356] mt-1 block">Başlangıçtan bu yana</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#e5e0d5] shadow-xs">
          <span className="text-xs font-bold text-[#526356] uppercase block">Toplam İçilen Su</span>
          <span className="text-3xl font-serif font-bold text-[#0284c7] mt-1 block">{totalWaterLiters} Litre</span>
          <span className="text-[11px] text-[#526356] mt-1 block">Bugünkü toplam</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#e5e0d5] shadow-xs">
          <span className="text-xs font-bold text-[#526356] uppercase block">Hedef Tamamlanan Gün</span>
          <span className="text-3xl font-serif font-bold text-[#3d5a45] mt-1 block">{daysCompleted} Gün</span>
          <span className="text-[11px] text-[#526356] mt-1 block">
            {userProfile.targetDays ? `${userProfile.targetDays} gün hedeflenen süreçten` : 'Tamamlanan günler'}
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#e5e0d5] shadow-xs">
          <span className="text-xs font-bold text-[#526356] uppercase block">Günlük Hedef Kalori</span>
          <span className="text-3xl font-serif font-bold text-[#2e4033] mt-1 block">{targetCalories} kcal</span>
          <span className="text-[11px] text-[#526356] mt-1 block">Emziren anne dengesi</span>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-3xl border border-[#e5e0d5] shadow-xs">
        <h3 className="font-serif font-bold text-[#2e4033] text-base mb-4">Haftalık Su Tüketimi (Litre)</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e0d5" />
              <XAxis dataKey="day" stroke="#526356" fontSize={11} />
              <YAxis stroke="#526356" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#2e4033', borderRadius: '12px', color: '#fcfaf7', border: '1px solid #e5e0d5' }} />
              <Bar dataKey="water" fill="#0284c7" radius={[8, 8, 0, 0]} name="Su (Litre)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
