import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { User, Sparkles, Scale, Baby, ShieldAlert, Heart, ArrowRight, X } from 'lucide-react';
import { motion } from 'motion/react';

interface ProfileSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveProfile: (profile: UserProfile) => void;
  existingProfile?: UserProfile;
}

export const ProfileSetupModal: React.FC<ProfileSetupModalProps> = ({
  isOpen,
  onClose,
  onSaveProfile,
  existingProfile,
}) => {
  const isCreated = Boolean(existingProfile?.isProfileCreated && existingProfile?.name && existingProfile.name !== 'Filiz');

  const [name, setName] = useState(isCreated ? existingProfile?.name || '' : '');
  const [email, setEmail] = useState(isCreated ? existingProfile?.email || '' : '');
  const [height, setHeight] = useState<number | string>(
    isCreated && existingProfile?.height && existingProfile.height > 0 ? existingProfile.height : ''
  );
  const [startWeight, setStartWeight] = useState<number | string>(
    isCreated && existingProfile?.startWeight && existingProfile.startWeight > 0 ? existingProfile.startWeight : ''
  );
  const [currentWeight, setCurrentWeight] = useState<number | string>(
    isCreated && existingProfile?.currentWeight && existingProfile.currentWeight > 0 ? existingProfile.currentWeight : ''
  );
  const [targetWeight, setTargetWeight] = useState<number | string>(
    isCreated && existingProfile?.targetWeight && existingProfile.targetWeight > 0 ? existingProfile.targetWeight : ''
  );
  const [targetDays, setTargetDays] = useState<number | string>(
    isCreated && existingProfile?.targetDays && existingProfile.targetDays > 0 ? existingProfile.targetDays : ''
  );
  const [isNursing, setIsNursing] = useState(existingProfile?.isNursing || false);
  const [hasKneeIssue, setHasKneeIssue] = useState(existingProfile?.hasKneeIssue || false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
    }
  }, [isOpen]);

  // Auto-calculated calorie recommendation
  const [dailyCalorieTarget, setDailyCalorieTarget] = useState<number | string>(
    isCreated && existingProfile?.dailyCalorieTarget && existingProfile.dailyCalorieTarget > 0
      ? existingProfile.dailyCalorieTarget
      : ''
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (step === 1) {
      setStep(2);
      return;
    }

    if (step === 2) {
      setStep(3);
      return;
    }

    const numStart = Number(startWeight) || 75;
    const numCurrent = Number(currentWeight) || numStart;
    const numTarget = Number(targetWeight) || 68;
    const numDays = Number(targetDays) || 60;
    const numHeight = Number(height) || 165;
    const numCalorie = Number(dailyCalorieTarget) || (isNursing ? 1950 : 1700);

    const newProfile: UserProfile = {
      name: name.trim(),
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '')}@annem.com`,
      isLoggedIn: true,
      isProfileCreated: true,
      height: numHeight,
      startWeight: numStart,
      currentWeight: numCurrent,
      targetWeight: numTarget,
      dailyCalorieTarget: numCalorie,
      activityLevel: 'orta',
      isNursing,
      hasKneeIssue,
      startDate: new Date().toISOString().split('T')[0],
      targetDays: numDays,
    };

    onSaveProfile(newProfile);
    onClose();
  };

  const handleBack = () => setStep((prev) => Math.max(1, prev - 1));

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2 sm:p-4 pb-0 sm:pb-4 bg-[#5a5a40]/60 backdrop-blur-xs overflow-y-auto cursor-pointer"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-white rounded-3xl max-w-[min(100%,32rem)] w-full shadow-2xl p-4 sm:p-8 relative space-y-5 border border-[#e5e0d5] my-0 sm:my-8 cursor-default max-h-[calc(100vh-1rem)] overflow-y-auto sm:overflow-visible"
      >
        {/* Close Button if user closes voluntary */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#f4f1ea] text-[#5a5a40] hover:text-[#b56b45] transition-colors"
          title="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#5a5a40] text-[#fcfaf7] flex items-center justify-center mx-auto shadow-md">
            <User className="w-7 h-7 text-[#b56b45]" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#5a5a40]">
            Seni Tanıyalım 🌸
          </h2>
          <p className="text-xs sm:text-sm text-[#4a4a40]/70 max-w-md mx-auto">
            Sana ve ihtiyaçlarına özel rehberlik sunabilmemiz için birkaç tatlı detay paylaşır mısın?
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.25em] text-[#5a5a40]/70 font-semibold">
          <span className={`${step === 1 ? 'text-[#b56b45]' : 'text-[#5a5a40]/50'}`}>1. Adım</span>
          <span className="text-[#5a5a40]/40">•</span>
          <span className={`${step === 2 ? 'text-[#b56b45]' : 'text-[#5a5a40]/50'}`}>2. Adım</span>
          <span className="text-[#5a5a40]/40">•</span>
          <span className={`${step === 3 ? 'text-[#b56b45]' : 'text-[#5a5a40]/50'}`}>3. Adım</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#5a5a40] block mb-1">
                    Adın <span className="text-[#b56b45]">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Örn: Ayşe"
                    className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#e5e0d5] text-[#5a5a40] rounded-2xl text-xs font-semibold focus:outline-hidden focus:border-[#b56b45]"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#5a5a40] block mb-1">
                    E-posta Adresin
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Örn: ayse@example.com"
                    className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#e5e0d5] text-[#5a5a40] rounded-2xl text-xs font-semibold focus:outline-hidden focus:border-[#b56b45]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#5a5a40] block mb-1">Boy (cm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="165"
                    className="w-full px-3 py-2 bg-[#fcfaf7] border border-[#e5e0d5] text-[#5a5a40] rounded-xl text-xs font-semibold focus:outline-hidden focus:border-[#b56b45]"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#5a5a40] block mb-1">Başlangıç (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={startWeight}
                    onChange={(e) => {
                      setStartWeight(e.target.value);
                      if (!currentWeight || Number(currentWeight) === Number(startWeight)) {
                        setCurrentWeight(e.target.value);
                      }
                    }}
                    placeholder="75.0"
                    className="w-full px-3 py-2 bg-[#fcfaf7] border border-[#e5e0d5] text-[#5a5a40] rounded-xl text-xs font-semibold focus:outline-hidden focus:border-[#b56b45]"
                    required
                  />
                </div>
              </div>
            </div>
          ) : step === 2 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#5a5a40] block mb-1">Güncel Kilo (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={currentWeight}
                    onChange={(e) => setCurrentWeight(e.target.value)}
                    placeholder="75.0"
                    className="w-full px-3 py-2 bg-[#fcfaf7] border border-[#e5e0d5] text-[#5a5a40] rounded-xl text-xs font-semibold focus:outline-hidden focus:border-[#b56b45]"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#5a5a40] block mb-1">Hedef Kilo (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={targetWeight}
                    onChange={(e) => setTargetWeight(e.target.value)}
                    placeholder="68.0"
                    className="w-full px-3 py-2 bg-[#fcfaf7] border border-[#e5e0d5] text-[#5a5a40] rounded-xl text-xs font-semibold focus:outline-hidden focus:border-[#b56b45]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#5a5a40] block mb-1">Hedef Süre (Gün)</label>
                  <input
                    type="number"
                    value={targetDays}
                    onChange={(e) => setTargetDays(e.target.value)}
                    placeholder="Örn: 60"
                    className="w-full px-3 py-2 bg-[#fcfaf7] border border-[#e5e0d5] text-[#5a5a40] rounded-xl text-xs font-semibold focus:outline-hidden focus:border-[#b56b45]"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#5a5a40] block mb-1">
                    Günlük Kalori Hedefi (kcal)
                  </label>
                  <input
                    type="number"
                    value={dailyCalorieTarget}
                    onChange={(e) => setDailyCalorieTarget(e.target.value)}
                    placeholder="Örn: 1800"
                    className="w-full px-4 py-2.5 bg-[#fcfaf7] border border-[#e5e0d5] text-[#5a5a40] rounded-2xl text-xs font-semibold focus:outline-hidden focus:border-[#b56b45]"
                    required
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-[#5a5a40] uppercase tracking-wider">Özel Durumlar</h3>

              <div className="p-3.5 rounded-2xl border border-[#e5e0d5] bg-[#fcfaf7] flex items-center justify-between min-w-0">
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="p-2 bg-[#f4f1ea] text-[#b56b45] rounded-xl flex-shrink-0">
                    <Baby className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs text-[#5a5a40]">Emziren Anne Modu</h4>
                    <p className="text-[11px] text-[#4a4a40]/70">Süt artırıcı beslenme tavsiyelerini aktif eder.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const nextNursing = !isNursing;
                    setIsNursing(nextNursing);
                    setDailyCalorieTarget(nextNursing ? 1950 : 1700);
                  }}
                  className={`w-11 h-6 rounded-full p-1 transition-colors ${
                    isNursing ? 'bg-[#b56b45]' : 'bg-[#dcd7cc]'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    isNursing ? 'translate-x-5' : 'translate-x-0'
                  }`}></div>
                </button>
              </div>

              <div className="p-3.5 rounded-2xl border border-[#e5e0d5] bg-[#fcfaf7] flex items-center justify-between min-w-0">
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="p-2 bg-[#f4f1ea] text-[#8a9a5b] rounded-xl flex-shrink-0">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs text-[#5a5a40]">Diz Problemi / Eklem Hassasiyeti</h4>
                    <p className="text-[11px] text-[#4a4a40]/70">Zıplamasız ve sandalye destekli güvenli hareketler önerir.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setHasKneeIssue(!hasKneeIssue)}
                  className={`w-11 h-6 rounded-full p-1 transition-colors ${
                    hasKneeIssue ? 'bg-[#8a9a5b]' : 'bg-[#dcd7cc]'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    hasKneeIssue ? 'translate-x-5' : 'translate-x-0'
                  }`}></div>
                </button>
              </div>
            </div>
          )}

          <div className="sticky bottom-0 z-30 bg-white/95 backdrop-blur-sm border-t border-[#e5e0d5] px-4 py-3 sm:px-0 sm:py-2 -mx-4 sm:mx-0 sm:bg-transparent sm:border-t-0">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="w-full sm:w-auto px-4 py-3.5 bg-[#f4f1ea] text-[#5a5a40] font-bold text-xs rounded-2xl transition-colors hover:bg-[#e9e5dd]"
                >
                  Geri
                </button>
              ) : null}
              <button
                type="submit"
                className="w-full sm:w-auto flex-1 py-3.5 bg-[#b56b45] hover:bg-[#a05a37] text-white font-bold text-xs rounded-2xl transition-colors shadow-xs flex items-center justify-center space-x-2"
              >
                <span>{step === 3 ? 'Profilimi Kaydet & Başla' : 'Devam Et'}</span>
                {step < 3 ? <ArrowRight className="w-4 h-4" /> : null}
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
