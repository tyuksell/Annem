import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, DailyRoutineItem, WaterLog, WeightLog } from '../types';
import { Sparkles, Send, Bot, User, RefreshCw, MessageSquare, Heart, ShieldAlert, Baby } from 'lucide-react';
import { getAiResponse } from '../lib/gemini';

interface AiAssistantTabProps {
  userProfile: UserProfile;
  routineList: DailyRoutineItem[];
  waterLog: WaterLog;
  weightLogs: WeightLog[];
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

export const AiAssistantTab: React.FC<AiAssistantTabProps> = ({
  userProfile,
  routineList,
  waterLog,
  weightLogs,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Merhaba ${userProfile.name || 'Sevgili Anne'} 🌸 Ben senin yapay zeka destekli yaşam ve sağlık koçunum. Emziren anne beslenmesi, diz dostu egzersizler, günlük kalori dengesi veya motivasyon ile ilgili aklına takılan her şeyi bana sorabilirsin!`,
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput('');

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const responseText = await getAiResponse(userText, userProfile);

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: responseText,
        time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: 'Üzgünüm, şu anda yanıt oluştururken küçük bir aksaklık yaşandı. Lütfen biraz sonra tekrar dener misin?',
        time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = [
    'Bugün ne yememi önerirsin?',
    'Dizlerimi zorlamadan yapabileceğim egzersizler neler?',
    'Süt artırıcı sağlıklı ara öğün önerisi verir misin?',
    'Bugünkü su tüketimim yeterli mi?',
  ];

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2e4535] via-[#3d5a45] to-[#4e7258] text-white p-6 sm:p-8 rounded-3xl shadow-md border border-[#2e4535] flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-48 h-48 bg-[#f07052]/20 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-2 text-[#ff8a70] font-bold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-[#ff8a70] animate-pulse" />
            <span>Kişisel AI Yaşam & Beslenme Koçu</span>
          </div>
          <h2 className="text-2xl font-serif font-bold tracking-tight text-white">Annem AI Asistan</h2>
          <p className="text-[#e2ebd3] text-sm mt-0.5">
            Sana özel beslenme, emzirme, egzersiz ve motivasyon desteği 7/24 yanında.
          </p>
        </div>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-3xl border border-[#e5e0d5] shadow-xs overflow-hidden flex flex-col h-[520px]">
        {/* Messages List */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 custom-scrollbar">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 mt-1 shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-[#f07052] text-white'
                    : 'bg-[#3d5a45] text-white'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[80%] sm:max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#3d5a45] text-white font-medium rounded-tr-none shadow-xs'
                    : 'bg-[#f2f7f3] text-[#2e4033] rounded-tl-none border border-[#e5e0d5]'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <span
                  className={`text-[10px] block mt-1.5 ${
                    msg.sender === 'user' ? 'text-[#e2ebd3] text-right' : 'text-[#526356]'
                  }`}
                >
                  {msg.time}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-[#3d5a45] text-white flex items-center justify-center font-bold text-xs shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-[#f2f7f3] p-3.5 rounded-2xl text-xs text-[#2e4033] font-semibold flex items-center space-x-2 border border-[#e5e0d5]">
                <RefreshCw className="w-4 h-4 animate-spin text-[#f07052]" />
                <span>Yanıt hazırlanıyor...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Question Chips */}
        <div className="bg-[#fcfaf7] border-t border-[#e5e0d5] p-2.5 overflow-x-auto no-scrollbar">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold text-[#f07052] uppercase tracking-wider shrink-0 px-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Hızlı Sor:
            </span>
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInput(q);
                }}
                className="px-3.5 py-1.5 bg-white hover:bg-[#e2ebd3] border border-[#e5e0d5] text-[#3d5a45] text-xs font-semibold rounded-xl whitespace-nowrap transition-all shrink-0 shadow-2xs active:scale-95 cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 sm:p-4 bg-white border-t border-[#e5e0d5] flex items-center space-x-2">
          <input
            type="text"
            placeholder="Mesajını buraya yaz..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-[#fcfaf7] border border-[#e5e0d5] rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-[#2e4033] focus:outline-hidden focus:border-[#f07052]"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="bg-[#f07052] hover:bg-[#d95a3d] disabled:bg-[#dcd7cc] text-white font-bold px-5 py-2.5 rounded-2xl transition-colors flex items-center space-x-1 shrink-0 shadow-xs cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Gönder</span>
          </button>
        </form>
      </div>
    </div>
  );
};
