import React, { useState } from 'react';
import { Recipe } from '../types';
import { BookOpen, Search, Baby, Clock, Flame, ShoppingCart, Check, X, Plus, Trash2, UtensilsCrossed } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RecipesTabProps {
  recipes: Recipe[];
  openRecipeModal: (recipe: Recipe) => void;
  selectedRecipe: Recipe | null;
  closeRecipeModal: () => void;
  addShoppingItem?: (title: string, category: string) => void;
  addRecipe?: (recipe: Omit<Recipe, 'id'>) => void;
  deleteRecipe?: (id: string) => void;
}

export const RecipesTab: React.FC<RecipesTabProps> = ({
  recipes,
  openRecipeModal,
  selectedRecipe,
  closeRecipeModal,
  addShoppingItem,
  addRecipe,
  deleteRecipe,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [addedIngredients, setAddedIngredients] = useState<string[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // New Recipe Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<Recipe['category']>('Kahvaltı');
  const [newPrepTime, setNewPrepTime] = useState('15 dk');
  const [newCalories, setNewCalories] = useState(250);
  const [newProtein, setNewProtein] = useState(15);
  const [newCarbs, setNewCarbs] = useState(20);
  const [newFat, setNewFat] = useState(10);
  const [newIngredients, setNewIngredients] = useState('');
  const [newInstructions, setNewInstructions] = useState('');
  const [newIsNursing, setNewIsNursing] = useState(true);

  const categories = ['Tümü', 'Kahvaltı', 'Ana yemek', 'Ara öğün', 'Tatlı', 'İçecek'];

  const filteredRecipes = recipes.filter((r) => {
    const matchesCat = selectedCategory === 'Tümü' || r.category === selectedCategory;
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.ingredients.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleAddIngredient = (ing: string) => {
    if (addShoppingItem) {
      addShoppingItem(ing, 'Tarif');
    }
    setAddedIngredients((prev) => [...prev, ing]);
  };

  const handleAddAllIngredients = (ingredients: string[]) => {
    ingredients.forEach((ing) => {
      if (!addedIngredients.includes(ing)) {
        if (addShoppingItem) {
          addShoppingItem(ing, 'Tarif');
        }
      }
    });
    setAddedIngredients((prev) => Array.from(new Set([...prev, ...ingredients])));
  };

  const handleCreateRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !addRecipe) return;

    const ingList = newIngredients.split('\n').map(i => i.trim()).filter(Boolean);
    const instList = newInstructions.split('\n').map(i => i.trim()).filter(Boolean);

    addRecipe({
      title: newTitle.trim(),
      category: newCategory,
      prepTime: newPrepTime,
      calories: Number(newCalories) || 200,
      protein: Number(newProtein) || 10,
      carbs: Number(newCarbs) || 20,
      fat: Number(newFat) || 8,
      ingredients: ingList.length > 0 ? ingList : ['Özel Malzeme'],
      instructions: instList.length > 0 ? instList : ['Tarif adımlarınızı takip ederek hazırlayın.'],
      isNursingFriendly: newIsNursing,
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=80',
    });

    setNewTitle('');
    setNewIngredients('');
    setNewInstructions('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e5e0d5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-[#f07052] font-bold text-xs uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Sağlıklı, Lezzetli & Pratik Mutfak</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#2e4033] tracking-tight">Tarif Kütüphanesi</h2>
          <p className="text-[#526356] text-sm mt-0.5">
            Süt dostu, yüksek proteinli ve metabolizma hızlandırıcı özel tarifleriniz.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Add Recipe Button */}
          {addRecipe && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 bg-[#f07052] hover:bg-[#d95a3d] text-white font-bold text-xs rounded-2xl transition-all shadow-xs flex items-center justify-center space-x-2 cursor-pointer shrink-0 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Yeni Tarif Ekle</span>
            </button>
          )}

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#526356] absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Tarif veya malzeme ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#fcfaf7] border border-[#e5e0d5] text-[#2e4033] rounded-2xl text-xs focus:outline-hidden focus:border-[#f07052]"
            />
          </div>
        </div>
      </div>

      {/* Category Pills (Hidden on mobile) */}
      <div className="hidden sm:flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#3d5a45] text-white shadow-xs'
                : 'bg-[#f2f7f3] text-[#3d5a45] hover:bg-[#e2ebd3]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Recipes Grid */}
      {filteredRecipes.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-[#e5e0d5] text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 bg-[#fff2ee] text-[#f07052] rounded-full flex items-center justify-center mx-auto">
            <UtensilsCrossed className="w-8 h-8" />
          </div>
          <h3 className="font-serif font-bold text-xl text-[#2e4033]">Henüz Kayıtlı Tarif Bulunmuyor</h3>
          <p className="text-[#526356] text-sm max-w-md mx-auto">
            Arama kriterlerinizi değiştirebilir veya yukarıdaki formdan yeni bir özel tarif ekleyebilirsiniz.
          </p>
          {addRecipe && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="mt-2 px-6 py-3 bg-[#f07052] hover:bg-[#d95a3d] text-white text-xs font-bold rounded-2xl transition-all shadow-xs inline-flex items-center space-x-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>İlk Tarifini Ekle</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <motion.div
              key={recipe.id}
              whileHover={{ y: -4 }}
              className="bg-white rounded-3xl border border-[#e5e0d5] overflow-hidden shadow-xs flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=80';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-[#2e4033]/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                      {recipe.category}
                    </span>
                    {recipe.isNursingFriendly && (
                      <span className="bg-[#f07052] text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center shadow-xs">
                        <Baby className="w-3 h-3 mr-1" />
                        Süt Dostu
                      </span>
                    )}
                  </div>
                  {deleteRecipe && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteRecipe(recipe.id);
                      }}
                      className="absolute top-3 right-3 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors cursor-pointer"
                      title="Tarifi Sil"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="font-serif font-bold text-base text-[#2e4033] line-clamp-1">{recipe.title}</h3>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-[#526356] font-medium">
                    <span className="flex items-center">
                      <Flame className="w-3.5 h-3.5 mr-1 text-[#f07052]" />
                      {recipe.calories} kcal
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1 text-[#3d5a45]" />
                      {recipe.prepTime}
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2">
                <button
                  onClick={() => openRecipeModal(recipe)}
                  className="w-full py-2.5 bg-[#f2f7f3] hover:bg-[#e2ebd3] text-[#3d5a45] font-bold text-xs rounded-2xl transition-colors text-center cursor-pointer"
                >
                  Tarifi İncele & Hazırla
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add Recipe Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2e4033]/60 backdrop-blur-xs cursor-pointer">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-xl border border-[#e5e0d5] relative max-h-[90vh] overflow-y-auto cursor-default custom-scrollbar"
            >
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#f2f7f3] text-[#2e4033] hover:bg-[#e2ebd3] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="font-serif font-bold text-xl text-[#2e4033] mb-4">Yeni Tarif Ekle</h3>

              <form onSubmit={handleCreateRecipe} className="space-y-4 text-xs text-[#2e4033]">
                <div>
                  <label className="font-bold block mb-1">Tarif Başlığı</label>
                  <input
                    type="text"
                    placeholder="Örn: Yulaflı Süt Arttırıcı Kurabiye"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full p-3 bg-[#fcfaf7] border border-[#e5e0d5] rounded-xl focus:outline-hidden focus:border-[#f07052]"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold block mb-1">Kategori</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full p-3 bg-[#fcfaf7] border border-[#e5e0d5] rounded-xl text-[#2e4033] focus:outline-hidden focus:border-[#f07052]"
                    >
                      <option value="Kahvaltı">Kahvaltı</option>
                      <option value="Ana yemek">Ana yemek</option>
                      <option value="Ara öğün">Ara öğün</option>
                      <option value="Tatlı">Tatlı</option>
                      <option value="İçecek">İçecek</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold block mb-1">Hazırlık Süresi</label>
                    <input
                      type="text"
                      placeholder="Örn: 20 dk"
                      value={newPrepTime}
                      onChange={(e) => setNewPrepTime(e.target.value)}
                      className="w-full p-3 bg-[#fcfaf7] border border-[#e5e0d5] rounded-xl focus:outline-hidden focus:border-[#f07052]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <div>
                    <label className="font-bold block mb-1">Kalori</label>
                    <input
                      type="number"
                      value={newCalories}
                      onChange={(e) => setNewCalories(Number(e.target.value))}
                      className="w-full p-2.5 bg-[#fcfaf7] border border-[#e5e0d5] rounded-xl focus:outline-hidden focus:border-[#f07052]"
                    />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Protein (g)</label>
                    <input
                      type="number"
                      value={newProtein}
                      onChange={(e) => setNewProtein(Number(e.target.value))}
                      className="w-full p-2.5 bg-[#fcfaf7] border border-[#e5e0d5] rounded-xl focus:outline-hidden focus:border-[#f07052]"
                    />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Karb (g)</label>
                    <input
                      type="number"
                      value={newCarbs}
                      onChange={(e) => setNewCarbs(Number(e.target.value))}
                      className="w-full p-2.5 bg-[#fcfaf7] border border-[#e5e0d5] rounded-xl focus:outline-hidden focus:border-[#f07052]"
                    />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Yağ (g)</label>
                    <input
                      type="number"
                      value={newFat}
                      onChange={(e) => setNewFat(Number(e.target.value))}
                      className="w-full p-2.5 bg-[#fcfaf7] border border-[#e5e0d5] rounded-xl focus:outline-hidden focus:border-[#f07052]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold block mb-1">Malzemeler (Her satıra bir tane)</label>
                  <textarea
                    rows={3}
                    placeholder="1 su bardağı yulaf&#10;1 yemek kaşığı tahin&#10;1 adet muz"
                    value={newIngredients}
                    onChange={(e) => setNewIngredients(e.target.value)}
                    className="w-full p-3 bg-[#fcfaf7] border border-[#e5e0d5] rounded-xl focus:outline-hidden focus:border-[#f07052]"
                  ></textarea>
                </div>

                <div>
                  <label className="font-bold block mb-1">Hazırlanış Adımları (Her satıra bir adım)</label>
                  <textarea
                    rows={3}
                    placeholder="Muzları ezin ve yulafla karıştırın.&#10;Fırında 180 derecede 15 dakika pişirin."
                    value={newInstructions}
                    onChange={(e) => setNewInstructions(e.target.value)}
                    className="w-full p-3 bg-[#fcfaf7] border border-[#e5e0d5] rounded-xl focus:outline-hidden focus:border-[#f07052]"
                  ></textarea>
                </div>

                <div className="flex items-center space-x-2 pt-1">
                  <input
                    type="checkbox"
                    id="nursingCheck"
                    checked={newIsNursing}
                    onChange={(e) => setNewIsNursing(e.target.checked)}
                    className="w-4 h-4 text-[#f07052] accent-[#f07052] rounded-xs cursor-pointer"
                  />
                  <label htmlFor="nursingCheck" className="font-semibold cursor-pointer">
                    Emziren Anne Dostu Tarifi mi?
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#f07052] hover:bg-[#d95a3d] text-white font-bold text-xs rounded-2xl transition-all shadow-xs mt-2 cursor-pointer"
                >
                  Tarifi Kaydet
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
