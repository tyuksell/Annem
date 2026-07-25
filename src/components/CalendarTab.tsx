import React, { useState } from 'react';
import { DailyRoutineItem, Habit, WeightLog, ExerciseRoutine } from '../types';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, CheckCircle2, Scale, Droplet, Dumbbell, CheckSquare } from 'lucide-react';

interface CalendarTabProps {
  routineList: DailyRoutineItem[];
  weightLogs: WeightLog[];
  habits: Habit[];
  exercises?: ExerciseRoutine[];
}

export const CalendarTab: React.FC<CalendarTabProps> = ({
  routineList,
  weightLogs,
  habits,
  exercises = [],
}) => {
  const now = new Date();
  const [viewYear, setViewYear] = useState<number>(now.getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(now.getMonth()); // 0-indexed

  const todayIso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  const [selectedDate, setSelectedDate] = useState<string>(todayIso);

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const viewDateObj = new Date(viewYear, viewMonth, 1);
  const monthName = viewDateObj.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' });

  // Get day of week for the 1st day of month (Monday = 0 ... Sunday = 6)
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay(); 
  const paddingDays = (firstDayOfWeek + 6) % 7;

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => {
    const dayNum = i + 1;
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${dayNum.toString().padStart(2, '0')}`;
    return {
      dayNum,
      dateStr,
      isToday: dateStr === todayIso,
    };
  });

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  // Find weight for selected date if exists
  const weightForDay = weightLogs.find((w) => w.date === selectedDate);

  // Find habits completed on selected date
  const habitsForDay = habits.filter((h) => h.completedDates?.includes(selectedDate));

  // Find exercises completed on selected date
  const exercisesForDay = exercises.filter((e) => e.completedDates?.includes(selectedDate));

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e5e0d5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#f07052] font-bold text-xs uppercase tracking-wider mb-1">
            <CalendarIcon className="w-4 h-4" />
            <span>Günlük Geçmiş & Plan İnceleme</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#2e4033] tracking-tight">İnteraktif Dönüşüm Takvimi</h2>
          <p className="text-[#526356] text-sm mt-0.5">
            İstediğin güne tıklayarak o günün planını ve tamamlanan hedeflerini gör!
          </p>
        </div>

        <div className="flex items-center space-x-1 font-serif font-bold text-[#2e4033] text-sm bg-[#f2f7f3] px-3 py-1.5 rounded-2xl border border-[#e5e0d5]">
          <button
            onClick={handlePrevMonth}
            className="p-1.5 hover:bg-[#e2ebd3] rounded-xl transition-colors cursor-pointer flex items-center justify-center text-[#3d5a45]"
            title="Önceki Ay"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="capitalize px-3 min-w-[130px] text-center">{monthName}</span>
          <button
            onClick={handleNextMonth}
            className="p-1.5 hover:bg-[#e2ebd3] rounded-xl transition-colors cursor-pointer flex items-center justify-center text-[#3d5a45]"
            title="Sonraki Ay"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Calendar Grid */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-[#e5e0d5] shadow-xs">
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-[#526356] mb-3">
            <span>Pzt</span><span>Sal</span><span>Çar</span><span>Per</span><span>Cum</span><span>Cmt</span><span>Paz</span>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: paddingDays }).map((_, idx) => (
              <div key={`pad-${idx}`} className="p-3 bg-transparent" />
            ))}
            {daysArray.map((d) => {
              const isSelected = d.dateStr === selectedDate;
              return (
                <button
                  key={d.dateStr}
                  onClick={() => setSelectedDate(d.dateStr)}
                  className={`p-3 rounded-2xl text-center transition-all flex flex-col items-center justify-center relative cursor-pointer ${
                    isSelected
                      ? 'bg-[#3d5a45] text-white font-serif font-bold shadow-xs scale-105'
                      : d.isToday
                      ? 'bg-[#fff2ee] border-2 border-[#f07052] text-[#f07052] font-bold'
                      : 'bg-[#fcfaf7] hover:bg-[#e2ebd3] text-[#2e4033] font-semibold'
                  }`}
                >
                  <span className="text-sm">{d.dayNum}</span>
                  {d.isToday && (
                    <span className="text-[8px] uppercase tracking-wider block font-bold mt-0.5">Bugün</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Day Details Panel */}
        <div className="bg-white p-6 rounded-3xl border border-[#e5e0d5] shadow-xs space-y-4">
          <div className="border-b border-[#e5e0d5] pb-3">
            <span className="text-xs font-bold text-[#f07052] uppercase">Seçili Gün Detayı</span>
            <h3 className="text-xl font-serif font-bold text-[#2e4033] mt-1">{selectedDate}</h3>
          </div>

          {/* Weight Log on this day */}
          <div className="bg-[#f2f7f3] p-4 rounded-2xl border border-[#e5e0d5]">
            <span className="text-xs text-[#f07052] font-bold block">O Günki Tartı Kaydı</span>
            {weightForDay ? (
              <span className="text-2xl font-serif font-bold text-[#2e4033]">{weightForDay.weight} kg</span>
            ) : (
              <span className="text-xs text-[#526356] italic block mt-1">Bu tarihte özel bir tartı kaydı girilmedi.</span>
            )}
          </div>

          {/* Completed Habits */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[#2e4033] mb-2 flex items-center space-x-1.5">
              <CheckSquare className="w-4 h-4 text-[#3d5a45]" />
              <span>Tamamlanan Alışkanlıklar</span>
            </h4>
            {habitsForDay.length > 0 ? (
              <div className="space-y-1.5">
                {habitsForDay.map((h) => (
                  <div key={h.id} className="p-2 rounded-xl bg-[#eaf4eb] text-[#2e4033] text-xs font-semibold flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3d5a45]" />
                    <span>{h.title}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#526356] italic">Bu tarihte tamamlanan alışkanlık yok.</p>
            )}
          </div>

          {/* Completed Exercises */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[#2e4033] mb-2 flex items-center space-x-1.5">
              <Dumbbell className="w-4 h-4 text-[#f07052]" />
              <span>Tamamlanan Egzersizler</span>
            </h4>
            {exercisesForDay.length > 0 ? (
              <div className="space-y-1.5">
                {exercisesForDay.map((e) => (
                  <div key={e.id} className="p-2 rounded-xl bg-[#fff2ee] text-[#2e4033] text-xs font-semibold flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#f07052]" />
                    <span>{e.title}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#526356] italic">Bu tarihte tamamlanan egzersiz yok.</p>
            )}
          </div>

          {/* Routines Summary */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[#2e4033] mb-2">Günlük Rutinler</h4>
            {routineList.length > 0 ? (
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {routineList.map((r) => (
                  <div key={r.id} className="p-2.5 rounded-xl bg-[#fcfaf7] border border-[#e5e0d5] flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#2e4033]">{r.title}</span>
                    <span className={`font-bold px-2 py-0.5 rounded-md ${r.completed ? 'bg-[#eaf4eb] text-[#3d5a45]' : 'bg-[#f2f7f3] text-[#526356]'}`}>
                      {r.completed ? 'Tamamlandı' : 'Bekliyor'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#526356] italic">Henüz tanımlanmış bir rutin bulunmuyor.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
