import React from 'react';
import { WaterLog } from '../types';
import { Droplet, RotateCcw, Award, Sparkles, Plus, Minus, GlassWater } from 'lucide-react';
import { motion } from 'motion/react';

interface WaterTabProps {
  waterLog: WaterLog;
  incrementWater: () => void;
  decrementWater: () => void;
  resetWater: () => void;
  setGlasses: (count: number) => void;
}

export const WaterTab: React.FC<WaterTabProps> = ({
  waterLog,
  incrementWater,
  decrementWater,
  resetWater,
  setGlasses,
}) => {
  const target = waterLog.targetGlasses || 8;
  const current = waterLog.glasses;
  const totalMl = current * 250;
  const targetMl = target * 250;
  const percentage = Math.min(100, Math.round((current / target) * 100));

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2e4535] via-[#3d5a45] to-[#0284c7]/80 text-white p-6 sm:p-8 rounded-3xl shadow-md border border-[#2e4535] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-[#38bdf8]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-[#7dd3fc] font-bold text-xs uppercase tracking-wider mb-1">
              <Droplet className="w-4 h-4 text-[#38bdf8]" />
              <span>Günlük Hidrasyon & Süt Üretim Desteği</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-white">Su Takip Sistemi</h2>
            <p className="text-[#e2ebd3] text-sm mt-1 max-w-lg">
              Emziren annelerin günde en az 2.0-2.5 Litre su içmesi önerilir. Her bardağa tıklayarak kolayca doldur!
            </p>
          </div>

          <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 shadow-xs">
            <div className="text-center">
              <span className="text-3xl font-serif font-bold text-[#38bdf8]">{totalMl}</span>
              <span className="text-xs text-[#e2ebd3] block font-medium">/ {targetMl} ml</span>
            </div>
            <div className="w-px h-10 bg-white/20"></div>
            <div className="text-center">
              <span className="text-3xl font-serif font-bold text-[#a7c7a6]">%{percentage}</span>
              <span className="text-xs text-[#e2ebd3] block font-medium">Tamamlandı</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Glasses Grid */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e5e0d5] shadow-xs text-center space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-[#2e4033] text-lg">Bugünkü 8 Bardak Su Hedefi</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={decrementWater}
              className="p-2 rounded-xl bg-[#f2f7f3] hover:bg-[#e2ebd3] text-[#3d5a45] transition-colors border border-[#e5e0d5] cursor-pointer"
              title="1 Bardak Eksilt"
            >
              <Minus className="w-4 h-4" />
            </button>
            <button
              onClick={incrementWater}
              className="p-2 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white transition-colors cursor-pointer"
              title="1 Bardak Ekle"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={resetWater}
              className="p-2 rounded-xl bg-[#fff2ee] hover:bg-[#ffe5de] text-[#f07052] transition-colors border border-[#ffdbd2] cursor-pointer"
              title="Sıfırla"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 8 Interactive Glass Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {Array.from({ length: target }).map((_, index) => {
            const isFilled = index < current;
            return (
              <motion.button
                key={index}
                whileTap={{ scale: 0.92 }}
                onClick={() => {
                  if (isFilled && index === current - 1) {
                    decrementWater();
                  } else {
                    setGlasses(index + 1);
                  }
                }}
                className={`relative p-6 rounded-2xl border-2 transition-all flex flex-col items-center justify-center space-y-2 cursor-pointer ${
                  isFilled
                    ? 'bg-[#0284c7] border-[#0369a1] text-white shadow-xs'
                    : 'bg-[#fcfaf7] hover:bg-[#e0f2fe]/40 border-[#e5e0d5] text-[#526356]'
                }`}
              >
                <div className="relative">
                  <Droplet className={`w-10 h-10 transition-transform ${isFilled ? 'scale-110 text-white' : 'text-[#0284c7]/50'}`} />
                  {isFilled && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-[#81a880] rounded-full border-2 border-white"
                    ></motion.div>
                  )}
                </div>
                <span className="text-xs font-bold">
                  {index + 1}. Bardak
                </span>
                <span className="text-[10px] opacity-80 font-medium">
                  {isFilled ? '250 ml İçildi' : '250 ml'}
                </span>
              </motion.button>
            );
          })}
        </div>

        {percentage >= 100 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-[#eaf4eb] border border-[#cbe4cf] text-[#2e4033] rounded-2xl font-bold text-sm inline-flex items-center space-x-2"
          >
            <Sparkles className="w-5 h-5 text-[#3d5a45]" />
            <span>Tebrikler! Bugünkü 8 Bardak (2.0L) Su Hedefini Başarıyla Tamamladın! 🎉</span>
          </motion.div>
        )}
      </div>
    </div>
  );
};
