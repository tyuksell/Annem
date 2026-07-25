import React, { useState } from 'react';
import { NoteItem } from '../types';
import { FileText, Plus, X, Trash2, Search, Sparkles } from 'lucide-react';

interface NotesTabProps {
  notes: NoteItem[];
  addNote: (title: string, content: string, category: NoteItem['category']) => void;
  deleteNote: (id: string) => void;
}

export const NotesTab: React.FC<NotesTabProps> = ({
  notes,
  addNote,
  deleteNote,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<NoteItem['category']>('Motivasyon');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    addNote(title.trim(), content.trim(), category);
    setTitle('');
    setContent('');
    setShowForm(false);
  };

  const filteredNotes = notes.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e5e0d5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-[#f07052] font-bold text-xs uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" />
            <span>Kişisel Günlük & Düşünceler</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#2e4033] tracking-tight">Not Defterim</h2>
          <p className="text-[#526356] text-sm mt-0.5">
            Hislerini, beslenme deneyimlerini ve hedeflerini özgürce kaleme al.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#f07052] hover:bg-[#d95a3d] text-white font-bold text-xs px-4 py-2.5 rounded-2xl transition-all shadow-xs flex items-center space-x-1.5 shrink-0 cursor-pointer"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span>{showForm ? 'İptal Et' : 'Yeni Not Yaz'}</span>
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-[#fcfaf7] text-[#2e4033] p-6 rounded-3xl shadow-xs border border-[#e5e0d5] space-y-4">
          <h3 className="font-serif font-bold text-base text-[#2e4033]">Yeni Not Ekle</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-[#3d5a45] block mb-1">Başlık</label>
              <input
                type="text"
                placeholder="Örn: 20. Gün Hissi ve Enerjim"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white border border-[#e5e0d5] text-[#2e4033] placeholder-[#526356]/50 rounded-xl px-3.5 py-2 text-sm focus:outline-hidden focus:border-[#f07052] transition-colors"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#3d5a45] block mb-1">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-white border border-[#e5e0d5] text-[#2e4033] rounded-xl px-3.5 py-2 text-sm focus:outline-hidden focus:border-[#f07052] transition-colors"
              >
                <option value="Motivasyon" className="bg-white text-[#2e4033]">Motivasyon</option>
                <option value="Beslenme" className="bg-white text-[#2e4033]">Beslenme</option>
                <option value="Genel" className="bg-white text-[#2e4033]">Genel</option>
                <option value="Ertuğrul" className="bg-white text-[#2e4033]">Ertuğrul</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-[#3d5a45] block mb-1">Not İçeriği</label>
            <textarea
              rows={4}
              placeholder="Aklındakileri buraya dök..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-white border border-[#e5e0d5] text-[#2e4033] placeholder-[#526356]/50 rounded-xl px-3.5 py-2 text-sm focus:outline-hidden focus:border-[#f07052] transition-colors"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-[#f07052] hover:bg-[#d95a3d] text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-colors shadow-xs cursor-pointer"
          >
            Notu Kaydet
          </button>
        </form>
      )}

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-[#526356] absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Notlarında ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white border border-[#e5e0d5] text-[#2e4033] rounded-2xl text-xs focus:outline-hidden focus:border-[#f07052]"
        />
      </div>

      {/* Notes Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNotes.map((note) => (
          <div key={note.id} className="bg-white p-5 rounded-3xl border border-[#e5e0d5] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase bg-[#eaf4eb] text-[#3d5a45] px-2.5 py-0.5 rounded-md">
                  {note.category}
                </span>
                <span className="text-[11px] text-[#526356]">{note.date}</span>
              </div>
              <h3 className="font-serif font-bold text-base text-[#2e4033]">{note.title}</h3>
              <p className="text-xs text-[#526356] mt-2 leading-relaxed whitespace-pre-line">{note.content}</p>
            </div>

            <div className="pt-4 border-t border-[#e5e0d5] mt-4 flex justify-end">
              <button
                onClick={() => deleteNote(note.id)}
                className="text-[#526356]/60 hover:text-[#f07052] p-1 transition-colors cursor-pointer"
                title="Notu Sil"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
