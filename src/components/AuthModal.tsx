import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { X, Lock, Mail, Key, CheckCircle2, AlertCircle, ArrowLeft, ShieldCheck, KeyRound, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  loginUser: (email: string, password: string) => boolean;
  onRegister: () => void;
  initialMode?: 'login' | 'forgot' | 'reset';
  onRequestReset?: (email: string) => { success: boolean; message: string; resetLink?: string; token?: string };
  onResetPassword?: (token: string, newPassword: string) => { success: boolean; message: string };
  activeResetToken?: string | null;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  loginUser,
  onRegister,
  initialMode = 'login',
  onRequestReset,
  onResetPassword,
  activeResetToken,
}) => {
  const [mode, setMode] = useState<'login' | 'forgot' | 'reset'>(initialMode);
  const [email, setEmail] = useState(userProfile.email || '');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Security recovery code & token state
  const [recoveryCode, setRecoveryCode] = useState('');
  const [userCodeInput, setUserCodeInput] = useState('');
  const [activeToken, setActiveToken] = useState<string>(activeResetToken || '');

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setEmail(userProfile.email || '');
      setPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setErrorMessage('');
      setSuccessMessage('');
      setRecoveryCode('');
      setUserCodeInput('');
      if (activeResetToken) {
        setActiveToken(activeResetToken);
        setMode('reset');
      }
    }
  }, [isOpen, initialMode, userProfile.email, activeResetToken]);

  if (!isOpen) return null;

  // Generate a random 6-digit recovery code
  const generateRecoveryCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Handle Form Submissions
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // 1. LOGIN MODE
    if (mode === 'login') {
      if (!email.trim() || !password.trim()) {
        setErrorMessage('Lütfen e-posta adresinizi ve şifrenizi girin.');
        return;
      }
      const success = loginUser(email.trim(), password);
      if (!success) {
        setErrorMessage('Girdiğiniz e-posta adresi veya şifre hatalı. Lütfen tekrar deneyin.');
        return;
      }
      setSuccessMessage('Giriş başarılı! Hoş geldin 🌸');
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
      }, 1000);
      return;
    }

    // 2. FORGOT PASSWORD (RECOVERY CODE GENERATION) MODE
    if (mode === 'forgot') {
      const trimmedEmail = email.trim().toLowerCase();
      if (!trimmedEmail) {
        setErrorMessage('Lütfen e-posta adresinizi girin.');
        return;
      }

      if (onRequestReset) {
        const res = onRequestReset(trimmedEmail);
        if (!res.success) {
          setErrorMessage(res.message);
          return;
        }

        const code = generateRecoveryCode();
        setRecoveryCode(code);
        setUserCodeInput(code); // Pre-fill for instant seamless verification
        if (res.token) setActiveToken(res.token);

        setSuccessMessage(`Hesabınız doğrulandı! 🔑 Kurtarma kodunuz: ${code}`);
        setTimeout(() => {
          setMode('reset');
          setSuccessMessage('');
        }, 1200);
      } else {
        const code = generateRecoveryCode();
        setRecoveryCode(code);
        setUserCodeInput(code);
        setMode('reset');
      }
      return;
    }

    // 3. RESET PASSWORD MODE
    if (mode === 'reset') {
      if (recoveryCode && userCodeInput.trim() !== recoveryCode) {
        setErrorMessage('Girilen doğrulama/kurtarma kodu hatalı.');
        return;
      }

      if (!newPassword.trim()) {
        setErrorMessage('Lütfen yeni bir şifre girin.');
        return;
      }

      if (newPassword.length < 6) {
        setErrorMessage('Şifreniz en az 6 karakter olmalıdır.');
        return;
      }

      if (newPassword !== confirmPassword) {
        setErrorMessage('Şifreler birbiriyle eşleşmiyor.');
        return;
      }

      const tokenToUse = activeToken || activeResetToken || 'default_token';

      if (onResetPassword) {
        const res = onResetPassword(tokenToUse, newPassword);
        if (!res.success) {
          setErrorMessage(res.message);
          return;
        }
        setSuccessMessage(res.message);
        setTimeout(() => {
          setSuccessMessage('');
          setMode('login');
          setPassword('');
          setNewPassword('');
          setConfirmPassword('');
        }, 1500);
      } else {
        setSuccessMessage('Şifreniz başarıyla güncellendi! Giriş yapabilirsiniz.');
        setTimeout(() => {
          setSuccessMessage('');
          setMode('login');
        }, 1500);
      }
    }
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
          className="absolute top-4 right-4 p-2 rounded-full bg-[#f4f1ea] text-[#5a5a40] hover:text-[#b56b45] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#5a5a40] text-[#fcfaf7] flex items-center justify-center mx-auto shadow-md">
            {mode === 'login' && <Lock className="w-6 h-6" />}
            {mode === 'forgot' && <KeyRound className="w-6 h-6 text-[#ffdbd2]" />}
            {mode === 'reset' && <Key className="w-6 h-6 text-[#ffdbd2]" />}
          </div>
          <h2 className="text-xl font-serif font-bold text-[#5a5a40]">
            {mode === 'login' && "Annem'e Giriş Yap"}
            {mode === 'forgot' && 'Şifremi Unuttum'}
            {mode === 'reset' && 'Yeni Şifre Belirle'}
          </h2>
          <p className="text-xs text-[#4a4a40]/70 leading-relaxed">
            {mode === 'login' && 'Hesabına giriş yap veya yeni profil oluştur. 🤍'}
            {mode === 'forgot' && 'Kayıtlı e-posta adresinle hesabını doğrula ve şifreni yenile.'}
            {mode === 'reset' && 'Hesabın için yeni ve güçlü bir şifre oluştur.'}
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3.5 bg-[#f07052]/15 border border-[#f07052]/40 text-[#c24128] text-xs font-bold rounded-xl flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="leading-relaxed">{errorMessage}</span>
          </div>
        )}

        {/* Success Alert */}
        {successMessage && (
          <div className="p-3.5 bg-[#8a9a5b]/15 border border-[#8a9a5b]/40 text-[#495724] text-xs font-bold rounded-xl flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#8a9a5b] mt-0.5" />
            <span className="leading-relaxed">{successMessage}</span>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input (for login & forgot modes) */}
          {mode !== 'reset' && (
            <div>
              <label className="text-xs font-bold text-[#5a5a40] block mb-1">E-posta Adresin</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#4a4a40]/50 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresin"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#fcfaf7] border border-[#e5e0d5] text-[#5a5a40] rounded-xl text-xs font-semibold focus:outline-hidden focus:border-[#b56b45]"
                  required
                />
              </div>
            </div>
          )}

          {/* Password Input for Login Mode */}
          {mode === 'login' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-[#5a5a40]">Şifre</label>
                <button
                  type="button"
                  onClick={() => {
                    setMode('forgot');
                    setErrorMessage('');
                    setSuccessMessage('');
                  }}
                  className="text-xs text-[#b56b45] hover:underline font-semibold cursor-pointer"
                >
                  Şifremi unuttum?
                </button>
              </div>
              <div className="relative">
                <Key className="w-4 h-4 text-[#4a4a40]/50 absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#fcfaf7] border border-[#e5e0d5] text-[#5a5a40] rounded-xl text-xs font-semibold focus:outline-hidden focus:border-[#b56b45]"
                  required
                />
              </div>
            </div>
          )}

          {/* Verification & New Password Inputs for Reset Mode */}
          {mode === 'reset' && (
            <div className="space-y-4">
              {recoveryCode && (
                <div className="p-3 bg-[#fcfaf7] border border-[#e5e0d5] rounded-2xl text-center space-y-1">
                  <span className="text-[11px] font-bold text-[#5a5a40] uppercase tracking-wider block">
                    Güvenlik Kurtarma Kodunuz
                  </span>
                  <div className="text-xl font-mono font-extrabold text-[#b56b45] tracking-widest">
                    {recoveryCode}
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-[#5a5a40] block mb-1">Yeni Şifre</label>
                <div className="relative">
                  <Key className="w-4 h-4 text-[#4a4a40]/50 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="En az 6 karakter"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#fcfaf7] border border-[#e5e0d5] text-[#5a5a40] rounded-xl text-xs font-semibold focus:outline-hidden focus:border-[#b56b45]"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#5a5a40] block mb-1">Yeni Şifre (Tekrar)</label>
                <div className="relative">
                  <ShieldCheck className="w-4 h-4 text-[#4a4a40]/50 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Yeni şifrenizi tekrar girin"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#fcfaf7] border border-[#e5e0d5] text-[#5a5a40] rounded-xl text-xs font-semibold focus:outline-hidden focus:border-[#b56b45]"
                    required
                  />
                </div>
                {confirmPassword && newPassword !== confirmPassword && (
                  <p className="text-[11px] text-[#f07052] font-semibold mt-1">Şifreler eşleşmiyor!</p>
                )}
              </div>
            </div>
          )}

          {/* Main Action Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#b56b45] hover:bg-[#a05a37] text-white font-bold text-xs rounded-2xl transition-all shadow-xs cursor-pointer active:scale-98 flex items-center justify-center space-x-2"
          >
            {mode === 'login' && <span>Güvenli Giriş Yap</span>}
            {mode === 'forgot' && (
              <>
                <span>Hesabımı Doğrula ve Devam Et</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
            {mode === 'reset' && <span>Şifreyi Güncelle & Giriş Yap</span>}
          </button>
        </form>

        {/* Footer Links */}
        <div className="flex items-center justify-between text-xs text-[#4a4a40]/70 pt-3 border-t border-[#e5e0d5]">
          {mode === 'login' ? (
            <>
              <span className="text-[#4a4a40]/60">Henüz hesabın yok mu?</span>
              <button
                type="button"
                onClick={onRegister}
                className="font-bold text-[#b56b45] hover:underline cursor-pointer"
              >
                Hesap Oluştur
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMessage('');
                setSuccessMessage('');
              }}
              className="font-bold text-[#b56b45] hover:underline flex items-center mx-auto cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              <span>Giriş Ekranına Dön</span>
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
