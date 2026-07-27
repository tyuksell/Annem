import React, { useState, useRef } from 'react';
import { Check, Home, ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface ChoreTask {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const CHORES: ChoreTask[] = [
  {
    id: 'chore-1',
    title: 'Yatakları Toplamak ve Odaları Havalandırmak',
    description:
      'Güne başlarken yatakları düzeltmek evde anında bir düzen hissi yaratır. Pencereleri açıp tüm evi en az 10-15 dakika havalandırmak ortamın havasını tazeler.',
    icon: '🛏️',
  },
  {
    id: 'chore-2',
    title: 'Bulaşıkları Düzenlemek ve Tezgah Temizliği',
    description:
      'Kahvaltı ve yemek sonrasında bulaşıkları hemen makineye dizmek veya yıkamak, tezgahın üzerinde birikmesini önler. Tezgâhı silip kurulamak mutfağı her zaman derli toplu gösterir.',
    icon: '🍽️',
  },
  {
    id: 'chore-3',
    title: 'Evi Hızlıca Süpürmek ve Yüzeyleri Silmek',
    description:
      'Gün içinde sık kullanılan alanları (salon, koridor, mutfak) hafifçe süpürmek ve yemek masası, sehpa gibi yüzeylerin tozunu almak kirin birikmesini engeller.',
    icon: '🧹',
  },
  {
    id: 'chore-4',
    title: 'Çamaşır Rutini (Yıkama, Asma/Kurutma, Katlama)',
    description:
      'Çamaşırları biriktirmek yerine her gün ya da iki günde bir tek doz yıkayıp asmak veya kurutmak, sonrasında hemen katlayıp dolaplara kaldırmak büyük bir yükü ortadan kaldırır.',
    icon: '👕',
  },
  {
    id: 'chore-5',
    title: 'Günlük Banyo ve Lavabo Temizliği',
    description:
      'Banyo lavabosunu ve aynayı her gün hafifçe silmek, klozet hijyenini sağlamak banyonun her zaman ferah ve temiz kalmasını sağlar.',
    icon: '🚿',
  },
  {
    id: 'chore-6',
    title: 'Eşyaları Yerine Koymak (Gün Sonu Toplama Rutini)',
    description:
      'Gün içinde etrafa dağılan oyuncakları, kıyafetleri, kumandaları veya gazete/dergileri ait oldukları yerlere kaldırmak evdeki dağınıklığı anında çözer.',
    icon: '🏡',
  },
  {
    id: 'chore-7',
    title: 'Yemek Planlaması ve Mutfak Hazırlığı',
    description:
      'Bir sonraki günün yemek menüsünü önceden belirlemek ve gerekiyorsa dondurucudan malzeme çıkarmak veya ön hazırlık yapmak akşam telaşını azaltır.',
    icon: '🥘',
  },
  {
    id: 'chore-8',
    title: 'Çöp ve Geri Dönüşümleri Boşaltmak',
    description:
      'Mutfak ve banyo çöplerini her gün veya doldukça düzenli olarak boşaltmak evde kötü koku oluşmasını önler.',
    icon: '🗑️',
  },
  {
    id: 'chore-9',
    title: 'Buzdolabını ve Kileri Kontrol Etmek',
    description:
      'Son kullanma tarihi geçmek üzere olan veya bozulan gıdaları tespit etmek, buzdolabını haftalık düzenli silip düzenlemek gıda israfını önler.',
    icon: '🧊',
  },
];

const PAGES = [
  CHORES.slice(0, 3),
  CHORES.slice(3, 6),
  CHORES.slice(6, 9),
];

const todayKey = (): string => new Date().toISOString().split('T')[0];

export const EvIsleriTab: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const toggleCheck = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const goToPage = (page: number) => {
    if (page >= 0 && page < PAGES.length) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = (touchStartX.current ?? 0) - (touchEndX.current ?? 0);
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToPage(currentPage + 1);
      else goToPage(currentPage - 1);
    }
  };

  const completedCount = CHORES.filter((c) => checked[c.id]).length;

  return (
    <div className="space-y-6 pb-2 lg:pb-0">
      {/* Top Section: Header & Image (Responsive Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left / Main Column: Title & Progress (on desktop) */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-6">
          {/* Header Card */}
          <div className="bg-[#3d5a45] text-white rounded-3xl p-6 sm:p-8 shadow-md flex-1 flex flex-col justify-center relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute left-1/3 bottom-0 w-48 h-20 bg-[#f07052]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center space-x-2 text-[#ff9880] font-bold text-xs uppercase tracking-wider mb-2">
                <Home className="w-4 h-4" />
                <span>Ev Düzeni &amp; Hijyen</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight">
                Günlük Ev İşleri
              </h2>
              <p className="text-white/80 text-xs sm:text-sm mt-2 max-w-xl leading-relaxed">
                Düzenli küçük adımlar huzurlu bir yuva yaratır. Güne başlarken, gün içinde ve bitişte yapacağınız bu basit rutinlerle evinizin ferahlığını daima koruyun.
              </p>
            </div>
          </div>

          {/* Progress Summary Card (desktop only layout placeholder/reordering) */}
          <div className="hidden lg:flex bg-white rounded-3xl border border-[#e5e0d5] shadow-xs p-5 items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#3d5a45] to-[#f07052] flex items-center justify-center shadow-xs">
                <Star className="w-5 h-5 text-white fill-white/30" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#f07052] uppercase tracking-wider">Bugünkü İlerleme</p>
                <p className="text-base font-bold text-[#2e4033]">
                  {completedCount} / {CHORES.length} Görev Tamamlandı
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-1">
              <div className="w-28 h-2.5 rounded-full bg-[#eaf4eb] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#3d5a45] to-[#f07052] transition-all duration-500"
                  style={{ width: `${(completedCount / CHORES.length) * 100}%` }}
                />
              </div>
              <p className="text-xs text-[#526356] font-bold">
                %{Math.round((completedCount / CHORES.length) * 100)}
              </p>
            </div>
          </div>
        </div>

        {/* Right / Image Column (Desktop only, or styled appropriately for mobile) */}
        <div className="lg:col-span-5 h-48 sm:h-64 lg:h-auto min-h-[220px] relative overflow-hidden rounded-3xl shadow-md border border-[#e5e0d5]/40">
          <img
            src="/cleaning-hero.jpg"
            alt="Ev işleri malzemeleri"
            className="absolute inset-0 w-full h-full object-cover object-center"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          {/* Subtle gradient overlay to match styling */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10 pointer-events-none" />
        </div>

      </div>

      {/* Progress Summary (Mobile only) */}
      <div className="lg:hidden bg-white rounded-3xl border border-[#e5e0d5] shadow-xs p-5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3d5a45] to-[#f07052] flex items-center justify-center shadow-xs">
            <Star className="w-4 h-4 text-white fill-white/30" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#f07052] uppercase tracking-wider">Bugünkü İlerleme</p>
            <p className="text-sm font-bold text-[#2e4033]">
              {completedCount} / {CHORES.length} Görev Tamamlandı
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-1">
          <div className="w-24 h-2 rounded-full bg-[#eaf4eb] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#3d5a45] to-[#f07052] transition-all duration-500"
              style={{ width: `${(completedCount / CHORES.length) * 100}%` }}
            />
          </div>
          <p className="text-xs text-[#526356] font-bold">
            %{Math.round((completedCount / CHORES.length) * 100)}
          </p>
        </div>
      </div>

      {/* Task Pages - Swipeable on mobile */}
      <div
        className="touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="space-y-3">
          {PAGES[currentPage].map((task, idx) => {
            const done = !!checked[task.id];
            return (
              <div
                key={task.id}
                className={`bg-white rounded-3xl border transition-all duration-200 shadow-xs overflow-hidden ${
                  done ? 'border-[#3d5a45]/40 bg-[#f2f7f3]/60' : 'border-[#e5e0d5]'
                }`}
              >
                <div className="flex items-start p-4 sm:p-5 gap-4">
                  {/* Emoji Icon */}
                  <div className={`w-11 h-11 shrink-0 rounded-2xl flex items-center justify-center text-xl shadow-xs ${
                    done ? 'bg-[#3d5a45]' : 'bg-[#eaf4eb]'
                  }`}>
                    {done ? <Check className="w-5 h-5 text-white" /> : <span>{task.icon}</span>}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className={`font-bold text-sm leading-snug ${done ? 'line-through text-[#526356]' : 'text-[#2e4033]'}`}>
                      {task.title}
                    </p>
                    <p className={`text-xs mt-1 leading-relaxed ${done ? 'text-[#99a89b]' : 'text-[#526356]'}`}>
                      {task.description}
                    </p>
                  </div>

                  {/* Check Button */}
                  <button
                    onClick={() => toggleCheck(task.id)}
                    className={`shrink-0 w-9 h-9 rounded-2xl flex items-center justify-center border-2 transition-all duration-200 active:scale-90 cursor-pointer shadow-xs ${
                      done
                        ? 'bg-[#3d5a45] border-[#3d5a45] text-white'
                        : 'bg-white border-[#d8e5da] text-transparent hover:border-[#3d5a45]'
                    }`}
                    title={done ? 'Tamamlandı - Geri al' : 'Tamamla'}
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>

                {/* Done Bar */}
                {done && (
                  <div className="h-1 bg-gradient-to-r from-[#3d5a45] to-[#f07052]" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Page Navigation */}
      <div className="flex items-center justify-center space-x-4 pt-4 pb-0">
        {/* Previous button - desktop only */}
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 0}
          className="hidden lg:flex w-9 h-9 rounded-xl items-center justify-center border border-[#e5e0d5] text-[#526356] hover:border-[#3d5a45] hover:text-[#3d5a45] transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page dots */}
        {PAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i)}
            className={`rounded-full transition-all duration-300 cursor-pointer ${
              i === currentPage
                ? 'w-7 h-3.5 bg-[#3d5a45]'
                : 'w-3.5 h-3.5 bg-[#d8e5da] hover:bg-[#a8c5b0]'
            }`}
            title={`Sayfa ${i + 1}`}
          />
        ))}

        {/* Next button - desktop only */}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === PAGES.length - 1}
          className="hidden lg:flex w-9 h-9 rounded-xl items-center justify-center border border-[#e5e0d5] text-[#526356] hover:border-[#3d5a45] hover:text-[#3d5a45] transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
