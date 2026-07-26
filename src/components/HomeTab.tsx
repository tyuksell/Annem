import React from 'react';
import { UserProfile, DailyRoutineItem, WaterLog, WeightLog, Habit, TabType } from '../types';
import { 
  Sparkles, 
  Flame, 
  Droplet, 
  CheckCircle2, 
  Clock, 
  Scale, 
  Activity, 
  Heart, 
  TrendingDown,
  Quote,
  ArrowRight,
  ShieldAlert,
  Award,
  Baby,
  Plus,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HomeTabProps {
  userProfile: UserProfile;
  routineList: DailyRoutineItem[];
  waterLog: WaterLog;
  weightLogs: WeightLog[];
  habits: Habit[];
  daysRemaining: number;
  quote: string;
  refreshQuote: () => void;
  setActiveTab: (tab: TabType) => void;
  toggleRoutineItem: (id: string) => void;
  incrementWater: () => void;
  openSetupModal?: () => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  userProfile,
  routineList,
  waterLog,
  weightLogs,
  habits,
  daysRemaining,
  quote,
  refreshQuote,
  setActiveTab,
  toggleRoutineItem,
  incrementWater,
  openSetupModal,
}) => {
  // Date formatting in Turkish
  const todayDate = new Date().toLocaleDateString('tr-TR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Calculate routine completion %
  const completedRoutines = routineList.filter((r) => r.completed).length;
  const routinePercentage = routineList.length > 0
    ? Math.round((completedRoutines / routineList.length) * 100)
    : 0;

  // Weight calculations
  const weightLost = userProfile.startWeight > 0 && userProfile.currentWeight > 0
    ? (userProfile.startWeight - userProfile.currentWeight).toFixed(1)
    : '0.0';

  const weightToTarget = userProfile.currentWeight > userProfile.targetWeight
    ? (userProfile.currentWeight - userProfile.targetWeight).toFixed(1)
    : '0.0';

  return (
    <div className="space-y-6 pb-12">
      
      {/* Hero Welcome Banner with Organic Shapes & Mother-Baby Illustration */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2e4535] via-[#3d5a45] to-[#4e7258] text-white p-6 sm:p-8 shadow-md border border-[#354f3c]"
      >
        {/* Abstract Organic Translucent Background Waves */}
        <div className="absolute -right-12 -bottom-16 w-80 h-80 bg-[#ff7259]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/3 -top-20 w-64 h-64 bg-[#a7c7a6]/20 rounded-full blur-2xl pointer-events-none"></div>
        
        {/* Subtle decorative wave pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0,60 C 150,120 350,-20 500,60 C 650,140 850,20 1000,80 L 1000,160 L 0,160 Z" fill="#ffffff" />
        </svg>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex-1 max-w-2xl">
            <div className="flex items-center space-x-2 text-[#d8e8dc] text-xs font-semibold tracking-wider uppercase mb-2">
              <Clock className="w-4 h-4 text-[#ff8a70]" />
              <span>{todayDate}</span>
            </div>
            {userProfile.isProfileCreated ? (
              <>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-white leading-snug">
                  Hoş Geldin, <span className="text-[#ffe0d6] italic">{userProfile.name}</span> 👋
                </h2>
                <p className="text-[#e2ebd3] text-sm mt-1.5 leading-relaxed">
                  Dönüşüm yolculuğun kararlılık ve sevgiyle devam ediyor. Sağlıklı yaşam ve kişisel gelişim yolunda bugün harika adımlar atacaksın!
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-white leading-snug">
                  Annem Uygulamasına Hoş Geldin! 👋
                </h2>
                <p className="text-[#e2ebd3] text-sm mt-1.5 leading-relaxed">
                  Seni daha yakından tanımamız ve hedeflerine birlikte sevgiyle yürümek için profilini hızlıca oluşturalım 🌸
                </p>
                <button
                  onClick={openSetupModal}
                  className="mt-3.5 px-5 py-2.5 bg-[#f07052] hover:bg-[#d95a3d] text-white text-xs font-bold rounded-2xl transition-all shadow-xs inline-flex items-center space-x-2 cursor-pointer active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Profilimi Oluştur 🌸</span>
                </button>
              </>
            )}

            {/* Badges / Status Chips */}
            <div className="flex flex-wrap items-center gap-2 mt-4">
              {userProfile.isNursing && (
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#ff7259]/25 text-[#ffe0d6] border border-[#ff7259]/40 backdrop-blur-xs">
                  <Baby className="w-3.5 h-3.5 text-[#ff8a70]" />
                  <span>Emziren Anne Modu</span>
                </span>
              )}
              {userProfile.hasKneeIssue && (
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#a7c7a6]/25 text-[#e2ebd3] border border-[#a7c7a6]/40 backdrop-blur-xs">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#a7c7a6]" />
                  <span>Diz Dostu Egzersizler</span>
                </span>
              )}
            </div>
          </div>

          {/* Right Section: Mother & Baby Minimalist Vector Illustration + Countdown Card */}
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-4 shrink-0">
            
            {/* Minimalist Mother & Baby Illustration Card */}
            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 flex items-center space-x-3.5 shadow-xs">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#f07052] to-[#ff9e80] flex items-center justify-center shrink-0 shadow-md relative overflow-hidden">
                <svg className="w-12 h-12 text-white fill-current opacity-90" viewBox="0 0 24 24" fill="none">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="white" fillOpacity="0.2"/>
                  <circle cx="10" cy="8" r="3" fill="white"/>
                  <path d="M10 12c-2.5 0-5 1.5-5 4v1h10v-1c0-2.5-2.5-4-5-4z" fill="white"/>
                  <circle cx="15.5" cy="11.5" r="2" fill="#ffe0d6"/>
                  <path d="M15.5 14.5c-1.5 0-3 1-3 2.5v0.5h6v-0.5c0-1.5-1.5-2.5-3-2.5z" fill="#ffe0d6"/>
                </svg>
              </div>
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-[#ffd2c7] tracking-wider block">Sevgi Dolu Anne</span>
                <span className="font-serif font-bold text-sm text-white block">Anne & Bebek Dengesi</span>
                <span className="text-[11px] text-[#d8e8dc] block mt-0.5">Sakin, Huzurlu & Güçlü</span>
              </div>
            </div>

            {/* Countdown & Lost Weight Stats */}
            <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-white/20 shadow-xs">
              <div className="text-center">
                <span className="text-[10px] text-[#d8e8dc] font-medium uppercase tracking-wider block">Kalan Süre</span>
                <span className="text-3xl font-serif font-bold text-[#ff8a70] tracking-tight">{daysRemaining}</span>
                <span className="text-[10px] text-[#d8e8dc] block">Gün / {userProfile.targetDays || 60} Gün</span>
              </div>
              <div className="w-px h-10 bg-white/20"></div>
              <div className="text-center">
                <span className="text-[10px] text-[#d8e8dc] font-medium uppercase tracking-wider block">Verilen Kilo</span>
                <span className="text-2xl font-serif font-bold text-[#a7c7a6]">-{weightLost}</span>
                <span className="text-[10px] text-[#d8e8dc] block">kg</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Motivational Quote Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#f7f5f0] border border-[#e5e0d5] rounded-3xl p-5 shadow-2xs relative"
      >
        <div className="flex items-start space-x-4">
          <div className="p-2.5 bg-[#f07052] text-white rounded-2xl shadow-xs shrink-0">
            <Quote className="w-5 h-5" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#3d5a45]">Günün Motivasyon Sözü</span>
              <button 
                onClick={refreshQuote}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-[#d2c7b8] text-[#3d5a45] hover:bg-[#3d5a45] hover:text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
                title="Farklı bir motivasyon sözü göster"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Yeni Kelâm</span>
              </button>
            </div>
            <AnimatePresence mode="wait">
              <motion.p 
                key={quote}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="text-[#38423b] font-serif italic text-base sm:text-lg leading-relaxed"
              >
                "{quote}"
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Goal Completion Rate Card */}
        <motion.div 
          whileHover={{ y: -3 }}
          className="bg-white p-5 rounded-3xl border border-[#e5e0d5] shadow-xs flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#526356] uppercase tracking-wider">Bugünkü Görevler</span>
            <div className="w-10 h-10 rounded-2xl bg-[#eaf4eb] text-[#3d5a45] border border-[#cbe4cf] flex items-center justify-center shadow-2xs">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="my-3">
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-serif font-bold text-[#2e4033]">%{routinePercentage}</span>
              <span className="text-xs text-[#526356]">({completedRoutines}/{routineList.length} tamamlandı)</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2.5 bg-[#f0f4f1] rounded-full mt-2 overflow-hidden border border-[#e2ebd3]">
              <div 
                className="h-full bg-gradient-to-r from-[#4d7056] to-[#81a880] rounded-full transition-all duration-500"
                style={{ width: `${routinePercentage}%` }}
              ></div>
            </div>
          </div>
          <button 
            onClick={() => setActiveTab('plan')}
            className="text-xs font-bold text-[#f07052] hover:text-[#3d5a45] flex items-center space-x-1 cursor-pointer"
          >
            <span>Planı Yönet</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>

        {/* Water Intake Quick Tracker - Sky Blue Theme */}
        <motion.div 
          whileHover={{ y: -3 }}
          className="bg-white p-5 rounded-3xl border border-[#e5e0d5] shadow-xs flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#526356] uppercase tracking-wider">Su Tüketimi</span>
            <div className="w-10 h-10 rounded-2xl bg-[#e0f2fe] text-[#0284c7] border border-[#bae6fd] flex items-center justify-center shadow-2xs">
              <Droplet className="w-5 h-5" />
            </div>
          </div>
          <div className="my-3">
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-serif font-bold text-[#0284c7]">{waterLog.glasses}</span>
              <span className="text-xs text-[#526356]">/ {waterLog.targetGlasses} Bardak ({waterLog.glasses * 250} ml)</span>
            </div>
            {/* Water progress bar */}
            <div className="w-full h-2.5 bg-[#e0f2fe] rounded-full mt-2 overflow-hidden border border-[#bae6fd]">
              <div 
                className="h-full bg-[#0284c7] rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (waterLog.glasses / waterLog.targetGlasses) * 100)}%` }}
              ></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button 
              onClick={incrementWater}
              className="text-xs font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] px-3.5 py-1.5 rounded-xl transition-all shadow-2xs cursor-pointer active:scale-95 flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>1 Bardak İçtim</span>
            </button>
            <button 
              onClick={() => setActiveTab('water')}
              className="text-xs font-bold text-[#3d5a45] hover:text-[#f07052] cursor-pointer"
            >
              Detay
            </button>
          </div>
        </motion.div>

        {/* Weight Progress Card */}
        <motion.div 
          whileHover={{ y: -3 }}
          className="bg-white p-5 rounded-3xl border border-[#e5e0d5] shadow-xs flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#526356] uppercase tracking-wider">Güncel Ağırlık</span>
            <div className="w-10 h-10 rounded-2xl bg-[#ffede8] text-[#f07052] border border-[#ffccd2] flex items-center justify-center shadow-2xs">
              <Scale className="w-5 h-5" />
            </div>
          </div>
          <div className="my-3">
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-serif font-bold text-[#2e4033]">{userProfile.currentWeight}</span>
              <span className="text-xs font-bold text-[#4d7056] flex items-center">
                <TrendingDown className="w-3.5 h-3.5 mr-0.5 text-[#4d7056]" />
                kg
              </span>
            </div>
            <p className="text-xs text-[#526356] mt-1">
              Hedef {userProfile.targetWeight} kg'a kaldı: <strong className="text-[#f07052] font-bold">{weightToTarget} kg</strong>
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('weight')}
            className="text-xs font-bold text-[#f07052] hover:text-[#3d5a45] flex items-center space-x-1 cursor-pointer"
          >
            <span>Grafiği Gör</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>

        {/* AI Assistant Callout */}
        <motion.div 
          whileHover={{ y: -3 }}
          className="bg-[#3d5a45] text-white p-5 rounded-3xl shadow-xs flex flex-col justify-between relative overflow-hidden border border-[#2e4535]"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#d8e8dc] uppercase tracking-wider">AI Yaşam Koçu</span>
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#ff8a70]" />
            </div>
          </div>
          <div className="my-3">
            <p className="text-sm font-serif italic text-[#f7f5f0]">
              "Bugün ne yemeli, hangi hareketi yapmalıyım?"
            </p>
            <p className="text-xs text-[#d8e8dc] mt-1">
              Emziren anne beslenmesi & diz dostu öneriler.
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('ai')}
            className="w-full py-2 bg-[#f07052] hover:bg-[#d95a3d] text-white text-xs font-bold rounded-2xl transition-all shadow-2xs text-center cursor-pointer active:scale-95"
          >
            Koç ile Sohbet Et
          </button>
        </motion.div>
      </div>

      {/* Today's Checklist Quick View */}
      <div className="bg-white rounded-3xl border border-[#e5e0d5] p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-serif font-bold text-[#2e4033]">Bugünkü Hedefler & Rutinler</h3>
            <p className="text-xs text-[#526356]">Tamamladıkça üzerine tıklayarak tik atabilirsin.</p>
          </div>
          <button 
            onClick={() => setActiveTab('plan')}
            className="text-xs font-bold text-[#f07052] hover:text-[#3d5a45] bg-[#fff2ee] px-3.5 py-1.5 rounded-xl transition-colors border border-[#ffdbd2] cursor-pointer"
          >
            Tümünü Gör / Düzenle
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {routineList.length === 0 ? (
            <div className="col-span-full text-center py-6 bg-[#fcfaf7] rounded-2xl border border-dashed border-[#e5e0d5]">
              <p className="text-xs text-[#526356] font-medium">Bugün için henüz bir rutin eklenmedi.</p>
              <button
                onClick={() => setActiveTab('plan')}
                className="mt-2 text-xs font-bold text-[#f07052] underline hover:text-[#3d5a45] cursor-pointer"
              >
                + İlk rutinini oluştur
              </button>
            </div>
          ) : (
            routineList.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleRoutineItem(item.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  item.completed
                    ? 'bg-[#eaf4eb] border-[#cbe4cf] text-[#2e4033]'
                    : 'bg-[#fcfaf7] hover:bg-[#f2f7f3] border-[#e5e0d5] text-[#2e4033]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                      item.completed ? 'bg-[#3d5a45] text-white' : 'border-2 border-[#d0dad2] bg-white'
                    }`}
                  >
                    {item.completed && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${item.completed ? 'line-through text-[#526356]' : 'text-[#2e4033]'}`}>
                      {item.title}
                    </p>
                    <span className="text-[11px] text-[#526356] font-medium">{item.time}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
