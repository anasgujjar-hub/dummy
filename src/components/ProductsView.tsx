import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Milk, Filter, Sparkles, Heart, Info, ChevronRight, Check, Plus, Minus, ArrowUpRight } from 'lucide-react';
import { Product } from '../types';

interface ProductsViewProps {
  products: Product[];
  onQuickAdd: (product: Product, size: string) => void;
  favorites: Product[];
  onToggleFavorite: (product: Product) => void;
  selectedProduct: Product | null;
  onOpenProductDetail: (product: Product) => void;
  onCloseProductDetail: () => void;
}

export default function ProductsView({
  products,
  onQuickAdd,
  favorites,
  onToggleFavorite,
  selectedProduct,
  onOpenProductDetail,
  onToggleFavorite: handleToggleFavoriteParent, // avoid name collision
  onCloseProductDetail
}: ProductsViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Milk' | 'Yogurt' | 'Cheese' | 'Butter' | 'Ice Cream'>('All');
  
  // Modal size and quantity state
  const [modalSize, setModalSize] = useState('');
  const [modalQuantity, setModalQuantity] = useState(1);

  // Sync size when modal opens
  React.useEffect(() => {
    if (selectedProduct) {
      setModalSize(selectedProduct.sizes[0]);
      setModalQuantity(1);
    }
  }, [selectedProduct]);

  const categories = ['All', 'Milk', 'Yogurt', 'Cheese', 'Butter', 'Ice Cream'] as const;

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const categoriesTableData = [
    { cat: 'Milk', desc: 'Fresh, rich, and naturally delicious milk for everyday use.', items: 'Whole Milk, Toned Milk, Skim Milk' },
    { cat: 'Yogurt', desc: 'Smooth and creamy yogurt packed with taste and nutrition.', items: 'Plain Yogurt, Greek Yogurt, Fruit Yogurt' },
    { cat: 'Cheese', desc: 'Crafted for texture, flavor, and versatility.', items: 'Farmhouse Cheese, Cheddar Blocks, Mozzarella' },
    { cat: 'Butter', desc: 'Rich, creamy butter perfect for cooking and baking.', items: 'Salted Butter, Unsalted Butter' },
    { cat: 'Ice Cream', desc: 'Indulgent frozen treats made with premium dairy.', items: 'Vanilla, Chocolate, Strawberry' }
  ];

  return (
    <div className="w-full" id="products-view-container">
      
      {/* Page Title */}
      <section className="bg-milk-900 py-16 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-butter-300 font-bold">The Sourcing Catalog</span>
          <h1 className="font-display font-black text-4xl sm:text-5xl tracking-tight">Farmer & Dairy Services</h1>
          <p className="text-sm font-light text-milk-100 max-w-xl mx-auto leading-relaxed">
            Discover our premium farmer and dairy services, featuring state of the art supply chains for bulk milk and organic products.
          </p>
        </div>
      </section>

      {/* Product Categories Overview Table (From custom user dataset) */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 border-b border-milk-100 pb-4">
            <h2 className="font-display font-bold text-lg text-milk-900 tracking-tight flex items-center gap-2">
              <Info className="w-4 h-4 text-butter-500" />
              Dairy Category Directory
            </h2>
            <p className="text-xs text-milk-500 font-light mt-0.5">Quick lookup table of popular items and descriptions.</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-milk-100 shadow-sm bg-dairy-cream">
            <table className="min-w-full divide-y divide-milk-100 text-left text-xs">
              <thead className="bg-milk-50">
                <tr>
                  <th className="px-6 py-4 font-mono uppercase tracking-wider text-milk-700 font-bold">Category</th>
                  <th className="px-6 py-4 font-mono uppercase tracking-wider text-milk-700 font-bold">Product Description</th>
                  <th className="px-6 py-4 font-mono uppercase tracking-wider text-milk-700 font-bold">Popular Varieties Included</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-milk-50 bg-white">
                {categoriesTableData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-milk-50/40 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-display font-semibold text-milk-900 text-sm">
                      {row.cat}
                    </td>
                    <td className="px-6 py-4 text-milk-600 font-light">
                      {row.desc}
                    </td>
                    <td className="px-6 py-4 text-milk-700 font-medium font-mono">
                      {row.items}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Main filter & catalog list */}
      <section className="py-12 bg-dairy-cream border-t border-milk-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Filter Tab buttons row */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-4 border-b border-milk-100/50">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 rounded-xl font-display text-xs font-semibold uppercase tracking-wider transition-all border ${
                    selectedCategory === cat
                      ? 'bg-milk-850 text-white border-milk-850 shadow'
                      : 'bg-white text-milk-800 border-milk-100 hover:bg-milk-50 hover:border-milk-200'
                  }`}
                >
                  {cat === 'All' ? '🏡 All Catalog' : cat}
                </button>
              ))}
            </div>
            
            <div className="text-[11px] text-milk-500 font-mono tracking-wide">
              Showing <strong>{filteredProducts.length}</strong> items in inventory list
            </div>
          </div>

          {/* Cards Catalogue Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((p) => {
              const isFavorited = favorites.some(fav => fav.id === p.id);
              return (
                <div 
                  key={p.id}
                  className="bg-white rounded-[2rem] border border-milk-100 overflow-hidden shadow-sm flex flex-col justify-between group transition-all hover:-translate-y-1 hover:shadow-md hover:border-milk-200"
                >
                  {/* Photo area with heart absolute */}
                  <div className="relative aspect-video overflow-hidden bg-milk-50 border-b border-milk-100">
                    <img
                      src={p.image}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Floating Heart */}
                    <button
                      onClick={() => handleToggleFavoriteParent(p)}
                      className="absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md bg-white/80 hover:bg-white text-milk-400 hover:text-rose-500 transition-colors border border-milk-50/50 shadow shadow-milk-900/5 active:scale-95"
                      title="Add to Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>

                    <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-milk-950/80 text-white font-mono text-[9px] uppercase tracking-wider">
                      {p.category}
                    </div>
                  </div>

                  {/* Text copy */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display font-extrabold text-lg text-milk-900">{p.name}</h3>
                        <div className="flex items-center gap-0.5 text-butter-500 bg-amber-50 px-2 py-0.5 rounded-md font-mono text-[10px] font-bold">
                          ★ {p.rating}
                        </div>
                      </div>
                      
                      <p className="text-xs text-milk-500 font-light leading-relaxed min-h-[3rem]">
                        {p.description}
                      </p>

                      {/* Small visual items chips for realism */}
                      <div className="py-2">
                        <span className="block text-[8px] uppercase tracking-widest text-milk-400 font-mono mb-1">Includes Varieties:</span>
                        <div className="flex flex-wrap gap-1">
                          {p.popularItems.split(',').map((it, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-md bg-milk-50 text-milk-700 text-[10px] font-mono leading-tight">
                              {it.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Footer price & action button */}
                    <div className="pt-6 border-t border-milk-50/80 flex items-center justify-between mt-6">
                      <div>
                        <span className="text-[10px] text-milk-400 font-mono uppercase tracking-wider block">Standard pack ({p.unit})</span>
                        <span className="font-display font-black text-lg text-milk-850">${p.price.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex gap-1.5 shrink-0">
                        <button
                          onClick={() => onOpenProductDetail(p)}
                          className="p-2.5 rounded-xl border border-milk-200 text-milk-500 hover:bg-milk-50 active:scale-95 transition-all"
                          title="View nutrition specifications"
                        >
                          <Info className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onQuickAdd(p, p.sizes[0])}
                          className="px-4 py-2.5 rounded-xl bg-milk-800 hover:bg-milk-900 text-white font-bold text-xs uppercase tracking-widest active:scale-95 transition-all shadow-sm"
                        >
                          Add to Basket
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. Custom Product Specs Overlay Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={onCloseProductDetail}
              className="fixed inset-0 bg-black z-50 pointer-events-auto"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-x-4 bottom-4 top-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/12 md:-translate-y-1/2 md:w-[640px] md:h-auto bg-dairy-cream rounded-[2.5rem] border border-milk-100 shadow-2xl z-50 overflow-hidden flex flex-col md:flex-row pointer-events-auto"
            >
              {/* Left Column Graphic */}
              <div className="md:w-1/2 relative bg-milk-550 border-r border-milk-100/30">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-48 md:h-full object-cover"
                />
                <button
                  onClick={onCloseProductDetail}
                  className="absolute top-4 left-4 p-2 rounded-full bg-white/80 backdrop-blur-sm text-milk-900 hover:bg-white md:hidden"
                >
                  ✕ Close
                </button>
              </div>

              {/* Right Column Complete Spec content */}
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#a88242] bg-[#f8f0dd] px-2 py-0.5 rounded font-bold">
                      {selectedProduct.category} Catalog Item
                    </span>
                    <button
                      onClick={onCloseProductDetail}
                      className="hidden md:block text-xs font-mono uppercase text-milk-400 hover:text-rose-500 font-bold"
                    >
                      ✕ Close Panel
                    </button>
                  </div>

                  <div>
                    <h3 className="font-display font-black text-2xl text-milk-900 leading-tight">
                      {selectedProduct.name}
                    </h3>
                    <p className="text-xs text-milk-500 font-light mt-1.5 leading-relaxed">
                      {selectedProduct.description}
                    </p>
                  </div>

                  {/* Interactive selector fields for sizing */}
                  <div className="space-y-2.5">
                    <span className="block text-[8px] uppercase tracking-widest text-milk-400 font-mono font-bold">
                      Select Custom Packaging Size:
                    </span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {selectedProduct.sizes.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setModalSize(s)}
                          className={`py-2 px-1 rounded-xl font-sans text-[10px] font-bold border transition-all text-center ${
                            modalSize === s
                              ? 'bg-milk-800 text-white border-milk-850'
                              : 'bg-white text-milk-800 border-milk-100 hover:bg-milk-50'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Certified Lab Nutrition Table (From custom prompt parameters) */}
                  <div className="space-y-2">
                    <span className="block text-[8px] uppercase tracking-widest text-milk-400 font-mono font-bold flex items-center justify-between">
                      <span>Lab Tested Nutritional Profile</span>
                      <span className="font-normal lowercase text-[9px] text-[#2d6f5f]">100g serving density</span>
                    </span>
                    
                    <div className="grid grid-cols-2 gap-2 bg-white rounded-2xl p-3 border border-milk-100 shadow-sm">
                      <div className="flex justify-between items-center text-[10px] border-r border-milk-100 pr-2">
                        <span className="text-milk-500 font-mono">Organic Protein:</span>
                        <strong className="text-milk-800 font-mono">{selectedProduct.specs.protein}</strong>
                      </div>
                      <div className="flex justify-between items-center text-[10px] pl-2">
                        <span className="text-milk-500 font-mono">Active Calcium:</span>
                        <strong className="text-milk-800 font-mono">{selectedProduct.specs.calcium}</strong>
                      </div>
                      <div className="flex justify-between items-center text-[10px] border-r border-milk-100 pr-2 border-t border-milk-50 pt-1.5">
                        <span className="text-milk-500 font-mono">Core Fats:</span>
                        <strong className="text-milk-800 font-mono">{selectedProduct.specs.fat}</strong>
                      </div>
                      <div className="flex justify-between items-center text-[10px] pl-2 border-t border-milk-50 pt-1.5">
                        <span className="text-milk-500 font-mono">Energy Value:</span>
                        <strong className="text-milk-800 font-mono">{selectedProduct.specs.energy}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Confirm actions */}
                <div className="pt-4 border-t border-milk-100 mt-6 flex items-center justify-between gap-4">
                  
                  {/* Quantity selector */}
                  <div className="flex items-center bg-white rounded-xl border border-milk-100 p-1 font-mono shrink-0 shadow-sm">
                    <button
                      onClick={() => setModalQuantity(q => Math.max(1, q - 1))}
                      className="p-1 px-2.5 text-milk-600 hover:bg-milk-50 rounded-lg"
                    >
                      -
                    </button>
                    <span className="px-2 font-display text-xs font-bold text-milk-900">{modalQuantity}</span>
                    <button
                      onClick={() => setModalQuantity(q => q + 1)}
                      className="p-1 px-2.5 text-milk-600 hover:bg-milk-50 rounded-lg"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      for (let index = 0; index < modalQuantity; index++) {
                        onQuickAdd(selectedProduct, modalSize);
                      }
                      onCloseProductDetail();
                    }}
                    className="flex-1 py-3.5 rounded-2xl bg-milk-800 hover:bg-milk-900 text-white font-bold text-xs uppercase tracking-widest active:scale-95 transition-all text-center shadow-lg shadow-milk-800/10"
                  >
                    Lock Into Basket — ${(selectedProduct.price * modalQuantity).toFixed(2)}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
