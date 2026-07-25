import React from 'react';
import { TabType, UserProfile } from '../types';
import { 
  HeartHandshake, 
  Sparkles, 
  User, 
  Bell, 
  Calendar, 
  Award,
  Lock,
  LogOut,
  Heart
} from 'lucide-react';

interface HeaderProps {
  currentTab: TabType;
  setActiveTab: (tab: TabType) => void;
  userProfile: UserProfile;
  daysRemaining: number;
  openAuthModal: () => void;
  openSetupModal: () => void;
  isPwaInstalled: boolean;
  installPwa: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setActiveTab,
  userProfile,
  daysRemaining,
  openAuthModal,
  openSetupModal,
  isPwaInstalled,
  installPwa,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#fcfaf7]/95 backdrop-blur-md border-b border-[#e5e0d5] shadow-2xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#3d5a45] to-[#f07052] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 text-white fill-white/20" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-serif font-bold text-base sm:text-lg text-[#2e4033] tracking-tight leading-none group-hover:text-[#f07052] transition-colors">
                  ANNEM
                </h1>
                <span className="hidden md:inline-block bg-[#fff2ee] text-[#f07052] border border-[#ffdbd2] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Hedef: {userProfile.targetWeight} kg
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#526356] font-medium mt-0.5">
                {daysRemaining > 0 ? `Dönüşüme ${daysRemaining} Gün Kaldı` : 'Hedefe Ulaşıldı! 🎉'}
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* AI Shortcut Badge */}
          <button
            onClick={() => setActiveTab('ai')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
              currentTab === 'ai'
                ? 'bg-[#3d5a45] text-white shadow-xs'
                : 'bg-[#fff2ee] text-[#f07052] hover:bg-[#ffe5de] border border-[#ffdbd2]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#f07052] animate-pulse" />
            <span className="hidden sm:inline">AI Koç</span>
          </button>

          {/* Reminders Button */}
          <button
            onClick={() => setActiveTab('reminders')}
            className={`p-2 rounded-xl transition-colors relative cursor-pointer ${
              currentTab === 'reminders' ? 'bg-[#fff2ee] text-[#f07052]' : 'text-[#3d5a45] hover:bg-[#f2f7f3]'
            }`}
            title="Hatırlatıcılar"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#f07052] rounded-full ring-2 ring-[#fcfaf7]"></span>
          </button>

          {/* User Profile Button */}
          <button
            onClick={() => {
              if (!userProfile.isLoggedIn) {
                openAuthModal();
              } else if (!userProfile.isProfileCreated) {
                openSetupModal();
              } else {
                setActiveTab('profile');
              }
            }}
            className="flex items-center space-x-2 pl-2 pr-3 py-1 bg-white hover:bg-[#f2f7f3] rounded-xl border border-[#e5e0d5] transition-colors cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-[#3d5a45] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
              {userProfile.isLoggedIn && userProfile.name ? userProfile.name.charAt(0).toUpperCase() : <User className="w-4 h-4 text-white" />}
            </div>
            <div className="text-left hidden lg:block">
              <p className="text-xs font-bold text-[#2e4033] leading-tight">
                {userProfile.isLoggedIn ? (userProfile.name || 'Profilim') : 'Giriş Yap'}
              </p>
              <p className="text-[10px] text-[#526356] font-medium">
                {userProfile.isLoggedIn ? 'Profilim' : 'Oturum Aç'}
              </p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
