import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShoppingCart, Heart, Milk, ChevronRight, Store } from 'lucide-react';
import { ActivePage } from '../types';

interface HeaderProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  cartCount: number;
  onOpenCart: () => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
}

export default function Header({
  activePage,
  setActivePage,
  cartCount,
  onOpenCart,
  favoritesCount,
  onOpenFavorites
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', value: 'home' as ActivePage },
    { label: 'About Us', value: 'about' as ActivePage },
    { label: 'Our Model', value: 'ourmodel' as ActivePage },
    { label: 'Services', value: 'services' as ActivePage },
    { label: 'Sourcing Map', value: 'webmap' as ActivePage },
    { label: 'Dairy Insights', value: 'blog' as ActivePage },
    { label: 'Contact Us', value: 'contact' as ActivePage }
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Dynamic Top Announcement Ticker */}
      <div className="bg-milk-900 text-milk-50 py-1.5 px-4 text-center text-xs font-medium tracking-wide">
        <div className="flex justify-center items-center gap-6 overflow-hidden whitespace-nowrap animate-marquee">
          <span className="flex items-center gap-1.5 shrink-0 select-none">
            <span className="text-butter-300">🌿</span> 100% Certified Organic & Humane Dairy
          </span>
          <span className="hidden md:inline text-milk-300 select-none">•</span>
          <span className="flex items-center gap-1.5 shrink-0 select-none">
            <span className="text-butter-300">🥛</span> Premium Bulk Milk Sourcing Solutions
          </span>
          <span className="hidden md:inline text-milk-300 select-none">•</span>
          <span className="flex items-center gap-1.5 shrink-0 select-none">
            <span className="text-butter-300">⭐</span> Trusted across businesses in India
          </span>
        </div>
      </div>

      {/* Main Bar with Glassmorphism */}
      <nav className="w-full bg-white/80 backdrop-blur-md border-b border-milk-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            
            {/* Logo Part */}
            <div 
              onClick={() => { setActivePage('home'); setMobileMenuOpen(false); }}
              className="flex items-center gap-2.5 cursor-pointer group"
              id="header-logo-container"
            >
              <div className="relative w-10 h-10 rounded-xl bg-milk-800 text-white flex items-center justify-center shadow-lg shadow-milk-950/10 transition-transform group-hover:scale-105">
                <Milk className="w-5 h-5 text-butter-300 group-hover:rotate-12 transition-transform" />
                <motion.div 
                  className="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full bg-orange-400"
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                />
              </div>
              <div>
                <span className="font-display font-bold text-xl tracking-tight text-milk-900 block leading-tight">
                  Milk<span className="text-milk-500">Rise</span>
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-milk-600 block -mt-0.5 font-medium">
                  Organic Bulk Supplier
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-1.5 lg:space-x-2" id="header-desktop-nav">
              {navItems.map((item) => {
                const isActive = activePage === item.value;
                return (
                  <button
                    key={item.value}
                    onClick={() => setActivePage(item.value)}
                    className={`relative px-4 py-2 rounded-full font-display text-sm font-medium transition-all duration-200 capitalize ${
                      isActive 
                        ? 'text-white' 
                        : 'text-milk-800 hover:text-milk-900 hover:bg-milk-50'
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        className="absolute inset-0 bg-milk-800 rounded-full shadow-md shadow-milk-800/10"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Shopping & Favorites Actions */}
            <div className="flex items-center gap-3">
              {/* Favorites Button */}
              <button
                onClick={onOpenFavorites}
                className="relative p-2.5 rounded-full text-milk-800 hover:text-rose-600 hover:bg-rose-50 transition-colors focus:outline-none"
                aria-label="Favorites"
                id="header-favorites-btn"
              >
                <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
                <AnimatePresence>
                  {favoritesCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-1 right-1 w-5 h-5 bg-rose-500 text-white font-mono text-[10px] font-bold flex items-center justify-center rounded-full border border-white"
                    >
                      {favoritesCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Cart Button */}
              <button
                onClick={onOpenCart}
                className="relative p-2.5 rounded-full text-milk-800 hover:text-milk-600 hover:bg-milk-50 transition-colors focus:outline-none"
                aria-label="Cart"
                id="header-cart-btn"
              >
                <ShoppingCart className="w-5 h-5" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-1 right-1 w-5 h-5 bg-butter-500 text-white font-mono text-[10px] font-bold flex items-center justify-center rounded-full border border-white"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Store Locator Link Accent */}
              <button 
                onClick={() => setActivePage('contact')}
                className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-50 text-butter-600 border border-orange-100 hover:bg-orange-100 transition-colors text-xs font-medium font-mono"
              >
                <Store className="w-3.5 h-3.5" />
                BROOKVALE HQ
              </button>

              {/* Mobile Burger Trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-milk-800 hover:bg-milk-50 focus:outline-none transition-colors ml-1"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-milk-50 bg-white shadow-inner overflow-hidden"
            >
              <div className="px-4 pt-2.5 pb-6 space-y-2">
                {navItems.map((item) => {
                  const isActive = activePage === item.value;
                  return (
                    <button
                      key={item.value}
                      onClick={() => {
                        setActivePage(item.value);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left font-display text-base font-semibold transition-all ${
                        isActive
                          ? 'bg-milk-800 text-white'
                          : 'text-milk-800 hover:bg-milk-50 hover:pl-6'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-butter-300 translate-x-1' : 'text-milk-400'}`} />
                    </button>
                  );
                })}
                <div className="pt-4 mt-2 border-t border-milk-100 flex flex-col gap-2">
                  <div className="flex justify-between items-center p-3 rounded-xl bg-milk-50/50">
                    <span className="text-xs text-milk-600 font-mono">Store Hours: Open 8am-6pm</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
