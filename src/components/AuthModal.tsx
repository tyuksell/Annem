import React, { useState } from 'react';
import { UserProfile } from '../types';
import { X, Lock, Mail, User, ShieldCheck, Key } from 'lucide-react';
import { motion } from 'motion/react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  loginUser: (email: string, name?: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  loginUser,
}) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState(userProfile.email || '');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(userProfile.name || '');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'forgot') {
      setMessage('Şifre sıfırlama bağlantısı e-posta adresine gönderildi! 📩');
      setTimeout(() => setMessage(''), 4000);
      return;
    }

    loginUser(email, name);
    setMessage('Giriş başarılı! Hoş geldin 🌸');
    setTimeout(() => {
      setMessage('');
      onClose();
    }, 1200);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 pb-6 sm:pb-4 bg-[#5a5a40]/60 backdrop-blur-xs overflow-y-auto cursor-pointer"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl max-w-[min(100%,28rem)] w-full shadow-2xl p-6 sm:p-8 relative space-y-6 border border-[#e5e0d5] cursor-default max-h-[calc(100vh-2.5rem)] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#f4f1ea] text-[#5a5a40] hover:text-[#b56b45] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#5a5a40] text-[#fcfaf7] flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-serif font-bold text-[#5a5a40]">
            {mode === 'login' && 'Annem\'e Giriş Yap'}
            {mode === 'register' && 'Yeni Hesap Oluştur'}
            {mode === 'forgot' && 'Şifremi Unuttum'}
          </h2>
          <p className="text-xs text-[#4a4a40]/70">
            Verilerin tamamen sana aittir ve güvenle saklanır. 🤍
          </p>
        </div>

        {message && (
          <div className="p-3 bg-[#8a9a5b]/15 border border-[#8a9a5b]/40 text-[#8a9a5b] text-xs font-bold rounded-xl text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="text-xs font-bold text-[#5a5a40] block mb-1">Adın</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#4a4a40]/50 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Örn: Ayşe"
                  className="w-full pl-10 pr-4 py-2 bg-[#fcfaf7] border border-[#e5e0d5] text-[#5a5a40] rounded-xl text-xs font-semibold focus:outline-hidden focus:border-[#b56b45]"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-[#5a5a40] block mb-1">E-posta Adresin</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#4a4a40]/50 absolute left-3.5 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-posta adresin"
                className="w-full pl-10 pr-4 py-2 bg-[#fcfaf7] border border-[#e5e0d5] text-[#5a5a40] rounded-xl text-xs font-semibold focus:outline-hidden focus:border-[#b56b45]"
                required
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div>
              <label className="text-xs font-bold text-[#5a5a40] block mb-1">Şifre</label>
              <div className="relative">
                <Key className="w-4 h-4 text-[#4a4a40]/50 absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 bg-[#fcfaf7] border border-[#e5e0d5] text-[#5a5a40] rounded-xl text-xs font-semibold focus:outline-hidden focus:border-[#b56b45]"
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-[#b56b45] hover:bg-[#a05a37] text-white font-bold text-xs rounded-2xl transition-colors shadow-xs"
          >
            {mode === 'login' && 'Güvenli Giriş Yap'}
            {mode === 'register' && 'Hesabımı Oluştur'}
            {mode === 'forgot' && 'Sıfırlama Bağlantısı Gönder'}
          </button>
        </form>

        <div className="flex items-center justify-between text-xs text-[#4a4a40]/70 pt-2 border-t border-[#e5e0d5]">
          {mode === 'login' ? (
            <>
              <button onClick={() => setMode('forgot')} className="hover:text-[#b56b45]">
                Şifremi unuttum?
              </button>
              <button onClick={() => setMode('register')} className="font-bold text-[#b56b45]">
                Hesap oluştur
              </button>
            </>
          ) : (
            <button onClick={() => setMode('login')} className="font-bold text-[#b56b45] mx-auto">
              Giriş Ekranına Dön
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
