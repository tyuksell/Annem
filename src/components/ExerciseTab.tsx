import React, { useState, useEffect } from 'react';
import { ExerciseRoutine, UserProfile } from '../types';
import { 
  Activity, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Flame, 
  Baby, 
  Sparkles,
  Plus,
  Trash2,
  X,
  Dumbbell
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ExerciseTabProps {
  exercises: ExerciseRoutine[];
  userProfile: UserProfile;
  completeExercise: (id: string) => void;
  addExercise?: (exercise: Omit<ExerciseRoutine, 'id' | 'completedDates'>) => ExerciseRoutine;
  deleteExercise?: (id: string) => void;
}

export const ExerciseTab: React.FC<ExerciseTabProps> = ({
  exercises,
  userProfile,
  completeExercise,
  addExercise,
  deleteExercise,
}) => {
  const [selectedEx, setSelectedEx] = useState<ExerciseRoutine | null>(exercises.length > 0 ? exercises[0] : null);
  const [kneeFilter, setKneeFilter] = useState<boolean>(userProfile.hasKneeIssue);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // New Exercise Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDuration, setNewDuration] = useState(20);
  const [newIntensity, setNewIntensity] = useState<'Kolay' | 'Orta' | 'Yoğun'>('Orta');
  const [newIsKneeFriendly, setNewIsKneeFriendly] = useState(true);
  const [newDescription, setNewDescription] = useState('');
  const [newSteps, setNewSteps] = useState('');

  // Keep selectedEx synced when exercises change
  useEffect(() => {
    if (!selectedEx && exercises.length > 0) {
      setSelectedEx(exercises[0]);
    } else if (selectedEx && !exercises.some(e => e.id === selectedEx.id)) {
      setSelectedEx(exercises.length > 0 ? exercises[0] : null);
    }
  }, [exercises, selectedEx]);

  // Timer state
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setSeconds(0);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const filteredExercises = kneeFilter
    ? exercises.filter((e) => e.isKneeFriendly)
    : exercises;

  const todayStr = new Date().toISOString().split('T')[0];

  const handleCreateExercise = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !addExercise) return;

    const stepList = newSteps.split('\n').map(s => s.trim()).filter(Boolean);

    const newEx = addExercise({
      title: newTitle.trim(),
      durationMinutes: Number(newDuration) || 15,
      intensity: newIntensity,
      isKneeFriendly: newIsKneeFriendly,
      description: newDescription.trim() || 'Kişisel egzersiz hareketiniz.',
      steps: stepList.length > 0 ? stepList : ['Egzersiz adımlarını uygulayın.'],
    });

    if (newEx) {
      setSelectedEx(newEx);
      // If knee filter is enabled and the added exercise is not knee friendly,
      // toggle the filter off so the user can see their added exercise.
      if (kneeFilter && !newEx.isKneeFriendly) {
        setKneeFilter(false);
      }
    }

    setNewTitle('');
    setNewDescription('');
    setNewSteps('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e5e0d5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-[#f07052] font-bold text-xs uppercase tracking-wider mb-1">
            <Activity className="w-4 h-4" />
            <span>Sağlıklı & Güvenli Hareket Odası</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#2e4033] tracking-tight">Günlük Egzersiz Rutini</h2>
          <p className="text-[#526356] text-sm mt-0.5">
            Metabolizmanı canlı tut, eklemlerini koru!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {addExercise && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 bg-[#f07052] hover:bg-[#d95a3d] text-white font-bold text-xs rounded-2xl transition-all shadow-xs flex items-center justify-center space-x-2 cursor-pointer shrink-0 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Egzersiz Ekle</span>
            </button>
          )}

          {/* Knee Friendly Filter Toggle */}
          <div className="flex items-center space-x-3 bg-[#eaf4eb] border border-[#cbe4cf] px-4 py-2.5 rounded-2xl">
            <ShieldCheck className="w-5 h-5 text-[#3d5a45] shrink-0" />
            <div>
              <span className="text-xs font-bold text-[#2e4033] block">Diz Dostu</span>
            </div>
            <button
              onClick={() => setKneeFilter(!kneeFilter)}
              className={`w-10 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                kneeFilter ? 'bg-[#3d5a45]' : 'bg-[#d0dad2]'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                kneeFilter ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Exercise View with Interactive Timer */}
      {selectedEx ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Selected Exercise & Timer Card */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-[#e5e0d5] shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e5e0d5]">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-[#f07052] uppercase bg-[#fff2ee] border border-[#ffdbd2] px-2.5 py-1 rounded-md">
                    {selectedEx.intensity} Yoğunluk
                  </span>
                  {selectedEx.isKneeFriendly && (
                    <span className="text-xs font-bold text-[#3d5a45] uppercase bg-[#eaf4eb] border border-[#cbe4cf] px-2.5 py-1 rounded-md flex items-center">
                      <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                      Diz Dostu
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#2e4033] mt-2">{selectedEx.title}</h3>
                <p className="text-xs text-[#526356] mt-1">{selectedEx.description}</p>
              </div>

              {/* Complete Today Button */}
              <button
                onClick={() => completeExercise(selectedEx.id)}
                className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 cursor-pointer ${
                  selectedEx.completedDates.includes(todayStr)
                    ? 'bg-[#eaf4eb] text-[#3d5a45] border border-[#cbe4cf]'
                    : 'bg-[#3d5a45] hover:bg-[#2e4033] text-white shadow-xs'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{selectedEx.completedDates.includes(todayStr) ? 'Bugün Tamamlandı!' : 'Tamamlandı Olarak İşaretle'}</span>
              </button>
            </div>

            {/* Live Stopwatch / Timer Counter Box */}
            <div className="bg-[#2e4033] text-white p-6 sm:p-8 rounded-3xl shadow-sm text-center relative overflow-hidden flex flex-col items-center justify-center space-y-4">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Dumbbell className="w-32 h-32" />
              </div>

              <span className="text-xs uppercase tracking-widest text-[#a0b0a3] font-bold">
                Egzersiz Sayacı & Kronometre
              </span>

              <div className="text-5xl sm:text-6xl font-mono font-bold tracking-tight text-[#f2f7f3]">
                {formatTime(seconds)}
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  onClick={toggleTimer}
                  className={`p-4 rounded-2xl font-bold text-xs transition-all flex items-center space-x-2 cursor-pointer ${
                    isActive ? 'bg-[#f07052] hover:bg-[#d95a3d] text-white' : 'bg-[#81a880] hover:bg-[#6f966e] text-[#2e4033]'
                  }`}
                >
                  {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                  <span>{isActive ? 'Durdur' : 'Başlat'}</span>
                </button>

                <button
                  onClick={resetTimer}
                  className="p-4 bg-[#3d5a45] hover:bg-[#283d2f] text-[#f2f7f3] rounded-2xl transition-colors cursor-pointer"
                  title="Sıfırla"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Steps Instructions */}
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-base text-[#2e4033]">Adım Adım Hareket Rehberi</h4>
              <div className="space-y-2">
                {selectedEx.steps.map((step, idx) => (
                  <div key={idx} className="p-3.5 bg-[#fcfaf7] border border-[#e5e0d5] rounded-2xl flex items-start space-x-3">
                    <span className="w-6 h-6 rounded-full bg-[#3d5a45] text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-[#2e4033] leading-relaxed pt-0.5">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Exercise List Menu Column */}
          <div className="bg-white rounded-3xl p-6 border border-[#e5e0d5] shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-[#2e4033] text-base">Egzersiz Menüsü</h3>

            <div className="space-y-2.5">
              {filteredExercises.map((ex) => {
                const isSelected = selectedEx?.id === ex.id;
                const isCompleted = ex.completedDates.includes(todayStr);

                return (
                  <div
                    key={ex.id}
                    onClick={() => setSelectedEx(ex)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#f2f7f3] border-[#3d5a45] shadow-xs'
                        : 'bg-white border-[#e5e0d5] hover:border-[#f07052]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-[#2e4033]">{ex.title}</span>
                        {ex.isKneeFriendly && (
                          <span className="text-[10px] font-bold bg-[#eaf4eb] text-[#3d5a45] px-1.5 py-0.5 rounded-md">
                            Diz Dostu
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-[#526356] mt-1">
                        <span className="flex items-center">
                          <Clock className="w-3.5 h-3.5 mr-1 text-[#f07052]" />
                          {ex.durationMinutes} Dk
                        </span>
                        <span>• {ex.intensity}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {isCompleted && (
                        <CheckCircle2 className="w-5 h-5 text-[#3d5a45]" />
                      )}
                      {deleteExercise && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteExercise(ex.id);
                          }}
                          className="p-1.5 text-[#526356]/50 hover:text-[#f07052] rounded-lg cursor-pointer"
                          title="Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-12 rounded-3xl border border-[#e5e0d5] text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 bg-[#fff2ee] text-[#f07052] rounded-full flex items-center justify-center mx-auto">
            <Activity className="w-8 h-8" />
          </div>
          <h3 className="font-serif font-bold text-xl text-[#2e4033]">Egzersiz Bulunamadı</h3>
          <p className="text-[#526356] text-sm max-w-md mx-auto">
            Filtrenize uygun hareket bulunamadı veya henüz listeye eklenmedi.
          </p>
        </div>
      )}

      {/* Add Exercise Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2e4033]/60 backdrop-blur-xs cursor-pointer">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 max-w-md w-full shadow-xl border border-[#e5e0d5] relative cursor-default"
            >
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#f2f7f3] text-[#2e4033] hover:bg-[#e2ebd3] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="font-serif font-bold text-xl text-[#2e4033] mb-4">Yeni Egzersiz Ekle</h3>

              <form onSubmit={handleCreateExercise} className="space-y-4 text-xs text-[#2e4033]">
                <div>
                  <label className="font-bold block mb-1">Egzersiz Başlığı</label>
                  <input
                    type="text"
                    placeholder="Örn: 15 Dk Bacak Sıkılaştırma"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full p-3 bg-[#fcfaf7] border border-[#e5e0d5] rounded-xl focus:outline-hidden focus:border-[#f07052]"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold block mb-1">Süre (Dakika)</label>
                    <input
                      type="number"
                      value={newDuration}
                      onChange={(e) => setNewDuration(Number(e.target.value))}
                      className="w-full p-3 bg-[#fcfaf7] border border-[#e5e0d5] rounded-xl focus:outline-hidden focus:border-[#f07052]"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-bold block mb-1">Yoğunluk</label>
                    <select
                      value={newIntensity}
                      onChange={(e) => setNewIntensity(e.target.value as any)}
                      className="w-full p-3 bg-[#fcfaf7] border border-[#e5e0d5] rounded-xl text-[#2e4033] focus:outline-hidden focus:border-[#f07052]"
                    >
                      <option value="Kolay">Kolay</option>
                      <option value="Orta">Orta</option>
                      <option value="Yoğun">Yoğun</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold block mb-1">Açıklama</label>
                  <input
                    type="text"
                    placeholder="Egzersizin kısa amacı..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full p-3 bg-[#fcfaf7] border border-[#e5e0d5] rounded-xl focus:outline-hidden focus:border-[#f07052]"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">Adımlar (Her satıra bir adım)</label>
                  <textarea
                    rows={3}
                    placeholder="Isınma hareketleri yapın.&#10;3 set 12 tekrar squat yapın."
                    value={newSteps}
                    onChange={(e) => setNewSteps(e.target.value)}
                    className="w-full p-3 bg-[#fcfaf7] border border-[#e5e0d5] rounded-xl focus:outline-hidden focus:border-[#f07052]"
                  ></textarea>
                </div>

                <div className="flex items-center space-x-2 pt-1">
                  <input
                    type="checkbox"
                    id="kneeCheck"
                    checked={newIsKneeFriendly}
                    onChange={(e) => setNewIsKneeFriendly(e.target.checked)}
                    className="w-4 h-4 text-[#f07052] accent-[#f07052] rounded-xs cursor-pointer"
                  />
                  <label htmlFor="kneeCheck" className="font-semibold cursor-pointer">
                    Diz Dostu bir Egzersiz mi?
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#f07052] hover:bg-[#d95a3d] text-white font-bold text-xs rounded-2xl transition-all shadow-xs mt-2 cursor-pointer"
                >
                  Egzersizi Kaydet
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
