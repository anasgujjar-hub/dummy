import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Map, 
  ShoppingBag, 
  Phone, 
  MessageSquare, 
  ChevronUp, 
  Sparkles, 
  X,
  Plus,
  Compass,
  FileText
} from 'lucide-react';
import { ActivePage } from '../types';

interface MobileQuickBarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export default function MobileQuickBar({
  activePage,
  setActivePage,
  cartCount,
  onOpenCart
}: MobileQuickBarProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [speedDialOpen, setSpeedDialOpen] = useState(false);
  const [showCallNotice, setShowCallNotice] = useState(false);

  // Handle showing scroll button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Nav items layout for the mobile-only sticky bottom bar
  const bottomNavItems = [
    { label: 'Home', icon: Home, value: 'home' as ActivePage },
    { label: 'Map', icon: Map, value: 'webmap' as ActivePage },
    { label: 'Services', icon: Compass, value: 'services' as ActivePage },
    { label: 'Contact', icon: Phone, value: 'contact' as ActivePage }
  ];

  const handleBottomNavClick = (value: ActivePage) => {
    setActivePage(value);
    setSpeedDialOpen(false);
  };

  return (
    <>
      {/* 1. MOBILE-ONLY BOTTOM STICKY NAVIGATION BAR */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-lg border-t border-milk-100 shadow-[0_-8px_30px_rgb(14,47,38,0.06)] pb-safe md:hidden transition-all duration-300"
        id="mobile-sticky-bottom-nav"
      >
        <div className="grid grid-cols-5 items-center justify-between h-16 px-2">
          {/* Map first 3 bottom navigation tabs */}
          {bottomNavItems.map((item) => {
            const isActive = activePage === item.value;
            const Icon = item.icon;
            return (
              <button
                key={item.value}
                onClick={() => handleBottomNavClick(item.value)}
                className="flex flex-col items-center justify-center gap-1 w-full h-full text-center transition-colors relative"
                style={{ minHeight: '44px' }}
                aria-label={item.label}
              >
                <div className={`p-1.5 rounded-full transition-all duration-200 ${
                  isActive 
                    ? 'bg-milk-900 text-butter-300 scale-110' 
                    : 'text-milk-600 hover:text-milk-900'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-display font-semibold tracking-tight transition-colors ${
                  isActive ? 'text-milk-900 font-bold' : 'text-milk-500'
                }`}>
                  {item.label}
                </span>
                
                {/* Active indicator dot */}
                {isActive && (
                  <motion.div 
                    layoutId="mobileActiveDot"
                    className="absolute bottom-1 w-1 h-1 rounded-full bg-butter-500"
                  />
                )}
              </button>
            );
          })}

          {/* Special optimized Mobile Cart Tab */}
          <button
            onClick={() => {
              onOpenCart();
              setSpeedDialOpen(false);
            }}
            className="flex flex-col items-center justify-center gap-1 w-full h-full text-center transition-colors relative"
            style={{ minHeight: '44px' }}
            aria-label="View Cart"
            id="mobile-nav-cart-btn"
          >
            <div className="p-1.5 rounded-full text-milk-600 hover:text-milk-900 relative">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-butter-500 text-white font-mono text-[9px] font-extrabold rounded-full flex items-center justify-center border border-white animate-bounce">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-display font-semibold tracking-tight text-milk-500">
              Cart
            </span>
          </button>
        </div>
      </div>

      {/* 2. FLOATING MULTI-ACTION SPEED DIAL & SCROLL ASSIST (Optimized positions for thumb-reach) */}
      <div 
        className="fixed bottom-20 right-4 z-50 flex flex-col items-center gap-3 md:bottom-6"
        id="mobile-floating-actions-container"
      >
        {/* Back to Top Assistant */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-white border border-milk-100 text-milk-800 flex items-center justify-center shadow-lg hover:bg-milk-50 active:scale-95 transition-all"
              aria-label="Scroll back to top"
              id="back-to-top-btn"
            >
              <ChevronUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Dynamic Mobile Helpline Speed Dial */}
        <div className="relative flex flex-col items-center">
          
          {/* Subordinated actions */}
          <AnimatePresence>
            {speedDialOpen && (
              <div className="absolute bottom-14 flex flex-col items-center gap-2.5 mb-1">
                
                {/* Simulated Sourcing Inquiry Form Button */}
                <motion.button
                  initial={{ opacity: 0, y: 15, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.8 }}
                  onClick={() => {
                    handleBottomNavClick('contact');
                    setSpeedDialOpen(false);
                  }}
                  className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white text-milk-900 border border-milk-100 shadow-xl font-display font-bold text-xs whitespace-nowrap active:scale-95 transition-transform"
                >
                  <FileText className="w-4 h-4 text-amber-600" />
                  Get B2B Quote
                </motion.button>

                {/* Sourcing WhatsApp Helpline */}
                <motion.a
                  initial={{ opacity: 0, y: 15, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.8 }}
                  transition={{ delay: 0.05 }}
                  href="https://wa.me/919999999999?text=Hello%20Milk%20Rush,%20I%20am%20interested%20in%20your%20organic%20bulk%20milk%20sourcing%20solutions."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-emerald-600 text-white shadow-xl font-display font-bold text-xs whitespace-nowrap active:scale-95 transition-transform"
                >
                  <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
                  WhatsApp Sourcing
                </motion.a>

                {/* Direct Dial Helpline */}
                <motion.a
                  initial={{ opacity: 0, y: 15, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.8 }}
                  transition={{ delay: 0.1 }}
                  href="tel:+919999999999"
                  className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-butter-500 text-milk-950 shadow-xl font-display font-bold text-xs whitespace-nowrap active:scale-95 transition-transform"
                >
                  <Phone className="w-4 h-4 fill-current" />
                  Call Hotline
                </motion.a>

              </div>
            )}
          </AnimatePresence>

          {/* Sourcing Helpline Main Floating Action Button */}
          <motion.button
            onClick={() => setSpeedDialOpen(!speedDialOpen)}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-105 active:scale-95 transition-transform ${
              speedDialOpen ? 'bg-milk-950' : 'bg-milk-800'
            }`}
            aria-label="Sourcing Helpline Panel"
            id="mobile-speed-dial-trigger"
          >
            {speedDialOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <div className="relative">
                <Sparkles className="w-5 h-5 text-butter-300 animate-pulse" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500" />
              </div>
            )}
          </motion.button>

        </div>

      </div>

      {/* 3. SUBTLE TOUCH GESTURES OVERLAY / LANDING DISPATCH PROMPT */}
      <AnimatePresence>
        {showCallNotice && (
          <div className="fixed inset-x-4 top-20 z-50 bg-white border border-milk-100 rounded-2xl shadow-2xl p-4 flex gap-3 max-w-sm mx-auto md:hidden">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-butter-600 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div className="flex-grow">
              <h4 className="font-display font-bold text-sm text-milk-900">Need Bulk Pricing?</h4>
              <p className="text-xs text-milk-500 font-light mt-0.5">Dial our live dispatch and cold storage experts instantly.</p>
              <div className="flex gap-2 mt-2.5">
                <a 
                  href="tel:+919999999999" 
                  className="px-3.5 py-1.5 rounded-lg bg-milk-900 text-white font-mono text-[10px] font-bold"
                >
                  Call Now
                </a>
                <button 
                  onClick={() => setShowCallNotice(false)} 
                  className="px-3.5 py-1.5 rounded-lg bg-milk-100 text-milk-600 font-mono text-[10px] font-bold"
                >
                  Dismiss
                </button>
              </div>
            </div>
            <button 
              onClick={() => setShowCallNotice(false)} 
              className="text-milk-400 hover:text-milk-600 shrink-0 h-fit"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
