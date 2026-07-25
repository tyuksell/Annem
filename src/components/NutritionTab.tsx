import React, { useState } from 'react';
import { Recipe, ShoppingItem, UserProfile } from '../types';
import { 
  Utensils, 
  Baby, 
  ShoppingCart, 
  Plus, 
  Check, 
  Trash2, 
  Flame, 
  HeartHandshake, 
  Sparkles,
  Apple,
  Info
} from 'lucide-react';
import { motion } from 'motion/react';

interface NutritionTabProps {
  recipes: Recipe[];
  userProfile: UserProfile;
  shoppingList: ShoppingItem[];
  toggleShoppingItem: (id: string) => void;
  addShoppingItem: (title: string, category: string) => void;
  deleteShoppingItem: (id: string) => void;
  openRecipeModal: (recipe: Recipe) => void;
}

export const NutritionTab: React.FC<NutritionTabProps> = ({
  recipes,
  userProfile,
  shoppingList,
  toggleShoppingItem,
  addShoppingItem,
  deleteShoppingItem,
  openRecipeModal,
}) => {
  const [newShopTitle, setNewShopTitle] = useState('');
  const [activeSubTab, setActiveSubTab] = useState<'menu' | 'nursing' | 'shopping'>('menu');

  const handleAddShop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newShopTitle.trim()) return;
    addShoppingItem(newShopTitle.trim(), 'Diğer');
    setNewShopTitle('');
  };

  // Nursing Mother friendly tips
  const nursingTips = [
    { title: 'Bol Sıvı & Su', desc: 'Sütün %87’si sudan oluşur. Her emzirme seansı öncesinde ve sonrasında 1 büyük bardak su için.', icon: '💧' },
    { title: 'Yulaf Ezmesi & Kalsiyum', desc: 'Yulaf, prolaktin hormonunu tetikleyerek anne sütü salgılanmasını doğal yolla artırır.', icon: '🥣' },
    { title: 'Çiğ Ceviz & Badem', desc: 'Sağlıklı Omega-3 yağ asitleri bebeğin beyin gelişimini ve sütün besleyiciliğini yükseltir.', icon: '🥜' },
    { title: 'Rezene & Anason', desc: 'Bebeğin gaz sancısını azaltır, annenin sindirimini ve süt bezlerini rahatlatır.', icon: '🌿' },
    { title: 'Dereotu & Taze Yeşillik', desc: 'Günlük taze tabağınıza dereotu eklemek kalsiyum ve fitoöstrojen deposudur.', icon: '🥬' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#e5e0d5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#f07052] font-bold text-xs uppercase tracking-wider mb-1">
            <Utensils className="w-4 h-4" />
            <span>Sağlıklı & Besleyici Anne Menüleri</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#2e4033] tracking-tight">Beslenme & Alışveriş Rehberi</h2>
          <p className="text-[#526356] text-sm mt-0.5">
            Süt kalitesini düşürmeden, enerjik kalarak kilo verme sistemi.
          </p>
        </div>

        {/* Calorie Goal Summary Badge */}
        <div className="flex items-center space-x-3 bg-[#fff2ee] border border-[#ffdbd2] px-4 py-3 rounded-2xl">
          <div className="p-2 bg-[#f07052] text-white rounded-xl shadow-xs">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-[#f07052] font-bold block">Günlük Hedef Kalori</span>
            <span className="text-lg font-serif font-bold text-[#2e4033]">{userProfile.dailyCalorieTarget} kcal</span>
          </div>
        </div>
      </div>

      {/* Sub Tabs Navigation */}
      <div className="flex space-x-2 border-b border-[#e5e0d5] pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveSubTab('menu')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'menu'
              ? 'bg-[#3d5a45] text-white shadow-xs'
              : 'bg-[#f2f7f3] text-[#3d5a45] hover:bg-[#e2ebd3]'
          }`}
        >
          Günlük Örnek Menüler
        </button>
        <button
          onClick={() => setActiveSubTab('nursing')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
            activeSubTab === 'nursing'
              ? 'bg-[#3d5a45] text-white shadow-xs'
              : 'bg-[#f2f7f3] text-[#3d5a45] hover:bg-[#e2ebd3]'
          }`}
        >
          <Baby className="w-4 h-4 text-[#f07052]" />
          <span>Emziren Anneye Özel Öneriler</span>
        </button>
        <button
          onClick={() => setActiveSubTab('shopping')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
            activeSubTab === 'shopping'
              ? 'bg-[#3d5a45] text-white shadow-xs'
              : 'bg-[#f2f7f3] text-[#3d5a45] hover:bg-[#e2ebd3]'
          }`}
        >
          <ShoppingCart className="w-4 h-4 text-[#3d5a45]" />
          <span>Alışveriş Listesi</span>
        </button>
      </div>

      {/* Content for Sample Daily Menus */}
      {activeSubTab === 'menu' && (
        <div className="space-y-6">
          <div className="bg-[#3d5a45] text-white p-5 rounded-2xl shadow-xs flex items-start space-x-4 border border-[#2e4535]">
            <Info className="w-6 h-6 shrink-0 mt-0.5 text-[#ff8a70]" />
            <div>
              <h4 className="font-serif font-bold text-sm text-white">Annem Beslenme İlkesi</h4>
              <p className="text-xs text-[#e2ebd3] mt-1 leading-relaxed">
                Şok diyetler süt miktarını azaltır. Aşağıdaki dengeli menü proteini, kompleks karbonhidratı ve sağlıklı yağları tam oranında sunar.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recipes.slice(0, 4).map((recipe) => (
              <motion.div
                key={recipe.id}
                whileHover={{ y: -3 }}
                className="bg-white rounded-3xl border border-[#e5e0d5] overflow-hidden shadow-xs flex flex-col justify-between"
              >
                <div className="flex">
                  <img 
                    src={recipe.image} 
                    alt={recipe.title} 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=80';
                    }}
                    className="w-28 h-28 object-cover shrink-0" 
                  />
                  <div className="p-3.5 flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold bg-[#eaf4eb] text-[#3d5a45] px-2 py-0.5 rounded-md">
                        {recipe.category}
                      </span>
                      {recipe.isNursingFriendly && (
                        <span className="text-[10px] font-bold bg-[#fff2ee] text-[#f07052] border border-[#ffdbd2] px-2 py-0.5 rounded-md flex items-center">
                          <Baby className="w-3 h-3 mr-1" />
                          Süt Dostu
                        </span>
                      )}
                    </div>
                    <h4 className="font-serif font-bold text-base text-[#2e4033] line-clamp-1">{recipe.title}</h4>
                    <p className="text-xs text-[#526356] mt-1">
                      🔥 {recipe.calories} kcal | 🕒 {recipe.prepTime}
                    </p>
                  </div>
                </div>

                <div className="px-4 py-2 bg-[#fcfaf7] border-t border-[#e5e0d5] flex items-center justify-between">
                  <span className="text-xs text-[#526356] font-medium">
                    Protein: <strong className="text-[#2e4033]">{recipe.protein}g</strong>
                  </span>
                  <button
                    onClick={() => openRecipeModal(recipe)}
                    className="text-xs font-bold text-[#f07052] hover:text-[#3d5a45] cursor-pointer"
                  >
                    Tarifi Oku & Hazırla
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Content for Nursing Mother Suggestions */}
      {activeSubTab === 'nursing' && (
        <div className="space-y-4">
          <div className="bg-[#eaf4eb] border border-[#cbe4cf] p-5 rounded-3xl">
            <div className="flex items-center space-x-3 text-[#2e4033] font-serif font-bold mb-2">
              <Baby className="w-6 h-6 text-[#f07052]" />
              <h3 className="text-lg">Emziren Anne Süt Kalitesi & Miktarı Artırma Rehberi</h3>
            </div>
            <p className="text-xs text-[#526356] leading-relaxed">
              Emzirme süreci günlük yaklaşık 500-700 kalori ekstra enerji harcatır. Aç kalarak değil, doğru ve kaliteli besinleri seçerek kilo veriyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nursingTips.map((tip, idx) => (
              <div key={idx} className="bg-white p-5 rounded-3xl border border-[#e5e0d5] shadow-xs flex items-start space-x-4">
                <span className="text-3xl shrink-0">{tip.icon}</span>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#2e4033]">{tip.title}</h4>
                  <p className="text-xs text-[#526356] mt-1 leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content for Shopping List */}
      {activeSubTab === 'shopping' && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-[#e5e0d5] shadow-xs">
            <h3 className="font-serif font-bold text-base text-[#2e4033] mb-3 flex items-center space-x-2">
              <ShoppingCart className="w-5 h-5 text-[#f07052]" />
              <span>Sağlıklı Mutfak Alışveriş Listesi</span>
            </h3>

            <form onSubmit={handleAddShop} className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Örn: Avokado, Çiğ Badem, Rezene Çayı..."
                value={newShopTitle}
                onChange={(e) => setNewShopTitle(e.target.value)}
                className="flex-1 bg-[#fcfaf7] border border-[#e5e0d5] text-[#2e4033] rounded-xl px-3.5 py-2 text-xs focus:outline-hidden focus:border-[#f07052]"
              />
              <button
                type="submit"
                className="bg-[#f07052] hover:bg-[#d95a3d] text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-xs flex items-center space-x-1 shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Ekle</span>
              </button>
            </form>

            <div className="space-y-2">
              {shoppingList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleShoppingItem(item.id)}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    item.checked
                      ? 'bg-[#f2f7f3] border-[#e5e0d5] text-[#526356] line-through'
                      : 'bg-[#fcfaf7] border-[#e5e0d5] text-[#2e4033] hover:border-[#f07052]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                        item.checked ? 'bg-[#3d5a45] border-[#3d5a45] text-white' : 'border-[#d0dad2] bg-white'
                      }`}
                    >
                      {item.checked && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <span className="text-xs font-semibold">{item.title}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteShoppingItem(item.id);
                    }}
                    className="text-[#526356]/60 hover:text-[#f07052] p-1 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
