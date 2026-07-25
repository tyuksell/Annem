import React, { useState } from 'react';
import { DailyRoutineItem } from '../types';
import { 
  CheckCircle2, 
  Plus, 
  X,
  Trash2, 
  Clock, 
  Sun, 
  Egg, 
  Pill, 
  Activity, 
  Droplet, 
  Heart, 
  Baby, 
  Moon, 
  Sparkles,
  CalendarCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PlanTabProps {
  routineList: DailyRoutineItem[];
  toggleRoutineItem: (id: string) => void;
  addRoutineItem: (title: string, time: string, category: DailyRoutineItem['category']) => void;
  deleteRoutineItem: (id: string) => void;
}

export const PlanTab: React.FC<PlanTabProps> = ({
  routineList,
  toggleRoutineItem,
  addRoutineItem,
  deleteRoutineItem,
}) => {
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('12:00');
  const [newCategory, setNewCategory] = useState<DailyRoutineItem['category']>('custom');
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addRoutineItem(newTitle.trim(), newTime, newCategory);
    setNewTitle('');
    setIsAdding(false);
  };

  const getCategoryIcon = (category: DailyRoutineItem['category']) => {
    switch (category) {
      case 'sabah': return <Sun className="w-5 h-5 text-amber-500" />;
      case 'kahvalti': return <Egg className="w-5 h-5 text-orange-500" />;
      case 'vitamin': return <Pill className="w-5 h-5 text-rose-500" />;
      case 'egzersiz': return <Activity className="w-5 h-5 text-emerald-500" />;
      case 'su': return <Droplet className="w-5 h-5 text-sky-500" />;
      case 'dua': return <Heart className="w-5 h-5 text-purple-500" />;
      case 'ertugrul': return <Baby className="w-5 h-5 text-pink-500" />;
      case 'gece': return <Moon className="w-5 h-5 text-indigo-500" />;
      default: return <Clock className="w-5 h-5 text-slate-500" />;
    }
  };

  const completedCount = routineList.filter((r) => r.completed).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#e5e0d5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#f07052] font-bold text-xs uppercase tracking-wider mb-1">
            <CalendarCheck className="w-4 h-4" />
            <span>Saat Saat Günlük Yaşam Akışı</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#2e4033] tracking-tight">Günlük Plan & Rutinler</h2>
          <p className="text-[#526356] text-sm mt-0.5">
            Saatlik adımlarını takip et, başardığın her adıma tik at!
          </p>
        </div>

        {/* Progress Counter Pill */}
        <div className="flex items-center space-x-3 bg-[#eaf4eb] border border-[#cbe4cf] px-4 py-2.5 rounded-2xl">
          <div className="text-right">
            <span className="text-xs text-[#3d5a45] font-bold block">Tamamlanan Görevler</span>
            <span className="text-lg font-serif font-bold text-[#2e4033]">{completedCount} / {routineList.length}</span>
          </div>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center space-x-1 bg-[#f07052] hover:bg-[#d95a3d] text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            <span>{isAdding ? 'Kapat' : 'Görev Ekle'}</span>
          </button>
        </div>
      </div>

      {/* Form for adding custom routine */}
      <AnimatePresence>
        {isAdding && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="bg-[#fcfaf7] text-[#2e4033] p-5 rounded-3xl shadow-xs border border-[#e5e0d5] space-y-4 overflow-hidden"
          >
            <h3 className="font-serif font-bold text-sm text-[#2e4033]">Yeni Rutin / Görev Ekle</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-[#3d5a45] block mb-1">Görev Adı</label>
                <input
                  type="text"
                  placeholder="Örn: 15 Dk Kitap Okuma & Yeşil Çay"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-white border border-[#e5e0d5] text-[#2e4033] placeholder-[#526356]/50 rounded-xl px-3 py-2 text-sm focus:outline-hidden focus:border-[#f07052] transition-colors"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#3d5a45] block mb-1">Saat / Zaman</label>
                <input
                  type="text"
                  placeholder="Örn: 14:30"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full bg-white border border-[#e5e0d5] text-[#2e4033] rounded-xl px-3 py-2 text-sm focus:outline-hidden focus:border-[#f07052] transition-colors"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <label className="text-xs font-semibold text-[#3d5a45]">Kategori:</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="bg-white border border-[#e5e0d5] text-[#2e4033] rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:border-[#f07052] transition-colors"
                >
                  <option value="sabah" className="bg-white text-[#2e4033]">☀️ Sabah Rutini</option>
                  <option value="kahvalti" className="bg-white text-[#2e4033]">🍳 Kahvaltı</option>
                  <option value="vitamin" className="bg-white text-[#2e4033]">💊 Vitaminler</option>
                  <option value="egzersiz" className="bg-white text-[#2e4033]">🚶 Egzersiz</option>
                  <option value="su" className="bg-white text-[#2e4033]">💧 Su Takibi</option>
                  <option value="dua" className="bg-white text-[#2e4033]">📿 Dua/Zikir</option>
                  <option value="ertugrul" className="bg-white text-[#2e4033]">👶 Ertuğrul ile Aktivite</option>
                  <option value="gece" className="bg-white text-[#2e4033]">🌙 Gece Rutini</option>
                  <option value="custom" className="bg-white text-[#2e4033]">⚙️ Özel Görev</option>
                </select>
              </div>

              <button
                type="submit"
                className="bg-[#f07052] hover:bg-[#d95a3d] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
              >
                Görevi Kaydet
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Routine Timeline Cards */}
      {routineList.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-[#e5e0d5] text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 bg-[#eaf4eb] text-[#3d5a45] rounded-full flex items-center justify-center mx-auto">
            <CalendarCheck className="w-8 h-8" />
          </div>
          <h3 className="font-serif font-bold text-xl text-[#2e4033]">Henüz Tanımlanmış Bir Günlük Rutin Yok</h3>
          <p className="text-[#526356] text-sm max-w-md mx-auto">
            Gününü planlamak ve düzenli hissetmek için ilk akışını hemen oluştur!
          </p>
          <button
            onClick={() => setIsAdding(true)}
            className="mt-2 px-6 py-3 bg-[#f07052] hover:bg-[#d95a3d] text-white text-xs font-bold rounded-2xl transition-all shadow-xs inline-flex items-center space-x-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>İlk Rutinini Ekle</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {routineList.map((item) => {
            const Icon = getCategoryIcon(item.category);

            return (
              <motion.div
                key={item.id}
                layout
                className={`p-4 sm:p-5 rounded-3xl border transition-all flex items-center justify-between gap-4 ${
                  item.completed
                    ? 'bg-[#eaf4eb]/60 border-[#cbe4cf] text-[#2e4033] shadow-2xs'
                    : 'bg-white hover:border-[#f07052] border-[#e5e0d5] text-[#2e4033] shadow-xs'
                }`}
              >
                <div className="flex items-center space-x-4 flex-1">
                  {/* Checkbox circle */}
                  <button
                    onClick={() => toggleRoutineItem(item.id)}
                    className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                      item.completed
                        ? 'bg-[#3d5a45] text-white shadow-xs'
                        : 'border-2 border-[#d0dad2] hover:border-[#f07052] bg-[#fcfaf7]'
                    }`}
                  >
                    {item.completed && <CheckCircle2 className="w-5 h-5 fill-current" />}
                  </button>

                  <div className="p-2.5 bg-[#f2f7f3] rounded-2xl shrink-0">
                    {Icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-extrabold text-[#3d5a45] bg-[#eaf4eb] px-2 py-0.5 rounded-md">
                        {item.time}
                      </span>
                    </div>
                    <h4 className={`text-sm font-bold mt-1 ${item.completed ? 'line-through text-[#526356]' : 'text-[#2e4033]'}`}>
                      {item.title}
                    </h4>
                  </div>
                </div>

                <button
                  onClick={() => deleteRoutineItem(item.id)}
                  className="p-2 text-[#526356]/50 hover:text-[#f07052] hover:bg-[#fff2ee] rounded-xl transition-colors shrink-0 cursor-pointer"
                  title="Rutini Sil"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};
