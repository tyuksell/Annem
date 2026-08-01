import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { LibraryBook } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Plus,
  X,
  Edit3,
  Check,
  Trash2,
  BookMarked,
  Star,
  Search,
} from 'lucide-react';

interface LibraryTabProps {
  books: LibraryBook[];
  addBook: (book: Omit<LibraryBook, 'id' | 'addedDate' | 'isCompleted'>) => void;
  updateBook: (id: string, updates: Partial<LibraryBook>) => void;
  deleteBook: (id: string) => void;
}

// ─── Deterministic palette from title ────────────────────────────────────────
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

const PALETTES = [
  { bg: ['#1a1a2e', '#16213e'], spine: '#0f3460', accent: '#e94560', text: '#f5f5f5' },
  { bg: ['#2d1b69', '#11998e'], spine: '#38ef7d', accent: '#f7971e', text: '#fff' },
  { bg: ['#4a1942', '#c94b4b'], spine: '#7b1fa2', accent: '#f8bbd9', text: '#fff' },
  { bg: ['#134e5e', '#71b280'], spine: '#0f4c5c', accent: '#ffd700', text: '#fff' },
  { bg: ['#373b44', '#4286f4'], spine: '#192a56', accent: '#fbc531', text: '#fff' },
  { bg: ['#3a1c71', '#d76d77'], spine: '#6c3483', accent: '#f8c8d4', text: '#fff' },
  { bg: ['#1d2671', '#c33764'], spine: '#283593', accent: '#ffa726', text: '#fff' },
  { bg: ['#2b5329', '#5a8a3e'], spine: '#1b5e20', accent: '#a5d6a7', text: '#fff' },
  { bg: ['#4e3620', '#8d6240'], spine: '#3e2723', accent: '#ffcc80', text: '#fff' },
  { bg: ['#0f2027', '#2c5364'], spine: '#006064', accent: '#80deea', text: '#fff' },
];

function getPalette(title: string) {
  const h = hashString(title);
  return PALETTES[h % PALETTES.length];
}

function getPattern(title: string): string {
  const h = hashString(title);
  const patterns = ['circles', 'diamonds', 'lines', 'stars', 'waves'];
  return patterns[h % patterns.length];
}

