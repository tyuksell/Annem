import React, { useState, useEffect } from 'react';
import { DhikrItem } from '../types';
import { spiritualQuotes } from '../data';
import { 
  Heart, 
  Plus, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  Trash2, 
  Check, 
  Feather, 
  ChevronDown, 
  ChevronUp, 
  Moon, 
  Sun, 
  Cloud, 
  Star, 
  Coffee, 
  Baby,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HusuTabProps {
  dhikrList: DhikrItem[];
  incrementDhikr: (id: string, amount?: number) => void;
  decrementDhikr: (id: string) => void;
  resetDhikr: (id: string) => void;
  addDhikr: (title: string, phrase: string, targetCount: number, category: string, meaning?: string) => void;
  deleteDhikr: (id: string) => void;
  resetAllDhikrs: () => void;
}

export const HusuTab: React.FC<HusuTabProps> = ({
  dhikrList,
  incrementDhikr,
  decrementDhikr,
  resetDhikr,
  addDhikr,
  deleteDhikr,
  resetAllDhikrs,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPhrase, setNewPhrase] = useState('');
  const [newTarget, setNewTarget] = useState(100);
  const [newCategory, setNewCategory] = useState('Genel');
  const [newMeaning, setNewMeaning] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const todayDate = new Date().toISOString().split('T')[0];
  const [prayerStatus, setPrayerStatus] = useState<Record<string, boolean>>({
    Sabah: false,
    Öğle: false,
    İkindi: false,
    Akşam: false,
    Yatsı: false,
  });
  const [prayerTrackDate, setPrayerTrackDate] = useState(todayDate);
  const [prayerToast, setPrayerToast] = useState<string>('');
  const [isPrayerToastVisible, setIsPrayerToastVisible] = useState(false);

  // Quote State (50 Spiritual Quotes)
  const [quoteIndex, setQuoteIndex] = useState(0);

  const handleNextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % spiritualQuotes.length);
  };

  const handleRandomQuote = () => {
    let nextIdx = Math.floor(Math.random() * spiritualQuotes.length);
    if (nextIdx === quoteIndex) {
      nextIdx = (quoteIndex + 1) % spiritualQuotes.length;
    }
    setQuoteIndex(nextIdx);
  };

  const currentQuote = spiritualQuotes[quoteIndex] || spiritualQuotes[0];

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (prayerTrackDate !== today) {
      setPrayerStatus({
        Sabah: false,
        Öğle: false,
        İkindi: false,
        Akşam: false,
        Yatsı: false,
      });
      setPrayerTrackDate(today);
    }
  }, [prayerTrackDate]);

  const togglePrayer = (prayer: string) => {
    setPrayerStatus((prev) => {
      const isNowCompleted = !prev[prayer];
      const nextStatus = {
        ...prev,
        [prayer]: isNowCompleted,
      };

      if (isNowCompleted) {
        setPrayerToast('Allah Kabul Etsin 🤲');
        setIsPrayerToastVisible(true);
        window.setTimeout(() => {
          setIsPrayerToastVisible(false);
        }, 2000);
      }

      return nextStatus;
    });
  };

  const completedPrayers = Object.values(prayerStatus).filter(Boolean).length;

  const handleIncrement = (id: string, amount: number = 1) => {
    if (navigator.vibrate) {
      try {
        navigator.vibrate(25);
      } catch (e) {}
    }
    incrementDhikr(id, amount);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPhrase.trim()) return;
    addDhikr(
      newTitle.trim(),
      newPhrase.trim(),
      Number(newTarget) || 100,
      newCategory.trim() || 'Genel',
      newMeaning.trim() || undefined
    );
    setNewTitle('');
    setNewPhrase('');
    setNewTarget(100);
    setNewCategory('Genel');
    setNewMeaning('');
    setIsAddModalOpen(false);
  };

  // Stats
  const completedCount = dhikrList.filter(d => d.currentCount >= d.targetCount).length;
  const totalDhikrSum = dhikrList.reduce((acc, d) => acc + d.currentCount, 0);
  const totalTargetSum = dhikrList.reduce((acc, d) => acc + d.targetCount, 0);
  const overallPercentage = totalTargetSum > 0 ? Math.min(100, Math.round((totalDhikrSum / totalTargetSum) * 100)) : 0;

  // Category Icon Resolver
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'sabah':
        return <Sun className="w-4 h-4 text-amber-500" />;
      case 'mutfak':
        return <Coffee className="w-4 h-4 text-orange-500" />;
      case 'ertuğrul':
      case 'bebek':
        return <Baby className="w-4 h-4 text-emerald-500" />;
      case 'gece':
        return <Moon className="w-4 h-4 text-indigo-400" />;
      default:
        return <Heart className="w-4 h-4 text-[#f07052]" />;
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Spiritual Hero Header Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2a4433] via-[#3d5a45] to-[#1f3326] text-white p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-emerald-100 text-xs font-medium border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Günün Manevi Dinginliği & Tesbihat</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-emerald-50">
              Huşu & Zikir Takibi
            </h1>
            <p className="text-emerald-100/90 text-sm max-w-xl font-sans leading-relaxed">
              Günlük temponuz içinde kalbinize ferahlık veren, dilde hafif mizanda ağır tesbihatlarınızı adım adım takip edin.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#f07052] to-[#e05e40] text-white text-xs font-bold shadow-md hover:brightness-110 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Özel Zikir Ekle</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Summary Strip */}
        <div className="mt-6 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-2.5 sm:p-3.5 border border-white/10 flex items-start gap-2 min-w-0">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-200 mt-1">
              <CheckCircle2 className="w-5 h-5 text-emerald-300" />
            </div>
            <div className="min-w-0 text-left">
              <p className="text-[9px] sm:text-[11px] text-emerald-100/80 uppercase tracking-wider font-medium truncate">Tamamlanan</p>
              <p className="text-lg font-bold text-white font-serif">{completedCount} / {dhikrList.length} Zikir</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-2.5 sm:p-3.5 border border-white/10 flex items-start gap-2 min-w-0">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-200 mt-1">
              <Feather className="w-5 h-5 text-amber-300" />
            </div>
            <div className="min-w-0 text-left">
              <p className="text-[9px] sm:text-[11px] text-emerald-100/80 uppercase tracking-wider font-medium truncate">Bugün Çekilen</p>
              <p className="text-lg font-bold text-white font-serif">{totalDhikrSum} Adet</p>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-white/10 backdrop-blur-xs rounded-2xl p-2.5 sm:p-3.5 border border-white/10 flex items-start justify-between gap-3 min-w-0">
            <div className="min-w-0 text-left">
              <p className="text-[9px] sm:text-[11px] text-emerald-100/80 uppercase tracking-wider font-medium truncate">Genel İlerleme</p>
              <p className="text-lg font-bold text-white font-serif">%{overallPercentage}</p>
            </div>
            {totalDhikrSum > 0 && (
              <button
                onClick={resetAllDhikrs}
                className="text-xs text-emerald-200/80 hover:text-white flex items-center gap-1 bg-black/20 hover:bg-black/30 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer"
                title="Günün tüm zikir sayılarını sıfırla"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Günü Sıfırla</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isPrayerToastVisible && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed left-1/2 top-24 z-50 -translate-x-1/2 rounded-3xl border border-[#e5e0d5] bg-white/95 px-5 py-3 text-sm font-semibold text-[#2e4033] shadow-xl backdrop-blur-md"
          >
            {prayerToast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Namaz Takibi */}
      <div className="bg-white rounded-3xl border border-[#e5e0d5] shadow-xs p-5 mt-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <p className="text-xs font-semibold text-[#3d5a45] uppercase tracking-wide">Namaz Takibi</p>
            <h3 className="text-lg font-serif font-bold text-[#2e4033]">Bugünkü ibadetlerini takip et</h3>
          </div>
          <div className="text-right text-sm text-[#526356]">
            <p className="font-bold text-[#3d5a45]">{completedPrayers} / 5</p>
            <p>Toplam tamamlanan namaz</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {Object.entries(prayerStatus).map(([name, done]) => {
            const icon = {
              Sabah: <Sun className="w-4 h-4 text-[#f8c36d]" />,
              Öğle: <Cloud className="w-4 h-4 text-[#86a8e7]" />,
              İkindi: <Sparkles className="w-4 h-4 text-[#f9c74f]" />,
              Akşam: <Moon className="w-4 h-4 text-[#91a3c6]" />,
              Yatsı: <Star className="w-4 h-4 text-[#f4c0ff]" />,
            }[name] || <Sun className="w-4 h-4 text-[#f8c36d]" />;

            return (
              <button
                key={name}
                onClick={() => togglePrayer(name)}
                className={`rounded-3xl border p-4 text-center text-xs font-bold transition-all ${
                  done
                    ? 'bg-[#3d5a45] text-white border-[#3d5a45]'
                    : 'bg-[#f5f1ea] text-[#3d5a45] border-[#e5e0d5] hover:bg-[#e2ebd3]'
                }`}
              >
                <div className="flex items-center justify-center mb-2">
                  {icon}
                </div>
                <span>{name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Spiritual Ayah / Verse Card with 50 Quotes & Refresh Button */}
      <div className="bg-[#f5f1ea] border border-[#e2d9cd] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-start gap-3 flex-1">
          <div className="p-2 rounded-xl bg-[#3d5a45]/10 text-[#3d5a45] shrink-0 mt-0.5">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <p className="text-xs font-semibold text-[#3d5a45] tracking-wide uppercase">Günün Manevi Kelâmı</p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={quoteIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="space-y-0.5"
              >
                <p className="text-sm font-serif italic text-[#2c3e32] leading-relaxed">
                  "{currentQuote.text}"
                </p>
                <p className="text-[11px] text-[#6b7c70] font-sans">— {currentQuote.source}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <button
          onClick={handleRandomQuote}
          className="self-end sm:self-center flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#d2c7b8] text-[#3d5a45] hover:bg-[#3d5a45] hover:text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
          title="Farklı bir kelâm / ayet göster"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Yeni Kelâm</span>
        </button>
      </div>

      {/* Main Dhikr Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {dhikrList.map((item) => {
          const isCompleted = item.currentCount >= item.targetCount;
          const progressPercent = Math.min(100, Math.round((item.currentCount / item.targetCount) * 100));
          const isExpanded = expandedId === item.id;

          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className={`relative rounded-3xl border transition-all duration-300 overflow-hidden shadow-sm flex flex-col justify-between ${
                isCompleted 
                  ? 'bg-gradient-to-b from-[#f2f8f4] to-[#e8f3ec] border-[#a3c2ac] shadow-md' 
                  : 'bg-white border-[#e5e0d5] hover:border-[#a3c2ac]'
              }`}
            >
              {/* Card Header Top */}
              <div className="p-5 pb-3">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-[#3d5a45]/10">
                      {getCategoryIcon(item.category)}
                    </div>
                    <span className="text-xs font-bold tracking-wide uppercase text-[#3d5a45]">
                      {item.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-bold shadow-xs">
                        <Check className="w-3.5 h-3.5" />
                        <span>Tamamlandı</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-[#f5f1ea] text-[#6b7c70] text-xs font-bold border border-[#e5e0d5]">
                        {item.currentCount} / {item.targetCount}
                      </span>
                    )}

                    <button
                      onClick={() => deleteDhikr(item.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition-all cursor-pointer ml-1"
                      title="Zikri Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Phrase Display Box */}
                <div className="p-4 rounded-2xl bg-[#faf7f2] border border-[#ebe5da] text-center space-y-2">
                  <p className="text-xl sm:text-2xl font-serif font-bold text-[#2d4a36] leading-snug tracking-wide">
                    "{item.phrase}"
                  </p>
                  <p className="text-xs text-[#526356] font-medium italic">
                    Hedef: {item.targetCount} Adet
                  </p>
                </div>

                {/* Meaning Accordion */}
                {item.meaning && (
                  <div className="mt-3">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      className="flex items-center justify-between w-full text-xs text-[#526356] hover:text-[#2d4a36] font-medium py-1 transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Manası ve Fazileti</span>
                      </span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-xs text-[#4a5c4f] bg-[#edf4ef] p-3 rounded-xl mt-1 leading-relaxed border border-[#d2e3d7]"
                        >
                          {item.meaning}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              <div className="px-5 my-1">
                <div className="w-full bg-[#e8e2d8] rounded-full h-2.5 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 rounded-full ${
                      isCompleted ? 'bg-gradient-to-r from-emerald-500 to-green-600' : 'bg-gradient-to-r from-[#3d5a45] to-[#f07052]'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Counter Controls Footer */}
              <div className="p-5 pt-3 bg-gray-50/50 border-t border-[#f0ece4] flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => decrementDhikr(item.id)}
                    disabled={item.currentCount === 0}
                    className="p-2.5 rounded-xl border border-[#dcd6c9] bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 transition-all cursor-pointer"
                    title="1 Eksilt"
                  >
                    -1
                  </button>
                  <button
                    onClick={() => resetDhikr(item.id)}
                    disabled={item.currentCount === 0}
                    className="p-2.5 rounded-xl border border-[#dcd6c9] bg-white text-gray-500 hover:text-amber-600 hover:bg-amber-50 disabled:opacity-40 transition-all cursor-pointer"
                    title="Sıfırla"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleIncrement(item.id, 10)}
                    className="px-3 py-2.5 rounded-xl border border-[#c3d7c9] bg-[#eef5f0] text-[#2d4a36] hover:bg-[#dcecd0] text-xs font-bold transition-all cursor-pointer active:scale-95"
                    title="+10 Hızlı Çek"
                  >
                    +10
                  </button>

                  <button
                    onClick={() => handleIncrement(item.id, 1)}
                    className={`flex-1 min-w-[120px] px-5 py-3 rounded-2xl font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95 ${
                      isCompleted 
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                        : 'bg-[#3d5a45] hover:bg-[#2d4a36] text-white'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Zikir Çek</span>
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Add Custom Dhikr Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-[#e5e0d5] space-y-4"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-emerald-100 text-[#3d5a45]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#2d4a36]">
                    Yeni Zikir / Dua Ekle
                  </h3>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-lg cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Başlık / Zamanı (Örn: İkindi Sonrası, Şifa Duası)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Sabah Tesbihatı"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#3d5a45] focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Okunacak Cümle / Zikir Lafzı
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Sübhânallah, Elhamdülillâh..."
                    value={newPhrase}
                    onChange={(e) => setNewPhrase(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#3d5a45] focus:outline-none text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Hedef Sayı
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={10000}
                      value={newTarget}
                      onChange={(e) => setNewTarget(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#3d5a45] focus:outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Kategori
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#3d5a45] focus:outline-none text-sm"
                    >
                      <option value="Sabah">Sabah</option>
                      <option value="Mutfak">Mutfak</option>
                      <option value="Ertuğrul">Ertuğrul Bebek</option>
                      <option value="Gece">Gece</option>
                      <option value="Genel">Genel</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Anlamı / Not (İsteğe Bağlı)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Bu zikrin fazileti veya Türkçe anlamı..."
                    value={newMeaning}
                    onChange={(e) => setNewMeaning(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#3d5a45] focus:outline-none text-sm"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 cursor-pointer"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#3d5a45] hover:bg-[#2d4a36] shadow-sm cursor-pointer"
                  >
                    Kaydet & Ekle
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
