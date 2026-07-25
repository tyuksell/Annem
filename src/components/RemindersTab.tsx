import React, { useState } from 'react';
import { ReminderSetting } from '../types';
import { Bell, Clock, Droplet, Pill, Activity, Scale, Ruler, Check, Plus, Trash2, X, BellOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RemindersTabProps {
  reminders: ReminderSetting[];
  toggleReminder: (id: string) => void;
  addReminder?: (title: string, time: string, type: ReminderSetting['type'], daysText: string) => void;
  deleteReminder?: (id: string) => void;
}

export const RemindersTab: React.FC<RemindersTabProps> = ({
  reminders,
  toggleReminder,
  addReminder,
  deleteReminder,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('09:00');
  const [type, setType] = useState<ReminderSetting['type']>('water');
  const [daysText, setDaysText] = useState('Her Gün');

  const getIcon = (type: ReminderSetting['type']) => {
    switch (type) {
      case 'water': return <Droplet className="w-5 h-5 text-[#0284c7]" />;
      case 'vitamin': return <Pill className="w-5 h-5 text-[#f07052]" />;
      case 'exercise': return <Activity className="w-5 h-5 text-[#3d5a45]" />;
      case 'weigh': return <Scale className="w-5 h-5 text-[#2e4033]" />;
      case 'measure': return <Ruler className="w-5 h-5 text-[#f07052]" />;
      default: return <Bell className="w-5 h-5 text-[#2e4033]" />;
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !addReminder) return;
    addReminder(title.trim(), time, type, daysText.trim() || 'Her Gün');
    setTitle('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e5e0d5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-[#f07052] font-bold text-xs uppercase tracking-wider mb-1">
            <Bell className="w-4 h-4" />
            <span>Kişisel Zamanlama & Bildirimler</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#2e4033] tracking-tight">Hatırlatıcı Ayarları</h2>
          <p className="text-[#526356] text-sm mt-0.5">
            Su, vitamin, tartı ve egzersiz vakitlerini kendinize göre planlayın!
          </p>
        </div>

        {addReminder && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 bg-[#f07052] hover:bg-[#d95a3d] text-white font-bold text-xs rounded-2xl transition-all shadow-xs flex items-center justify-center space-x-2 cursor-pointer shrink-0 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Hatırlatıcı Ekle</span>
          </button>
        )}
      </div>

      {/* Reminders List or Empty State */}
      {reminders.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-[#e5e0d5] text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 bg-[#fff2ee] text-[#f07052] rounded-full flex items-center justify-center mx-auto">
            <BellOff className="w-8 h-8" />
          </div>
          <h3 className="font-serif font-bold text-xl text-[#2e4033]">Henüz Hatırlatıcı Eklenmedi</h3>
          <p className="text-[#526356] text-sm max-w-md mx-auto">
            Gününüzü daha disiplinli ve sağlıklı geçirmek için ilk hatırlatıcınızı hemen ekleyebilirsiniz.
          </p>
          {addReminder && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="mt-2 px-6 py-3 bg-[#f07052] hover:bg-[#d95a3d] text-white text-xs font-bold rounded-2xl transition-all shadow-xs inline-flex items-center space-x-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>İlk Hatırlatıcını Ekle</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reminders.map((rm) => (
            <div
              key={rm.id}
              className={`p-5 rounded-3xl border transition-all flex items-center justify-between ${
                rm.enabled
                  ? 'bg-white border-[#e5e0d5] shadow-xs'
                  : 'bg-[#fcfaf7] border-[#e5e0d5] opacity-60'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-[#f2f7f3] rounded-2xl border border-[#e5e0d5]">
                  {getIcon(rm.type)}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-[#2e4033]">{rm.title}</h3>
                  <div className="flex items-center space-x-2 text-xs text-[#526356] mt-0.5">
                    <span className="font-bold text-[#f07052] bg-[#fff2ee] border border-[#ffdbd2] px-2 py-0.5 rounded-md">
                      {rm.time}
                    </span>
                    <span>• {rm.daysText}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {/* Toggle switch */}
                <button
                  type="button"
                  onClick={() => toggleReminder(rm.id)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                    rm.enabled ? 'bg-[#3d5a45]' : 'bg-[#d0dad2]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                      rm.enabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  ></div>
                </button>

                {deleteReminder && (
                  <button
                    onClick={() => deleteReminder(rm.id)}
                    className="p-2 text-[#526356]/60 hover:text-[#f07052] rounded-xl transition-colors cursor-pointer"
                    title="Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2e4033]/60 backdrop-blur-xs cursor-pointer">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 max-w-md w-full shadow-xl border border-[#e5e0d5] relative cursor-default"
            >
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#f2f7f3] text-[#2e4033] hover:bg-[#e2ebd3] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="font-serif font-bold text-xl text-[#2e4033] mb-4">Yeni Hatırlatıcı Ekle</h3>

              <form onSubmit={handleCreate} className="space-y-4 text-xs text-[#2e4033]">
                <div>
                  <label className="font-bold block mb-1">Hatırlatıcı Başlığı</label>
                  <input
                    type="text"
                    placeholder="Örn: Akşam 2 Bardak Su, Omega-3 Vitamini"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 bg-[#fcfaf7] border border-[#e5e0d5] rounded-xl focus:outline-hidden focus:border-[#f07052]"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold block mb-1">Saat</label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full p-3 bg-[#fcfaf7] border border-[#e5e0d5] rounded-xl focus:outline-hidden focus:border-[#f07052]"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-bold block mb-1">Tür</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value as any)}
                      className="w-full p-3 bg-[#fcfaf7] border border-[#e5e0d5] rounded-xl text-[#2e4033] focus:outline-hidden focus:border-[#f07052]"
                    >
                      <option value="water">Su İçme</option>
                      <option value="vitamin">Vitamin / İlaç</option>
                      <option value="exercise">Egzersiz</option>
                      <option value="weigh">Tartılma</option>
                      <option value="measure">Beden Ölçümü</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold block mb-1">Sıklık / Günler</label>
                  <input
                    type="text"
                    placeholder="Örn: Her Gün, Pazartesi/Cuma..."
                    value={daysText}
                    onChange={(e) => setDaysText(e.target.value)}
                    className="w-full p-3 bg-[#fcfaf7] border border-[#e5e0d5] rounded-xl focus:outline-hidden focus:border-[#f07052]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#f07052] hover:bg-[#d95a3d] text-white font-bold text-xs rounded-2xl transition-all shadow-xs mt-2 cursor-pointer"
                >
                  Kaydet & Aktif Et
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
