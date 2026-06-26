import React from 'react';
import { Milk, Mail, Phone, MapPin, Heart, Shield, Landmark } from 'lucide-react';
import { ActivePage } from '../types';

interface FooterProps {
  setActivePage: (page: ActivePage) => void;
  activePage: ActivePage;
}

export default function Footer({ setActivePage, activePage }: FooterProps) {
  
  const links = [
    { label: 'Home Page', value: 'home' as ActivePage },
    { label: 'About Us', value: 'about' as ActivePage },
    { label: 'Our Model', value: 'ourmodel' as ActivePage },
    { label: 'Services', value: 'services' as ActivePage },
    { label: 'Sourcing Map', value: 'webmap' as ActivePage },
    { label: 'Dairy Insights', value: 'blog' as ActivePage },
    { label: 'Contact Us', value: 'contact' as ActivePage }
  ];

  return (
    <footer className="bg-milk-950 text-white border-t border-milk-900 pt-16 pb-8" id="footer-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper footer grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-milk-900">
          
          {/* Logo & Tagline column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5" id="footer-logo">
              <div className="w-9 h-9 rounded-xl bg-white text-milk-950 flex items-center justify-center">
                <Milk className="w-4 h-4 text-butter-600 fill-butter-600" />
              </div>
              <span className="font-display font-bold text-lg tracking-tight">
                Milk<span className="text-butter-300">Rush</span>
              </span>
            </div>
            <p className="text-xs text-milk-300 max-w-sm font-light leading-relaxed">
              Premium certified organic and humane bulk milk supplier. Committed to unmatched animal welfare standards and a completely traceable dairy supply chain across India.
            </p>
            <div className="text-sm font-medium text-butter-300 italic font-display">
              "Milk Rush - Caring for Cows. Delivering Purity."
            </div>
          </div>

          {/* Quick link selectors column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-milk-400">Site Atlas</h4>
            <ul className="space-y-2 text-xs font-medium">
              {links.map((lnk) => (
                <li key={lnk.value}>
                  <button
                    onClick={() => {
                      setActivePage(lnk.value);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`hover:text-butter-300 transition-colors text-left ${activePage === lnk.value ? 'text-butter-300' : 'text-milk-200'}`}
                  >
                    • {lnk.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Coordinates column */}
          <div className="md:col-span-4 space-y-4 text-xs font-light text-milk-200">
            <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#a8b7b2]">Local Hub</h4>
            <ul className="space-y-3">
              <li className="flex gap-2">
                <MapPin className="w-4 h-4 text-butter-500 shrink-0" />
                <span>Sector 62, Dairy Logistics Gate 4, Noida, UP, India</span>
              </li>
              <li className="flex gap-2">
                <Phone className="w-4 h-4 text-butter-500 shrink-0" />
                <span className="font-mono">+91 98712 34567</span>
              </li>
              <li className="flex gap-2">
                <Mail className="w-4 h-4 text-butter-500 shrink-0" />
                <span className="font-mono">bulk@milkrush.in</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower footer copyright summary */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-milk-400 font-mono">
          <div>
            © 2026 Milk Rush Bulk Sourcing. All organic rights pristine.
          </div>
          <div className="flex gap-4 items-center">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" /> Humane Certified
            </span>
            <span className="flex items-center gap-1">
              <Landmark className="w-3.5 h-3.5" /> India Dairy Alliance
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
