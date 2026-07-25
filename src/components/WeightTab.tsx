import React, { useState } from 'react';
import { UserProfile, WeightLog, BodyMeasurement } from '../types';
import { Scale, Plus, TrendingDown, ArrowRight, Award } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from 'recharts';

interface WeightTabProps {
  userProfile: UserProfile;
  weightLogs: WeightLog[];
  measurements?: BodyMeasurement[];
  onAddWeightLog: (weight: number, note?: string) => void;
  onAddMeasurement?: (m: Omit<BodyMeasurement, 'id'>) => void;
}

export const WeightTab: React.FC<WeightTabProps> = ({
  userProfile,
  weightLogs,
  measurements = [],
  onAddWeightLog,
  onAddMeasurement,
}) => {
  const [activeTab, setActiveTab] = useState<'weight' | 'measurements'>('weight');
  const [showWeightForm, setShowWeightForm] = useState(false);
  const [showMeasureForm, setShowMeasureForm] = useState(false);

  // New Weight Form State
  const [newWeight, setNewWeight] = useState<number>(userProfile.currentWeight || 70);
  const [newNote, setNewNote] = useState<string>('');

  // New Measurement Form State
  const [waist, setWaist] = useState<number>(80);
  const [hips, setHips] = useState<number>(100);
  const [chest, setChest] = useState<number>(90);
  const [arms, setArms] = useState<number>(28);
  const [thighs, setThighs] = useState<number>(58);

  const totalLost = (userProfile.startWeight > 0 && userProfile.currentWeight > 0)
    ? Math.max(0, userProfile.startWeight - userProfile.currentWeight).toFixed(1)
    : '0.0';

  const remaining = (userProfile.currentWeight > userProfile.targetWeight)
    ? Math.max(0, userProfile.currentWeight - userProfile.targetWeight).toFixed(1)
    : '0.0';

  const handleWeightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWeight > 0) {
      onAddWeightLog(newWeight, newNote);
      setShowWeightForm(false);
      setNewNote('');
    }
  };

  const handleMeasureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAddMeasurement) {
      const today = new Date().toISOString().split('T')[0];
      onAddMeasurement({
        date: today,
        waist,
        hips,
        chest,
        arms,
        thighs,
      });
      setShowMeasureForm(false);
    }
  };

  const latestM = measurements.length > 0 ? measurements[measurements.length - 1] : null;
  const firstM = measurements.length > 0 ? measurements[0] : null;

  return (
    <div className="space-y-6 pb-12">
      {/* Header Overview Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e5e0d5] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-[#f07052] font-bold text-xs uppercase tracking-wider mb-1">
              <Scale className="w-4 h-4" />
              <span>Kilo & Beden İncelme Takibi</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#2e4033] tracking-tight">Kilo & Vücut Ölçüleri</h2>
            <p className="text-[#526356] text-sm mt-0.5">
              Hedef {userProfile.targetWeight} kg zaferine giden her gramı kaydediyoruz!
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-[#f2f7f3] p-1.5 rounded-2xl border border-[#e5e0d5]">
            <button
              onClick={() => setActiveTab('weight')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'weight'
                  ? 'bg-[#3d5a45] text-white shadow-xs'
                  : 'text-[#3d5a45] hover:bg-[#e2ebd3]'
              }`}
            >
              Kilo Takibi
            </button>
            <button
              onClick={() => setActiveTab('measurements')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'measurements'
                  ? 'bg-[#3d5a45] text-white shadow-xs'
                  : 'text-[#3d5a45] hover:bg-[#e2ebd3]'
              }`}
            >
              Beden Ölçüleri (cm)
            </button>
          </div>
        </div>

        {/* 3 Key Target Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-[#fcfaf7] p-4 rounded-2xl border border-[#e5e0d5]">
            <span className="text-xs text-[#526356] font-bold uppercase block">Başlangıç Kilom</span>
            <span className="text-2xl font-serif font-bold text-[#2e4033]">{userProfile.startWeight} kg</span>
            <span className="text-[11px] text-[#526356] block mt-0.5">Başlangıç Tarihi: {userProfile.startDate}</span>
          </div>

          <div className="bg-[#fff2ee] p-4 rounded-2xl border border-[#ffdbd2]">
            <span className="text-xs text-[#f07052] font-bold uppercase block">Güncel Kilom</span>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-serif font-bold text-[#2e4033]">{userProfile.currentWeight} kg</span>
              <span className="text-xs font-bold text-[#3d5a45]">(-{totalLost} kg verildi)</span>
            </div>
            <span className="text-[11px] text-[#f07052] font-medium block mt-0.5">Son Güncelleme Bugün</span>
          </div>

          <div className="bg-[#eaf4eb] p-4 rounded-2xl border border-[#cbe4cf]">
            <span className="text-xs text-[#3d5a45] font-bold uppercase block">Hedef Kilom</span>
            <span className="text-2xl font-serif font-bold text-[#2e4033]">{userProfile.targetWeight} kg</span>
            <span className="text-[11px] text-[#f07052] font-medium block mt-0.5">Hedefe Kalan: {remaining} kg</span>
          </div>
        </div>
      </div>

      {/* Weight Tab Content */}
      {activeTab === 'weight' && (
        <div className="space-y-6">
          {/* Chart Section */}
          <div className="bg-white p-6 rounded-3xl border border-[#e5e0d5] shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-serif font-bold text-[#2e4033] text-lg">Ağırlık Değişim Grafiği</h3>
                <p className="text-xs text-[#526356]">Zaman içindeki düşüş grafiği</p>
              </div>
              <button
                onClick={() => setShowWeightForm(!showWeightForm)}
                className="bg-[#f07052] hover:bg-[#d95a3d] text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-xs flex items-center space-x-1 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Yeni Tartı Kaydı</span>
              </button>
            </div>

            {/* Add Form */}
            {showWeightForm && (
              <form onSubmit={handleWeightSubmit} className="bg-[#fcfaf7] text-[#2e4033] p-5 rounded-2xl mb-6 space-y-4 border border-[#e5e0d5] shadow-xs">
                <h4 className="font-serif font-bold text-sm text-[#2e4033]">Yeni Tartı Günü Tartımı</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#3d5a45] block mb-1">Ağırlık (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={newWeight}
                      onChange={(e) => setNewWeight(Number(e.target.value))}
                      className="w-full bg-white border border-[#e5e0d5] text-[#2e4033] rounded-xl px-3 py-2 text-sm focus:outline-hidden focus:border-[#f07052] transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#3d5a45] block mb-1">Not / Hislerim (Opsiyonel)</label>
                    <input
                      type="text"
                      placeholder="Örn: Ödem gitti, kendimi çok hafif hissediyorum"
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="w-full bg-white border border-[#e5e0d5] text-[#2e4033] placeholder-[#526356]/50 rounded-xl px-3 py-2 text-sm focus:outline-hidden focus:border-[#f07052] transition-colors"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-[#f07052] hover:bg-[#d95a3d] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors shadow-xs cursor-pointer"
                >
                  Tartımı Kaydet
                </button>
              </form>
            )}

            {/* Recharts Area Chart */}
            <div className="h-64 sm:h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weightLogs}>
                  <defs>
                    <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3d5a45" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#3d5a45" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e0d5" />
                  <XAxis dataKey="date" tickLine={false} stroke="#526356" fontSize={11} />
                  <YAxis domain={['dataMin - 2', 'dataMax + 2']} tickLine={false} stroke="#526356" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#2e4033', borderColor: '#3d5a45', borderRadius: '12px', color: '#fff' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="weight"
                    stroke="#3d5a45"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#weightGrad)"
                    name="Kilo (kg)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* History List */}
          <div className="bg-white p-6 rounded-3xl border border-[#e5e0d5] shadow-xs space-y-3">
            <h3 className="font-serif font-bold text-[#2e4033] text-base mb-2">Geçmiş Tartı Kayıtları</h3>
            {weightLogs.slice().reverse().map((log) => (
              <div key={log.id} className="p-3.5 rounded-xl bg-[#fcfaf7] border border-[#e5e0d5] flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#526356] block">{log.date}</span>
                  {log.note && <span className="text-xs text-[#526356] italic">{log.note}</span>}
                </div>
                <span className="text-base font-serif font-bold text-[#2e4033]">{log.weight} kg</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Body Measurements Tab Content */}
      {activeTab === 'measurements' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-[#e5e0d5] shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-serif font-bold text-[#2e4033] text-lg">Beden İncelme Ölçüleri (cm)</h3>
                <p className="text-xs text-[#526356]">Kilo ile birlikte cm incelmesi takibi</p>
              </div>
              <button
                onClick={() => setShowMeasureForm(!showMeasureForm)}
                className="bg-[#f07052] hover:bg-[#d95a3d] text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors flex items-center space-x-1 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Ölçü Ekle</span>
              </button>
            </div>

            {/* Form */}
            {showMeasureForm && (
              <form onSubmit={handleMeasureSubmit} className="bg-[#fcfaf7] text-[#2e4033] p-5 rounded-2xl mb-6 space-y-4 border border-[#e5e0d5] shadow-xs">
                <h4 className="font-serif font-bold text-sm text-[#2e4033]">Yeni Ölçüm Girişi (cm)</h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#3d5a45] block mb-1">Bel (cm)</label>
                    <input
                      type="number"
                      value={waist}
                      onChange={(e) => setWaist(Number(e.target.value))}
                      className="w-full bg-white border border-[#e5e0d5] text-[#2e4033] rounded-xl px-3 py-2 text-sm focus:outline-hidden focus:border-[#f07052] transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#3d5a45] block mb-1">Basen (cm)</label>
                    <input
                      type="number"
                      value={hips}
                      onChange={(e) => setHips(Number(e.target.value))}
                      className="w-full bg-white border border-[#e5e0d5] text-[#2e4033] rounded-xl px-3 py-2 text-sm focus:outline-hidden focus:border-[#f07052] transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#3d5a45] block mb-1">Göğüs (cm)</label>
                    <input
                      type="number"
                      value={chest}
                      onChange={(e) => setChest(Number(e.target.value))}
                      className="w-full bg-white border border-[#e5e0d5] text-[#2e4033] rounded-xl px-3 py-2 text-sm focus:outline-hidden focus:border-[#f07052] transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#3d5a45] block mb-1">Kol (cm)</label>
                    <input
                      type="number"
                      value={arms}
                      onChange={(e) => setArms(Number(e.target.value))}
                      className="w-full bg-white border border-[#e5e0d5] text-[#2e4033] rounded-xl px-3 py-2 text-sm focus:outline-hidden focus:border-[#f07052] transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#3d5a45] block mb-1">Bacak (cm)</label>
                    <input
                      type="number"
                      value={thighs}
                      onChange={(e) => setThighs(Number(e.target.value))}
                      className="w-full bg-white border border-[#e5e0d5] text-[#2e4033] rounded-xl px-3 py-2 text-sm focus:outline-hidden focus:border-[#f07052] transition-colors"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-[#f07052] hover:bg-[#d95a3d] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors shadow-xs cursor-pointer"
                >
                  Ölçüleri Kaydet
                </button>
              </form>
            )}

            {/* Current Measurements Cards */}
            {latestM && (
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
                <div className="bg-[#fff2ee] p-4 rounded-2xl border border-[#ffdbd2] text-center">
                  <span className="text-xs font-bold text-[#f07052] block">BEL</span>
                  <span className="text-2xl font-serif font-bold text-[#2e4033]">{latestM.waist} cm</span>
                  {firstM && (
                    <span className="text-[11px] font-bold text-[#3d5a45] block mt-1">
                      -{firstM.waist - latestM.waist} cm inceldi
                    </span>
                  )}
                </div>

                <div className="bg-[#fff2ee] p-4 rounded-2xl border border-[#ffdbd2] text-center">
                  <span className="text-xs font-bold text-[#f07052] block">BASEN</span>
                  <span className="text-2xl font-serif font-bold text-[#2e4033]">{latestM.hips} cm</span>
                  {firstM && (
                    <span className="text-[11px] font-bold text-[#3d5a45] block mt-1">
                      -{firstM.hips - latestM.hips} cm inceldi
                    </span>
                  )}
                </div>

                <div className="bg-[#eaf4eb] p-4 rounded-2xl border border-[#cbe4cf] text-center">
                  <span className="text-xs font-bold text-[#3d5a45] block">GÖĞÜS</span>
                  <span className="text-2xl font-serif font-bold text-[#2e4033]">{latestM.chest} cm</span>
                  {firstM && (
                    <span className="text-[11px] font-bold text-[#3d5a45] block mt-1">
                      -{firstM.chest - latestM.chest} cm
                    </span>
                  )}
                </div>

                <div className="bg-[#eaf4eb] p-4 rounded-2xl border border-[#cbe4cf] text-center">
                  <span className="text-xs font-bold text-[#3d5a45] block">KOL</span>
                  <span className="text-2xl font-serif font-bold text-[#2e4033]">{latestM.arms} cm</span>
                  {firstM && (
                    <span className="text-[11px] font-bold text-[#3d5a45] block mt-1">
                      -{firstM.arms - latestM.arms} cm
                    </span>
                  )}
                </div>

                <div className="bg-[#eaf4eb] p-4 rounded-2xl border border-[#cbe4cf] text-center">
                  <span className="text-xs font-bold text-[#3d5a45] block">BACAK</span>
                  <span className="text-2xl font-serif font-bold text-[#2e4033]">{latestM.thighs} cm</span>
                  {firstM && (
                    <span className="text-[11px] font-bold text-[#3d5a45] block mt-1">
                      -{firstM.thighs - latestM.thighs} cm
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Measurement Chart */}
            <div className="h-64 sm:h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={measurements}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e0d5" />
                  <XAxis dataKey="date" stroke="#526356" fontSize={11} />
                  <YAxis stroke="#526356" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#2e4033', borderRadius: '12px', color: '#fff' }} />
                  <Line type="monotone" dataKey="waist" stroke="#f07052" name="Bel (cm)" strokeWidth={2} />
                  <Line type="monotone" dataKey="hips" stroke="#3d5a45" name="Basen (cm)" strokeWidth={2} />
                  <Line type="monotone" dataKey="chest" stroke="#0284c7" name="Göğüs (cm)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
