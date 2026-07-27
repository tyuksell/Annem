import React from 'react';
import { TabType, UserProfile } from '../types';
import { 
  Sparkles, 
  User, 
  Bell, 
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
    <header className="sticky top-0 z-40 bg-[#fcfaf7]/85 backdrop-blur-xl border-b border-[#e8e3d8]/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#4a6b54] to-[#f07052] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-all duration-200 shrink-0">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white/20" />
            </div>
            <h1 className="font-sans font-semibold text-base sm:text-xl text-[#3d5043] tracking-normal group-hover:text-[#f07052] transition-colors whitespace-nowrap">
              Annem
            </h1>
          </div>
        </div>

        {/* Action Controls - Hierarchical Order: AI Koç -> Notification -> Main CTA */}
        <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
          
          {/* 1. AI Shortcut Pill */}
          <button
            onClick={() => setActiveTab('ai')}
            className={`flex items-center space-x-1.5 px-2.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer active:scale-95 whitespace-nowrap ${
              currentTab === 'ai'
                ? 'bg-[#3d5a45] text-white shadow-md shadow-[#3d5a45]/20'
                : 'bg-[#fff2ee] hover:bg-[#ffe0d8] text-[#f07052] border border-[#ffdbd2]/80 shadow-2xs'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${currentTab === 'ai' ? 'text-white' : 'text-[#f07052]'} animate-pulse`} />
            <span className="whitespace-nowrap">AI Koç</span>
          </button>

          {/* 2. Reminders / Notification Icon Button */}
          <button
            onClick={() => setActiveTab('reminders')}
            className={`p-2 sm:p-2.5 rounded-2xl transition-all duration-200 relative cursor-pointer active:scale-95 shrink-0 ${
              currentTab === 'reminders'
                ? 'bg-[#fff2ee] text-[#f07052] shadow-xs'
                : 'text-[#3d5a45] hover:bg-[#f2f7f3] hover:text-[#2e4033]'
            }`}
            title="Hatırlatıcılar"
          >
            <Bell className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-2 h-2 bg-[#f07052] rounded-full ring-2 ring-white"></span>
          </button>

          {/* 3. Primary CTA: User Profile / Login Button */}
          {userProfile.isLoggedIn ? (
            <button
              onClick={() => {
                if (!userProfile.isProfileCreated) {
                  openSetupModal();
                } else {
                  setActiveTab('profile');
                }
              }}
              className={`flex items-center space-x-2 p-1 sm:py-1.5 sm:px-3 bg-[#f2f7f3] hover:bg-[#e4efe6] rounded-2xl border border-[#d8e5da] transition-all duration-200 cursor-pointer active:scale-95 shrink-0 shadow-2xs ${
                currentTab === 'profile' ? 'border-[#3d5a45] bg-[#e4efe6] ring-2 ring-[#3d5a45]/15' : ''
              }`}
              title={userProfile.name || 'Profilim'}
            >
              <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-xl bg-gradient-to-br from-[#3d5a45] via-[#4a6b54] to-[#f07052] text-white flex items-center justify-center font-extrabold text-xs sm:text-sm shadow-xs shrink-0 border border-white/50 relative">
                {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : <User className="w-4 h-4 text-white" />}
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#40c057] border-2 border-white rounded-full"></span>
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#2e4033] hidden sm:inline pr-1 whitespace-nowrap tracking-tight">
                {userProfile.name || 'Profilim'}
              </span>
            </button>
          ) : (
            <button
              onClick={openAuthModal}
              className="flex items-center space-x-1.5 sm:space-x-2 px-3 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-[#f07052] to-[#e55b3c] hover:from-[#e55b3c] hover:to-[#d44a2b] text-white rounded-2xl text-xs sm:text-sm font-bold shadow-md shadow-[#f07052]/25 hover:shadow-lg hover:shadow-[#f07052]/35 active:scale-95 transition-all duration-200 cursor-pointer shrink-0 whitespace-nowrap"
            >
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
              <span className="tracking-wide whitespace-nowrap">Giriş Yap</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

