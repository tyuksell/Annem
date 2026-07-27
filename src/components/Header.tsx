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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-3">
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#3d5a45] via-[#4a6b54] to-[#f07052] flex items-center justify-center text-white shadow-md shadow-[#3d5a45]/15 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-[#f07052]/20 transition-all duration-300">
              <Heart className="w-5 h-5 text-white fill-white/20" />
            </div>
            <h1 className="font-sans font-extrabold text-xl sm:text-2xl text-[#2e4033] tracking-tight group-hover:text-[#f07052] transition-colors">
              Annem
            </h1>
          </div>
        </div>

        {/* Action Controls - Hierarchical Order: AI Koç -> Notification -> Main CTA */}
        <div className="flex items-center space-x-2 sm:space-x-3.5">
          
          {/* 1. AI Shortcut Ghost Pill */}
          <button
            onClick={() => setActiveTab('ai')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 ${
              currentTab === 'ai'
                ? 'bg-[#3d5a45] text-white shadow-md shadow-[#3d5a45]/20'
                : 'text-[#f07052] hover:bg-[#fff2ee]/80 hover:shadow-xs'
            }`}
          >
            <Sparkles className={`w-4 h-4 ${currentTab === 'ai' ? 'text-white' : 'text-[#f07052]'} animate-pulse`} />
            <span className="hidden sm:inline">AI Koç</span>
          </button>

          {/* 2. Reminders / Notification Icon Button */}
          <button
            onClick={() => setActiveTab('reminders')}
            className={`p-2.5 rounded-2xl transition-all duration-200 relative cursor-pointer active:scale-95 ${
              currentTab === 'reminders'
                ? 'bg-[#fff2ee] text-[#f07052] shadow-xs'
                : 'text-[#3d5a45] hover:bg-[#f2f7f3] hover:text-[#2e4033]'
            }`}
            title="Hatırlatıcılar"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#f07052] rounded-full ring-2 ring-white"></span>
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
              className={`flex items-center space-x-3 px-3 py-1.5 bg-white hover:bg-[#f2f7f3] rounded-2xl border border-[#e5e0d5] hover:border-[#3d5a45]/30 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer active:scale-95 ${
                currentTab === 'profile' ? 'border-[#3d5a45] bg-[#f2f7f3] ring-2 ring-[#3d5a45]/10' : ''
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#3d5a45] to-[#4a6b54] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : <User className="w-4 h-4 text-white" />}
              </div>
              <span className="text-xs font-bold text-[#2e4033] hidden sm:inline tracking-tight">
                {userProfile.name || 'Profilim'}
              </span>
            </button>
          ) : (
            <button
              onClick={openAuthModal}
              className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-[#f07052] to-[#e55b3c] hover:from-[#e55b3c] hover:to-[#d44a2b] text-white rounded-2xl text-xs sm:text-sm font-bold shadow-md shadow-[#f07052]/25 hover:shadow-lg hover:shadow-[#f07052]/35 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <User className="w-4 h-4 text-white" />
              <span className="tracking-wide">Giriş Yap</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