// ─── Book Cover SVG ───────────────────────────────────────────────────────────
const BookCover: React.FC<{
  title: string;
  author: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ title, author, size = 'md' }) => {
  const palette = getPalette(title);
  const pattern = getPattern(title);
  const h = hashString(title);

  const dims = {
    sm:  { w: 80,  h: 112, fontSize: 7,  authorSize: 5,  r: 8  },
    md:  { w: 120, h: 168, fontSize: 10, authorSize: 7,  r: 12 },
    lg:  { w: 160, h: 224, fontSize: 13, authorSize: 9,  r: 16 },
  }[size];

  const truncate = (s: string, max: number) =>
    s.length > max ? s.slice(0, max - 1) + '\u2026' : s;

  const lines = (() => {
    const words = title.split(' ');
    const result: string[] = [];
    let current = '';
    const charLimit = size === 'sm' ? 10 : size === 'md' ? 13 : 17;
    for (const w of words) {
      if ((current + ' ' + w).trim().length > charLimit) {
        if (current) result.push(current.trim());
        current = w;
      } else {
        current = current ? current + ' ' + w : w;
      }
    }
    if (current) result.push(current.trim());
    return result.slice(0, 4);
  })();

  const gradId = `grad-${h}`;

  const renderPattern = () => {
    switch (pattern) {
      case 'circles':
        return Array.from({ length: 5 }).map((_, i) => (
          <circle key={i} cx={dims.w * 0.5} cy={dims.h * 0.35 - i * 12}
            r={16 - i * 2} stroke={palette.accent} strokeWidth="0.8" fill="none" opacity={0.25 + i * 0.06} />
        ));
      case 'diamonds':
        return Array.from({ length: 3 }).map((_, i) => {
          const sz = 18 - i * 4;
          return (
            <rect key={i} x={dims.w * 0.5 - sz} y={dims.h * 0.32 - sz - i * 14}
              width={sz * 2} height={sz * 2}
              transform={`rotate(45 ${dims.w * 0.5} ${dims.h * 0.32 - i * 14})`}
              stroke={palette.accent} strokeWidth="0.8" fill="none" opacity={0.3} />
          );
        });
      case 'lines':
        return Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1={10} y1={dims.h * 0.18 + i * 10} x2={dims.w - 10} y2={dims.h * 0.18 + i * 10}
            stroke={palette.accent} strokeWidth="0.6" opacity={0.18} />
        ));
      case 'stars':
        return Array.from({ length: 4 }).map((_, i) => {
          const cx2 = (i % 2 === 0 ? 0.3 : 0.7) * dims.w;
          const cy2 = 0.2 * dims.h + Math.floor(i / 2) * 40;
          return (
            <polygon key={i}
              points={`${cx2},${cy2-10} ${cx2+3},${cy2-3} ${cx2+10},${cy2-3} ${cx2+4},${cy2+2} ${cx2+6},${cy2+10} ${cx2},${cy2+6} ${cx2-6},${cy2+10} ${cx2-4},${cy2+2} ${cx2-10},${cy2-3} ${cx2-3},${cy2-3}`}
              fill={palette.accent} opacity={0.22} />
          );
        });
      case 'waves':
        return Array.from({ length: 5 }).map((_, i) => {
          const y2 = dims.h * 0.15 + i * 14;
          const d = `M0,${y2} Q${dims.w * 0.25},${y2 - 8} ${dims.w * 0.5},${y2} T${dims.w},${y2}`;
          return <path key={i} d={d} stroke={palette.accent} strokeWidth="0.8" fill="none" opacity={0.2} />;
        });
      default:
        return null;
    }
  };

  return (
    <svg width={dims.w} height={dims.h} viewBox={`0 0 ${dims.w} ${dims.h}`}
      style={{ borderRadius: dims.r, display: 'block', flexShrink: 0 }}>
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          {palette.bg.map((color, i) => (
            <stop key={i} offset={`${(i / (palette.bg.length - 1)) * 100}%`} stopColor={color} />
          ))}
        </linearGradient>
      </defs>
      <rect width={dims.w} height={dims.h} fill={`url(#${gradId})`} rx={dims.r} />
      <rect x={0} y={0} width={dims.w * 0.08} height={dims.h} fill={palette.spine} opacity={0.7} />
      {renderPattern()}
      <rect x={dims.w * 0.12} y={dims.h * 0.55} width={dims.w * 0.76} height={2}
        fill={palette.accent} opacity={0.6} rx={1} />
      <text x={dims.w * 0.5} y={dims.h * 0.22} textAnchor="middle"
        fontSize={dims.fontSize * 2.2} fill={palette.accent} opacity={0.35}>
        {'\uD83D\uDCD6'}
      </text>
      {lines.map((line, i) => (
        <text key={i}
          x={dims.w * 0.5} y={dims.h * 0.62 + i * (dims.fontSize * 1.55)}
          textAnchor="middle" fontSize={dims.fontSize}
          fontWeight="bold" fill={palette.text}
          fontFamily="Georgia, serif" opacity={0.95}>
          {line}
        </text>
      ))}
      <text x={dims.w * 0.5} y={dims.h * 0.91}
        textAnchor="middle" fontSize={dims.authorSize}
        fill={palette.text} opacity={0.7} fontFamily="Georgia, serif">
        {truncate(author, size === 'sm' ? 12 : 18)}
      </text>
    </svg>
  );
};

