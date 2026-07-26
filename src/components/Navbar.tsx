import React from 'react';
import { TabType } from '../types';
import { 
  Home, 
  Clock, 
  Utensils, 
  Droplet, 
  Scale, 
  Activity, 
  CheckSquare, 
  Award, 
  Calendar as CalendarIcon, 
  BookOpen, 
  FileText, 
  PieChart, 
  Sparkles,
  Bell,
  Heart,
  MoreVertical
} from 'lucide-react';

interface NavbarProps {
  currentTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setActiveTab, onOpenSidebar }) => {
  const mainNavItems = [
    { id: 'home' as TabType, label: 'Ana Sayfa', icon: Home },
    { id: 'plan' as TabType, label: 'Günlük Plan', icon: Clock },
    { id: 'husu' as TabType, label: 'Huşu & Zikir', icon: Heart },
    { id: 'water' as TabType, label: 'Su Takibi', icon: Droplet },
    { id: 'weight' as TabType, label: 'Kilo & Ölçü', icon: Scale },
    { id: 'exercise' as TabType, label: 'Egzersiz', icon: Activity },
    { id: 'habits' as TabType, label: 'Alışkanlık', icon: CheckSquare },
    { id: 'nutrition' as TabType, label: 'Beslenme', icon: Utensils },
    { id: 'recipes' as TabType, label: 'Tarifler', icon: BookOpen },
    { id: 'calendar' as TabType, label: 'Takvim', icon: CalendarIcon },
    { id: 'notes' as TabType, label: 'Not Defteri', icon: FileText },
    { id: 'stats' as TabType, label: 'İstatistik', icon: PieChart },
  ];

  // Mobile Bottom Navigation Key Items
  const mobileNavItems = [
    { id: 'home' as TabType | 'menu', label: 'Ana Sayfa', icon: Home },
    { id: 'plan' as TabType | 'menu', label: 'Plan', icon: Clock },
    { id: 'husu' as TabType | 'menu', label: 'Huşu', icon: Heart },
    { id: 'water' as TabType | 'menu', label: 'Su', icon: Droplet },
    { id: 'weight' as TabType | 'menu', label: 'Kilo', icon: Scale },
    { id: 'ai' as TabType | 'menu', label: 'AI Koç', icon: Sparkles },
    ...(onOpenSidebar ? [{ id: 'menu' as const, label: 'Tüm Menü', icon: MoreVertical }] : []),
  ];

  return (
    <>
      {/* Desktop Navigation Sub-Header Bar */}
      <nav className="hidden lg:block bg-[#3d5a45] text-white border-b border-[#2e4535] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center space-x-1 py-2 text-xs font-medium">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#3d5a45] font-bold shadow-xs scale-[1.02]'
                      : 'hover:bg-[#2e4535] hover:text-white text-[#d8e5db]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#f07052]' : 'text-[#a3c2ac]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#fcfaf7]/95 backdrop-blur-lg border-t border-[#e5e0d5] px-1 py-1.5 shadow-lg">
        <div className="flex items-center justify-around">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const isMenu = item.id === 'menu';
            const isActive = !isMenu && currentTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (isMenu) {
                    onOpenSidebar?.();
                  } else {
                    setActiveTab(item.id as TabType);
                  }
                }}
                className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? 'text-[#3d5a45] font-bold scale-105'
                    : 'text-[#6b7c70] hover:text-[#3d5a45]'
                }`}
              >
                <div className={`p-1.5 rounded-xl ${isActive ? 'bg-[#3d5a45] text-white shadow-xs' : ''}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] mt-1 leading-none font-medium truncate max-w-[56px] text-center">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
