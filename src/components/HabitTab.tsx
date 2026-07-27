import React, { useState } from 'react';
import { Habit } from '../types';
import { CheckSquare, Check, Plus, Flame, Award, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

interface HabitTabProps {
  habits: Habit[];
  toggleHabitForDate: (habitId: string, dateStr: string) => void;
  addHabit: (title: string) => void;
  deleteHabit: (habitId: string) => void;
}

export const HabitTab: React.FC<HabitTabProps> = ({
  habits,
  toggleHabitForDate,
  addHabit,
  deleteHabit,
}) => {
  const [newHabitTitle, setNewHabitTitle] = useState('');

  // Last 7 days dates array
  const getLast7Days = () => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dates.push({
        full: d.toISOString().split('T')[0],
        dayName: d.toLocaleDateString('tr-TR', { weekday: 'short' }),
        dayNum: d.getDate(),
        isToday: i === 0,
      });
    }
    return dates;
  };

  const days = getLast7Days();
  const todayStr = days[days.length - 1].full;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitTitle.trim()) return;
    addHabit(newHabitTitle.trim());
    setNewHabitTitle('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e5e0d5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-[#f07052] font-bold text-xs uppercase tracking-wider mb-1">
            <CheckSquare className="w-4 h-4" />
            <span>Karakter & Disiplin İnşası</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#2e4033] tracking-tight">Alışkanlık Takip Çizelgesi</h2>
          <p className="text-[#526356] text-sm mt-0.5">
            Her gün attığın küçük tikler, kalıcı büyük dönüşümün anahtarıdır.
          </p>
        </div>

        <form onSubmit={handleAdd} className="flex gap-2">
          <input
            type="text"
            placeholder="Örn: Erken Uyudum, 20 Dk Yürüdüm..."
            value={newHabitTitle}
            onChange={(e) => setNewHabitTitle(e.target.value)}
            className="bg-[#fcfaf7] border border-[#e5e0d5] text-[#2e4033] rounded-xl px-3.5 py-2 text-xs focus:outline-hidden focus:border-[#f07052] w-48 sm:w-64"
          />
          <button
            type="submit"
            className="bg-[#f07052] hover:bg-[#d95a3d] text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-xs flex items-center space-x-1 shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Alışkanlık Ekle</span>
            <span className="sm:hidden">Ekle</span>
          </button>
        </form>
      </div>

      {/* Main Habits Weekly Matrix Table */}
      {habits.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-[#e5e0d5] text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 bg-[#eaf4eb] text-[#3d5a45] rounded-full flex items-center justify-center mx-auto">
            <CheckSquare className="w-8 h-8" />
          </div>
          <h3 className="font-serif font-bold text-xl text-[#2e4033]">Henüz Alışkanlık Eklenmedi</h3>
          <p className="text-[#526356] text-sm max-w-md mx-auto">
            Gününüzü ve hayat disiplininizi kendinize göre şekillendirmek için yukarıdaki formdan ilk alışkanlığınızı ekleyin!
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#e5e0d5] shadow-xs overflow-hidden">
          <div className="p-6 border-b border-[#e5e0d5] flex items-center justify-between">
            <h3 className="font-serif font-bold text-[#2e4033] text-base">Son 7 Günlük Alışkanlık Matrisi</h3>
            <span className="text-xs text-[#f07052] font-bold bg-[#fff2ee] border border-[#ffdbd2] px-2.5 py-1 rounded-md">
              Bugün: {days[days.length - 1].dayName}, {days[days.length - 1].dayNum}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#fcfaf7] border-b border-[#e5e0d5] text-[#2e4033] text-xs font-bold uppercase">
                  <th className="p-4 pl-6">Alışkanlık</th>
                  {days.map((d) => (
                    <th key={d.full} className={`p-3 text-center ${d.isToday ? 'text-[#f07052] font-extrabold bg-[#fff2ee]' : ''}`}>
                      <div>{d.dayName}</div>
                      <div className="text-[10px] text-[#526356] font-normal">{d.dayNum}</div>
                    </th>
                  ))}
                  <th className="p-4 text-center">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e0d5]">
                {habits.map((habit) => (
                  <tr key={habit.id} className="hover:bg-[#fcfaf7]/50 transition-colors">
                    <td className="p-4 pl-6 font-bold text-sm text-[#2e4033]">
                      {habit.title}
                    </td>
                    {days.map((d) => {
                      const isChecked = habit.completedDates.includes(d.full);
                      return (
                        <td key={d.full} className={`p-3 text-center ${d.isToday ? 'bg-[#fff2ee]/30' : ''}`}>
                          <button
                            onClick={() => toggleHabitForDate(habit.id, d.full)}
                            className={`w-8 h-8 rounded-xl flex items-center justify-center mx-auto transition-transform active:scale-90 cursor-pointer ${
                              isChecked
                                ? 'bg-[#3d5a45] text-white shadow-xs'
                                : 'bg-[#f2f7f3] hover:bg-[#e2ebd3] text-[#a0b0a3]'
                            }`}
                          >
                            {isChecked && <Check className="w-5 h-5" />}
                          </button>
                        </td>
                      );
                    })}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => deleteHabit(habit.id)}
                        className="p-1.5 text-[#526356]/60 hover:text-[#f07052] rounded-lg transition-colors cursor-pointer"
                        title="Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