// ─── Progress Bar ─────────────────────────────────────────────────────────────
const ProgressBar: React.FC<{ value: number; total: number; accent: string }> = ({ value, total, accent }) => {
  const pct = total > 0 ? Math.min(100, Math.round((value / total) * 100)) : 0;
  return (
    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${pct}%`, background: accent }}
      />
    </div>
  );
};

// ─── Form Modal ───────────────────────────────────────────────────────────────
interface BookFormData {
  title: string;
  author: string;
  totalPages: string;
  lastReadPage: string;
  notes: string;
}

const DEFAULT_FORM: BookFormData = {
  title: '',
  author: '',
  totalPages: '',
  lastReadPage: '',
  notes: '',
};

const BookFormModal: React.FC<{
  initial?: LibraryBook | null;
  onSave: (data: BookFormData) => void;
  onClose: () => void;
}> = ({ initial, onSave, onClose }) => {
  const [form, setForm] = useState<BookFormData>(
    initial
      ? {
          title: initial.title,
          author: initial.author,
          totalPages: String(initial.totalPages),
          lastReadPage: String(initial.lastReadPage),
          notes: initial.notes ?? '',
        }
      : DEFAULT_FORM
  );

  const palette = form.title ? getPalette(form.title) : PALETTES[0];
  const isValid = form.title.trim().length > 0 && Number(form.totalPages) > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.97 }}
        transition={{ type: 'spring', damping: 24, stiffness: 260 }}
        className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Gradient header with live preview */}
        <div
          className="px-6 pt-6 pb-5 text-white"
          style={{ background: `linear-gradient(135deg, ${palette.bg[0]}, ${palette.bg[palette.bg.length - 1]})` }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">{initial ? 'Kitabı Düzenle' : 'Kitap Ekle'}</h2>
            <button onClick={onClose}
              className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="drop-shadow-xl">
              <BookCover title={form.title || 'Kitap'} author={form.author || 'Yazar'} size="sm" />
            </div>
            <div>
              <p className="font-bold text-base leading-tight">
                {form.title || 'Kitap başlığı'}
              </p>
              <p className="text-sm opacity-75 mt-0.5">{form.author || 'Yazar adı'}</p>
              <p className="text-xs opacity-50 mt-1">Kapak otomatik oluşturulur</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-5 space-y-4 max-h-[60vh] overflow-y-auto">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kitap Adı *</label>
            <input
              className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3d5a45]/30 focus:border-[#3d5a45] transition-all"
              placeholder="Örn: Küçük Prens"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Yazar</label>
            <input
              className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3d5a45]/30 focus:border-[#3d5a45] transition-all"
              placeholder="Örn: Antoine de Saint-Exupéry"
              value={form.author}
              onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Toplam Sayfa *</label>
              <input
                type="number" min="1"
                className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3d5a45]/30 focus:border-[#3d5a45] transition-all"
                placeholder="Örn: 300"
                value={form.totalPages}
                onChange={e => setForm(f => ({ ...f, totalPages: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Son Sayfa</label>
              <input
                type="number" min="0"
                className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3d5a45]/30 focus:border-[#3d5a45] transition-all"
                placeholder="Örn: 50"
                value={form.lastReadPage}
                onChange={e => setForm(f => ({ ...f, lastReadPage: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Notlar</label>
            <textarea
              rows={2}
              className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3d5a45]/30 focus:border-[#3d5a45] transition-all resize-none"
              placeholder="Kitap hakkında not ekle…"
              value={form.notes}
              onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
            />
          </div>

          <div className="flex gap-3 pt-1">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              İptal
            </button>
            <button
              onClick={() => isValid && onSave(form)}
              disabled={!isValid}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all ${
                isValid
                  ? 'bg-[#3d5a45] hover:bg-[#2e4535] shadow-md hover:shadow-lg cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {initial ? 'Güncelle' : 'Ekle'}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Book Card ────────────────────────────────────────────────────────────────
const BookCard: React.FC<{
  book: LibraryBook;
  onEdit: () => void;
  onDelete: () => void;
  onUpdatePage: (page: number) => void;
  onToggleComplete: () => void;
  index: number;
}> = ({ book, onEdit, onDelete, onUpdatePage, onToggleComplete, index }) => {
  const palette = getPalette(book.title);
  const pct = book.totalPages > 0 ? Math.round((book.lastReadPage / book.totalPages) * 100) : 0;
  const [showPageEdit, setShowPageEdit] = useState(false);
  const [pageInput, setPageInput] = useState(String(book.lastReadPage));

  const handlePageSave = () => {
    const p = Math.min(book.totalPages, Math.max(0, Number(pageInput)));
    onUpdatePage(p);
    setShowPageEdit(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className={`bg-white rounded-2xl shadow-sm border transition-all hover:shadow-md hover:-translate-y-0.5 overflow-hidden ${
        book.isCompleted ? 'border-emerald-200' : 'border-slate-100'
      }`}
    >
      <div className="flex gap-4 p-4">
        {/* Cover */}
        <div className="flex-shrink-0 relative">
          <div className="drop-shadow-lg">
            <BookCover title={book.title} author={book.author} size="md" />
          </div>
          {book.isCompleted && (
            <div className="absolute inset-0 bg-emerald-500/20 rounded-xl flex items-center justify-center backdrop-blur-[1px]">
              <div className="bg-emerald-500 rounded-full p-1.5 shadow-md">
                <Check className="w-4 h-4 text-white" />
              </div>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-bold text-[#2e4033] text-sm leading-tight line-clamp-2">{book.title}</h3>
              {book.author && (
                <p className="text-xs text-slate-500 mt-0.5 truncate">{book.author}</p>
              )}
            </div>
            <div className="flex items-center gap-0.5 flex-shrink-0">
              <button onClick={onEdit}
                className="p-1.5 rounded-lg text-slate-400 hover:text-[#3d5a45] hover:bg-[#f2f7f3] transition-colors cursor-pointer">
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button onClick={onDelete}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Progress section */}
          <div className="mt-3 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">İlerleme</span>
              <span className="text-[10px] font-bold" style={{ color: palette.accent }}>{pct}%</span>
            </div>
            <ProgressBar value={book.lastReadPage} total={book.totalPages} accent={palette.accent} />

            <div className="flex items-center justify-between flex-wrap gap-1">
              {showPageEdit ? (
                <div className="flex items-center gap-1.5">
                  <input
                    type="number" min="0" max={book.totalPages}
                    value={pageInput}
                    onChange={e => setPageInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handlePageSave()}
                    className="w-16 text-xs border border-[#3d5a45] rounded-lg px-1.5 py-0.5 text-center focus:outline-none"
                    autoFocus
                  />
                  <span className="text-[10px] text-slate-400">/ {book.totalPages} sf.</span>
                  <button onClick={handlePageSave} className="p-0.5 text-emerald-600 cursor-pointer">
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => setShowPageEdit(false)} className="p-0.5 text-slate-400 cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setPageInput(String(book.lastReadPage)); setShowPageEdit(true); }}
                  className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-[#3d5a45] transition-colors cursor-pointer group"
                >
                  <BookMarked className="w-3 h-3" />
                  <span className="font-medium">{book.lastReadPage}/{book.totalPages} sayfa</span>
                  <Edit3 className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              )}

              <button
                onClick={onToggleComplete}
                className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all cursor-pointer ${
                  book.isCompleted
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                    : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-emerald-300 hover:text-emerald-700'
                }`}
              >
                {book.isCompleted ? (
                  <><Star className="w-2.5 h-2.5 fill-emerald-500 text-emerald-500" /> Bitti</>
                ) : (
                  <><Check className="w-2.5 h-2.5" /> Bitir</>
                )}
              </button>
            </div>
          </div>

          {book.notes && (
            <p className="mt-2 text-[10px] text-slate-400 italic line-clamp-1">💬 {book.notes}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
export const LibraryTab: React.FC<LibraryTabProps> = ({
  books,
  addBook,
  updateBook,
  deleteBook,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState<LibraryBook | null>(null);
  const editingBookRef = useRef<LibraryBook | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'reading' | 'completed'>('all');

  // Keep ref in sync with state for use inside useCallback
  useEffect(() => {
    editingBookRef.current = editingBook;
  }, [editingBook]);

  const filtered = useMemo(() => {
    let list = books;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q));
    }
    if (filter === 'reading') list = list.filter(b => !b.isCompleted);
    if (filter === 'completed') list = list.filter(b => b.isCompleted);
    return list;
  }, [books, search, filter]);

  const stats = useMemo(() => ({
    total: books.length,
    completed: books.filter(b => b.isCompleted).length,
    reading: books.filter(b => !b.isCompleted && b.lastReadPage > 0).length,
    totalPages: books.reduce((acc, b) => acc + b.lastReadPage, 0),
  }), [books]);

  const handleSave = useCallback((data: BookFormData) => {
    const current = editingBookRef.current;
    const palette = getPalette(data.title);
    const bookData = {
      title: data.title.trim(),
      author: data.author.trim(),
      totalPages: Number(data.totalPages) || 0,
      lastReadPage: Math.min(Number(data.totalPages) || 0, Number(data.lastReadPage) || 0),
      coverColor: palette.bg[0],
      coverAccent: palette.accent,
      notes: data.notes.trim() || undefined,
    };
    // Close modal first
    setShowModal(false);
    setEditingBook(null);
    editingBookRef.current = null;
    // Then update parent state — triggers re-render with new books list
    if (current) {
      updateBook(current.id, bookData);
    } else {
      addBook(bookData);
    }
  }, [addBook, updateBook]);

  const openEdit = (book: LibraryBook) => { setEditingBook(book); setShowModal(true); };
  const openAdd = () => { setEditingBook(null); setShowModal(true); };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#2e4033] flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-[#3d5a45]" />
            Kütüphanem
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">Kitap koleksiyonunu takip et</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#3d5a45] hover:bg-[#2e4535] text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Kitap Ekle</span>
          <span className="sm:hidden">Ekle</span>
        </button>
      </div>

      {/* Stats */}
      {books.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Toplam Kitap', value: stats.total, emoji: '📚' },
            { label: 'Okunuyor', value: stats.reading, emoji: '📖' },
            { label: 'Tamamlanan', value: stats.completed, emoji: '✅' },
            { label: 'Okunan Sayfa', value: stats.totalPages.toLocaleString('tr'), emoji: '📄' },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07 }}
              className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-sm text-center"
            >
              <p className="text-2xl mb-1">{s.emoji}</p>
              <p className="text-xl font-bold text-[#2e4033]">{s.value}</p>
              <p className="text-[10px] text-slate-500 font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Search & Filter */}
      {books.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#3d5a45]/25 focus:border-[#3d5a45] transition-all"
              placeholder="Kitap veya yazar ara…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'reading', 'completed'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filter === f
                    ? 'bg-[#3d5a45] text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-[#3d5a45] hover:text-[#3d5a45]'
                }`}
              >
                {f === 'all' ? 'Tümü' : f === 'reading' ? 'Okuyor' : 'Tamamlandı'}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Book List */}
      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-lg font-bold text-[#2e4033] mb-2">
            {books.length === 0 ? 'Kütüphanen Boş' : 'Sonuç bulunamadı'}
          </h3>
          <p className="text-sm text-slate-500 mb-6 max-w-xs mx-auto">
            {books.length === 0
              ? 'İlk kitabını ekleyerek okuma yolculuğuna başla!'
              : 'Farklı bir arama terimi dene.'}
          </p>
          {books.length === 0 && (
            <button
              onClick={openAdd}
              className="inline-flex items-center gap-2 bg-[#3d5a45] hover:bg-[#2e4535] text-white text-sm font-bold px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" /> İlk Kitabı Ekle
            </button>
          )}
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
          {filtered.map((book, i) => (
            <BookCard
              key={book.id}
              book={book}
              index={i}
              onEdit={() => openEdit(book)}
              onDelete={() => deleteBook(book.id)}
              onUpdatePage={(page) =>
                updateBook(book.id, {
                  lastReadPage: page,
                  isCompleted: page >= book.totalPages && book.totalPages > 0,
                })
              }
              onToggleComplete={() =>
                updateBook(book.id, {
                  isCompleted: !book.isCompleted,
                  lastReadPage: !book.isCompleted ? book.totalPages : book.lastReadPage,
                })
              }
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <BookFormModal
            initial={editingBook}
            onSave={handleSave}
            onClose={() => { setShowModal(false); setEditingBook(null); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
