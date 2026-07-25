import React, { useState } from 'react';
import { UserProfile } from '../types';
import { User, Scale, Heart, ShieldAlert, Baby, Save, Check } from 'lucide-react';

interface ProfileTabProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  userProfile,
  onUpdateProfile,
}) => {
  const [name, setName] = useState(userProfile.name || '');
  const [email, setEmail] = useState(userProfile.email || '');
  const [height, setHeight] = useState(userProfile.height || 165);
  const [currentWeight, setCurrentWeight] = useState(userProfile.currentWeight || 70);
  const [targetWeight, setTargetWeight] = useState(userProfile.targetWeight || 58);
  const [targetDays, setTargetDays] = useState(userProfile.targetDays || 60);
  const [dailyCalorieTarget, setDailyCalorieTarget] = useState(userProfile.dailyCalorieTarget || 1800);
  const [isNursing, setIsNursing] = useState(userProfile.isNursing ?? true);
  const [hasKneeIssue, setHasKneeIssue] = useState(userProfile.hasKneeIssue ?? false);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name,
      email,
      height,
      currentWeight,
      targetWeight,
      targetDays,
      dailyCalorieTarget,
      isNursing,
      hasKneeIssue,
      isProfileCreated: true,
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 3000);
  };

  return (
    <div className="space-y-6 pb-12 max-w-3xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e5e0d5] shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-[#f07052] font-bold text-xs uppercase tracking-wider mb-1">
            <User className="w-4 h-4" />
            <span>Kişisel Ayarlar & Bilgiler</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#2e4033] tracking-tight">Kişisel Profilim</h2>
          <p className="text-[#526356] text-sm mt-0.5">
            Metabolizma ve kalori hesaplamaları senin bu girdiğin bilgilere göre yapılır.
          </p>
        </div>
      </div>

      {/* Main Profile Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e5e0d5] shadow-xs space-y-6">
        
        {savedSuccess && (
          <div className="p-4 bg-[#eaf4eb] border border-[#cbe4cf] text-[#2e4033] rounded-2xl text-xs font-bold flex items-center space-x-2">
            <Check className="w-4 h-4 text-[#3d5a45]" />
            <span>Profil bilgilerin başarıyla güncellendi! 🎉</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-[#3d5a45] block mb-1">Adın</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#fcfaf7] border border-[#e5e0d5] text-[#2e4033] rounded-2xl px-4 py-2.5 text-xs font-semibold focus:outline-hidden focus:border-[#f07052]"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#3d5a45] block mb-1">E-posta Adresi</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#fcfaf7] border border-[#e5e0d5] text-[#2e4033] rounded-2xl px-4 py-2.5 text-xs font-semibold focus:outline-hidden focus:border-[#f07052]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-bold text-[#3d5a45] block mb-1">Boy (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full bg-[#fcfaf7] border border-[#e5e0d5] text-[#2e4033] rounded-2xl px-4 py-2.5 text-xs font-semibold focus:outline-hidden focus:border-[#f07052]"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#3d5a45] block mb-1">Güncel Kilo (kg)</label>
            <input
              type="number"
              step="0.1"
              value={currentWeight}
              onChange={(e) => setCurrentWeight(Number(e.target.value))}
              className="w-full bg-[#fcfaf7] border border-[#e5e0d5] text-[#2e4033] rounded-2xl px-4 py-2.5 text-xs font-semibold focus:outline-hidden focus:border-[#f07052]"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#3d5a45] block mb-1">Hedef Kilo (kg)</label>
            <input
              type="number"
              step="0.1"
              value={targetWeight}
              onChange={(e) => setTargetWeight(Number(e.target.value))}
              className="w-full bg-[#fcfaf7] border border-[#e5e0d5] text-[#2e4033] rounded-2xl px-4 py-2.5 text-xs font-semibold focus:outline-hidden focus:border-[#f07052]"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#3d5a45] block mb-1">Hedef Süre (Gün)</label>
            <input
              type="number"
              value={targetDays}
              onChange={(e) => setTargetDays(Number(e.target.value))}
              className="w-full bg-[#fcfaf7] border border-[#e5e0d5] text-[#2e4033] rounded-2xl px-4 py-2.5 text-xs font-semibold focus:outline-hidden focus:border-[#f07052]"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-[#3d5a45] block mb-1">Günlük Kalori Hedefi (kcal)</label>
          <input
            type="number"
            value={dailyCalorieTarget}
            onChange={(e) => setDailyCalorieTarget(Number(e.target.value))}
            className="w-full bg-[#fcfaf7] border border-[#e5e0d5] text-[#2e4033] rounded-2xl px-4 py-2.5 text-xs font-semibold focus:outline-hidden focus:border-[#f07052]"
            required
          />
        </div>

        {/* Switches */}
        <div className="border-t border-[#e5e0d5] pt-6 space-y-4">
          <h3 className="font-serif font-bold text-[#2e4033] text-base">Özel Durumlar & Hassasiyetler</h3>

          {/* Nursing Switch */}
          <div className="flex items-center justify-between p-4 bg-[#fff2ee] rounded-2xl border border-[#ffdbd2]">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-[#f07052] text-white rounded-xl shadow-xs">
                <Baby className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-[#2e4033]">Emziriyor muyum?</h4>
                <p className="text-xs text-[#526356]">Menü ve su hedeflerine süt artırıcı destekler eklenir.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsNursing(!isNursing)}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                isNursing ? 'bg-[#f07052]' : 'bg-[#d0dad2]'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                  isNursing ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>

          {/* Knee Issue Switch */}
          <div className="flex items-center justify-between p-4 bg-[#eaf4eb] rounded-2xl border border-[#cbe4cf]">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-[#3d5a45] text-white rounded-xl shadow-xs">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-[#2e4033]">Diz Problemim var mı?</h4>
                <p className="text-xs text-[#526356]">Diz kapaklarını koruyan eklemsiz egzersizler filtreler.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setHasKneeIssue(!hasKneeIssue)}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                hasKneeIssue ? 'bg-[#3d5a45]' : 'bg-[#d0dad2]'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                  hasKneeIssue ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 bg-[#f07052] hover:bg-[#d95a3d] text-white font-bold text-xs rounded-2xl transition-all shadow-xs flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Profilimi Güncelle</span>
          </button>
        </div>
      </form>
    </div>
  );
};
