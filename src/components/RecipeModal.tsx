import React, { useState } from 'react';
import { Recipe } from '../types';
import { Baby, X, ShoppingCart, Check, Plus, Flame, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RecipeModalProps {
  selectedRecipe: Recipe | null;
  closeRecipeModal: () => void;
  addShoppingItem?: (title: string, category: string) => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({
  selectedRecipe,
  closeRecipeModal,
  addShoppingItem,
}) => {
  const [addedIngredients, setAddedIngredients] = useState<string[]>([]);

  if (!selectedRecipe) return null;

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

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2e4033]/60 backdrop-blur-xs cursor-pointer"
        onClick={closeRecipeModal}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-[#e5e0d5] relative cursor-default custom-scrollbar"
        >
          <button
            onClick={closeRecipeModal}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#f2f7f3] text-[#2e4033] hover:bg-[#e2ebd3] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <span className="bg-[#f2f7f3] text-[#2e4033] text-xs font-bold px-3 py-1 rounded-full uppercase">
                {selectedRecipe.category}
              </span>
              {selectedRecipe.isNursingFriendly && (
                <span className="bg-[#fff2ee] text-[#f07052] border border-[#ffdbd2] text-xs font-bold px-3 py-1 rounded-full flex items-center">
                  <Baby className="w-3.5 h-3.5 mr-1" />
                  Süt Dostu
                </span>
              )}
            </div>

            <h2 className="text-2xl font-serif font-bold text-[#2e4033]">{selectedRecipe.title}</h2>

            {/* Macro summary row */}
            <div className="grid grid-cols-4 gap-2 bg-[#fcfaf7] p-4 rounded-2xl border border-[#e5e0d5] text-center">
              <div>
                <span className="text-[10px] text-[#526356] uppercase font-bold block">Kalori</span>
                <span className="text-sm font-serif font-bold text-[#2e4033]">{selectedRecipe.calories} kcal</span>
              </div>
              <div>
                <span className="text-[10px] text-[#526356] uppercase font-bold block">Protein</span>
                <span className="text-sm font-serif font-bold text-[#2e4033]">{selectedRecipe.protein}g</span>
              </div>
              <div>
                <span className="text-[10px] text-[#526356] uppercase font-bold block">Karb</span>
                <span className="text-sm font-serif font-bold text-[#2e4033]">{selectedRecipe.carbs}g</span>
              </div>
              <div>
                <span className="text-[10px] text-[#526356] uppercase font-bold block">Yağ</span>
                <span className="text-sm font-serif font-bold text-[#2e4033]">{selectedRecipe.fat}g</span>
              </div>
            </div>

            {/* Ingredients section */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h4 className="font-serif font-bold text-[#2e4033] text-base">Malzemeler</h4>
                {addShoppingItem && (
                  <button
                    onClick={() => handleAddAllIngredients(selectedRecipe.ingredients)}
                    className="text-xs font-bold text-[#f07052] hover:text-[#d95a3d] bg-[#fff2ee] border border-[#ffdbd2] px-3 py-1.5 rounded-xl transition-colors flex items-center space-x-1.5 cursor-pointer self-start sm:self-auto"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Tümünü Alışveriş Listesine Ekle</span>
                  </button>
                )}
              </div>

              <ul className="space-y-2">
                {selectedRecipe.ingredients.map((ing, idx) => {
                  const isAdded = addedIngredients.includes(ing);
                  return (
                    <li key={idx} className="flex items-center justify-between p-2.5 bg-[#fcfaf7] rounded-xl border border-[#e5e0d5]">
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-[#f07052] shrink-0" />
                        <span className="text-xs font-semibold text-[#2e4033]">{ing}</span>
                      </div>
                      {addShoppingItem && (
                        <button
                          onClick={() => handleAddIngredient(ing)}
                          disabled={isAdded}
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-colors flex items-center space-x-1 cursor-pointer ${
                            isAdded
                              ? 'bg-[#eaf4eb] text-[#3d5a45] cursor-default'
                              : 'bg-[#fff2ee] text-[#f07052] hover:bg-[#ffe5de]'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#3d5a45]" />
                              <span>Eklendi</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Listeye Ekle</span>
                            </>
                          )}
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Instructions section */}
            <div>
              <h4 className="font-serif font-bold text-[#2e4033] text-base mb-3">Hazırlanışı</h4>
              <ol className="space-y-3">
                {selectedRecipe.instructions.map((step, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-xs leading-relaxed text-[#2e4033]">
                    <span className="w-6 h-6 rounded-full bg-[#3d5a45] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="pt-0.5">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
