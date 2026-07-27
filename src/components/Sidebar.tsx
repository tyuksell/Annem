import React from 'react';
import { TabType, UserProfile } from '../types';
import { 
  Home, 
  Clock, 
  Utensils, 
  Droplet, 
  Scale, 
  Activity, 
  CheckSquare, 
  Calendar as CalendarIcon, 
  BookOpen, 
  FileText, 
  PieChart, 
  Sparkles,
  Bell,
  User,
  X,
  Heart,
  ChevronRight,
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentTab: TabType;
  setActiveTab: (tab: TabType) => void;
  userProfile: UserProfile;
  daysRemaining: number;
  openAuthModal: () => void;
  openSetupModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  currentTab,
  setActiveTab,
  userProfile,
  daysRemaining,
  openAuthModal,
  openSetupModal,
}) => {
  const menuCategories = [
    {
      title: 'Ana Sayfa & Günlük Takip',
      items: [
        { id: 'home' as TabType, label: 'Ana Sayfa', icon: Home, desc: 'Günlük genel bakış ve özet' },
        { id: 'plan' as TabType, label: 'Günlük Plan', icon: Clock, desc: 'Saatlik yaşam akışı ve rutinler' },
        { id: 'husu' as TabType, label: 'Huşu & Zikir', icon: Heart, desc: 'Günlük dualar ve zikirmatik takibi' },
        { id: 'water' as TabType, label: 'Su Takibi', icon: Droplet, desc: 'Günlük sıvı tüketim hedefi' },
        { id: 'weight' as TabType, label: 'Kilo & Ölçü', icon: Scale, desc: 'Kilo grafiği ve beden ölçüleri' },
        { id: 'exercise' as TabType, label: 'Egzersiz', icon: Activity, desc: 'Lohusa dostu hareket planı' },
        { id: 'habits' as TabType, label: 'Alışkanlık', icon: CheckSquare, desc: 'Günlük alışkanlık çetelesi' },
      ],
    },
    {
      title: 'Beslenme & Mutfak',
      items: [
        { id: 'nutrition' as TabType, label: 'Beslenme Rehberi', icon: Utensils, desc: 'Süt artıran dengeli menüler' },
        { id: 'recipes' as TabType, label: 'Tarifler', icon: BookOpen, desc: 'Sağlıklı & lezzetli tarifler' },
      ],
    },
    {
      title: 'Planlama & Notlar',
      items: [
        { id: 'calendar' as TabType, label: 'Takvim', icon: CalendarIcon, desc: 'Aylık gelişim ve geçmiş kayıtlar' },
        { id: 'notes' as TabType, label: 'Not Defteri', icon: FileText, desc: 'Özel notlar ve yapılacaklar' },
        { id: 'stats' as TabType, label: 'İstatistik', icon: PieChart, desc: 'Detaylı analiz ve grafikler' },
      ],
    },
    {
      title: 'Asistan & Ayarlar',
      items: [
        { id: 'ai' as TabType, label: 'AI Anne Koçu', icon: Sparkles, desc: 'Yapay zeka sorularınızı yanıtlasın' },
        { id: 'reminders' as TabType, label: 'Hatırlatıcılar', icon: Bell, desc: 'Su ve ilaç bildirimleri' },
        { id: 'profile' as TabType, label: 'Profilim', icon: User, desc: 'Kişisel bilgiler ve hedefler' },
      ],
    },
  ];

  const handleSelectTab = (tab: TabType) => {
    setActiveTab(tab);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#2e4033]/60 backdrop-blur-xs cursor-pointer"
          />

          {/* Drawer Sidebar */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative w-80 max-w-[85vw] bg-[#fcfaf7] h-full shadow-2xl border-r border-[#e5e0d5] z-10 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 border-b border-[#e5e0d5] bg-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#3d5a45] to-[#f07052] flex items-center justify-center text-white shadow-xs">
                  <Heart className="w-5 h-5 text-white fill-white/20" />
                </div>
                <div>
                  <h2 className="font-sans font-semibold text-lg text-[#3d5043] tracking-normal leading-none">Annem</h2>
                  <p className="text-xs text-[#526356] font-medium mt-0.5">Tüm Sekmeler & Menü</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-[#526356] hover:text-[#2e4033] hover:bg-[#f2f7f3] transition-colors cursor-pointer"
                title="Kapat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Quick Overview Card */}
            <div className="p-4 bg-[#f2f7f3] border-b border-[#e5e0d5]">
              <div 
                onClick={() => {
                  if (!userProfile.isLoggedIn) {
                    openAuthModal();
                  } else if (!userProfile.isProfileCreated) {
                    openSetupModal();
                  } else {
                    handleSelectTab('profile');
                  }
                }}
                className="bg-white p-3 rounded-2xl border border-[#e5e0d5] flex items-center justify-between cursor-pointer hover:border-[#f07052] transition-colors shadow-2xs"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-[#3d5a45] text-white flex items-center justify-center font-bold text-sm shadow-2xs">
                    {userProfile.isLoggedIn && userProfile.name ? userProfile.name.charAt(0).toUpperCase() : <User className="w-5 h-5 text-white" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#2e4033]">
                      {userProfile.isLoggedIn ? (userProfile.name || 'Profilim') : 'Giriş Yap'}
                    </p>
                    <p className="text-[10px] text-[#526356]">
                      {daysRemaining > 0 ? `Dönüşüme ${daysRemaining} Gün Kaldı` : 'Hedefe Ulaşıldı! 🎉'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-1 text-[#f07052] text-xs font-bold bg-[#fff2ee] px-2.5 py-1 rounded-lg border border-[#ffdbd2]">
                  <Target className="w-3.5 h-3.5" />
                  <span>{userProfile.targetWeight} kg</span>
                </div>
              </div>
            </div>

            {/* Menu Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
              {menuCategories.map((category, catIdx) => (
                <div key={catIdx} className="space-y-2">
                  <h3 className="text-[11px] font-bold text-[#f07052] uppercase tracking-wider px-2">
                    {category.title}
                  </h3>
                  <div className="space-y-1">
                    {category.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = currentTab === item.id;

                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSelectTab(item.id)}
                          className={`w-full text-left p-3 rounded-2xl transition-all flex items-center justify-between group cursor-pointer ${
                            isActive
                              ? 'bg-[#3d5a45] text-white shadow-md font-bold'
                              : 'bg-white hover:bg-[#eaf4eb] text-[#2e4033] border border-[#e5e0d5]'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`p-2 rounded-xl transition-colors ${
                                isActive
                                  ? 'bg-white/20 text-white'
                                  : 'bg-[#f2f7f3] text-[#3d5a45] group-hover:bg-[#3d5a45] group-hover:text-white'
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className={`text-xs ${isActive ? 'font-bold text-white' : 'font-semibold text-[#2e4033]'}`}>
                                {item.label}
                              </p>
                              <p className={`text-[10px] ${isActive ? 'text-white/80' : 'text-[#526356]'}`}>
                                {item.desc}
                              </p>
                            </div>
                          </div>

                          <ChevronRight
                            className={`w-4 h-4 transition-transform ${
                              isActive ? 'text-white translate-x-0.5' : 'text-[#526356]/50 group-hover:text-[#3d5a45]'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#e5e0d5] bg-white text-center">
              <p className="text-[10px] text-[#526356] font-medium">
                Süt dostu, sağlıklı & mutlu bir anne yaşam rehberi
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
