import React from 'react';
import { motion } from 'motion/react';
import { Shield, Sparkles, HeartPulse, ClipboardCheck, ArrowRight } from 'lucide-react';

interface OurModelViewProps {
  onCheckProducts: () => void;
}

export default function OurModelView({ onCheckProducts }: OurModelViewProps) {
  const steps = [
    {
      icon: HeartPulse,
      title: 'Animal Welfare First',
      desc: 'Our cow health metrics are verified by independent vets. From comfortable bedding to ample grazing space, our herd live with care and dignity.'
    },
    {
      icon: Shield,
      title: 'Humane Certified Dairy Logistics',
      desc: 'We follow rigorous humane farming principles ensuring that every step of raw milk extraction is completely stress-free and natural.'
    },
    {
      icon: Sparkles,
      title: 'Organic Milk Processing',
      desc: 'No heavy chemicals, hormones, or additives. We pasture-pasturize in certified solar-powered boilers to lock in pure organic taste.'
    },
    {
      icon: ClipboardCheck,
      title: 'Traceable Milk Supply Chain',
      desc: 'Every container is QR-labeled. Buyers can trace the milk from bulk delivery tankers straight back to the original dairy cohort.'
    }
  ];

  return (
    <div className="w-full" id="our-model-view">
      {/* 1. Header Hero Banner */}
      <section className="bg-milk-900 py-20 text-center text-white relative overflow-hidden">
        {/* Decorative backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-butter-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-butter-300 font-bold">How We Farm</span>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            Redefining Dairy Through Animal Welfare
          </h1>
          <p className="text-base font-light text-milk-100 max-w-2xl mx-auto leading-relaxed">
            Our holistic, animal-centric method stands as the ultimate standard for supply chains. We blend time-honored ethics with certified traceability.
          </p>
        </div>
      </section>

      {/* 2. core values intro */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="font-mono text-xs text-butter-600 uppercase tracking-widest font-bold block">Certified Superiority</span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-milk-900 tracking-tight leading-tight">
                Our Four-Pillar Quality Protection Standard
              </h2>
              <div className="text-sm text-milk-600 space-y-4 leading-relaxed font-light">
                <p>
                  To secure an authentic <span className="font-semibold text-milk-800">Traceable Milk Supply</span>, we developed a proprietary system ensuring absolute control over nutrition and sanitization. Because we bypass conventional middle-agents, we deliver fresh bulk supplies with exceptional speed.
                </p>
                <p>
                  Our commitment to <span className="font-semibold text-milk-800">Animal Welfare</span> means no artificial stimulants, no confined feed stall houses, and a lifestyle that allows cows to graze freely across organically certified grasslands.
                </p>
              </div>
              <div className="pt-2">
                <button
                  onClick={onCheckProducts}
                  className="px-6 py-3.5 rounded-xl bg-milk-800 hover:bg-milk-700 text-white font-bold text-sm tracking-wide transition-colors flex items-center gap-2"
                >
                  Explore Sourcing Catalog
                  <ArrowRight className="w-4 h-4 text-butter-300" />
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {steps.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-6 rounded-2xl bg-dairy-cream border border-milk-100 shadow-sm space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-butter-600 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-sm text-milk-900">{item.title}</h3>
                    <p className="text-[11px] text-milk-500 leading-relaxed font-light">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. visual diagram overview */}
      <section className="py-20 bg-dairy-cream border-y border-milk-100">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-butter-600 font-bold block">100% Traceable</span>
            <h2 className="font-display font-extrabold text-3xl text-milk-900 tracking-tight">The Path of Pure Cow Sourcing</h2>
            <p className="text-xs text-milk-500 max-w-xl mx-auto font-light">
              By controlling our own pastures, processing center, and logistics, we preserve nutrient density without thermal oxidation.
            </p>
          </div>

          <div className="relative p-8 rounded-3xl bg-white border border-milk-150 shadow-sm grid md:grid-cols-3 gap-6 items-stretch">
            <div className="p-4 space-y-2 flex flex-col justify-between">
              <span className="font-mono text-[10px] text-butter-600 font-bold block uppercase">Step 01</span>
              <h4 className="font-display font-bold text-sm text-milk-900">Humane Grazing</h4>
              <p className="text-[11px] text-milk-500 leading-relaxed font-light">We maintain pasture-fed cattle on certified meadows to assure rich beta-carotene milk fats.</p>
              <div className="h-1 bg-butter-400 rounded-full mt-3" />
            </div>
            
            <div className="p-4 space-y-2 flex flex-col justify-between border-y md:border-y-0 md:border-x border-milk-100">
              <span className="font-mono text-[10px] text-butter-600 font-bold block uppercase">Step 02</span>
              <h4 className="font-display font-bold text-sm text-milk-900">Solar Pasteurizer</h4>
              <p className="text-[11px] text-milk-500 leading-relaxed font-light">Low-temperature gentle heat treatment preservation locks in natural enzymes & organic fats.</p>
              <div className="h-1 bg-milk-800 rounded-full mt-3" />
            </div>

            <div className="p-4 space-y-2 flex flex-col justify-between">
              <span className="font-mono text-[10px] text-butter-600 font-bold block uppercase">Step 03</span>
              <h4 className="font-display font-bold text-sm text-milk-900">Direct Sourcing</h4>
              <p className="text-[11px] text-milk-500 leading-relaxed font-light">Cold-insulated tankers arrive in short duration to ensure freshest bulk distribution.</p>
              <div className="h-1 bg-butter-400 rounded-full mt-3" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
