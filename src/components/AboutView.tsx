import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, HeartPulse, Sparkles, Scale, Sprout, Landmark, Award, ArrowUpRight } from 'lucide-react';

interface AboutViewProps {
  onCheckProducts: () => void;
}

export default function AboutView({ onCheckProducts }: AboutViewProps) {
  
  const values = [
    {
      icon: ShieldCheck,
      title: 'Quality First',
      desc: 'We never compromise on taste, safety, or freshness. What we wouldnt serve our own toddlers stays off the transport trucks.'
    },
    {
      icon: Scale,
      title: 'Integrity & Transparency',
      desc: 'We believe customers deserve complete visual honesty regarding how their food is pasture-sourced and milk-pasteurized.'
    },
    {
      icon: HeartPulse,
      title: 'Empathetic Care',
      desc: 'Deep care for our heritage cattle, our hard-working soil, our loyal employees, and the final kitchen tables we nourish.'
    },
    {
      icon: Sprout,
      title: 'Thoughtful Innovation',
      desc: 'We continually refine pasteurizer systems, optimize zero-waste organic lines, and incorporate solar grids, holding onto proud traditions.'
    }
  ];

  const milestones = [
    { year: '1982', title: 'The Meadow Acres Root', desc: 'The Sterling grandfather installs 8 custom barn cows on Brookvale green meadow.' },
    { year: '1998', title: 'Local Cooperative Launch', desc: 'Expanding fresh pasteurizer blocks to supply neighbor grocers and local schools.' },
    { year: '2012', title: 'The Milk Rush Brand Birth', desc: 'Consolidating operations under a modern, safety-certified identity focused on ethics.' },
    { year: '2026', title: 'Eco-Solar Farm Integration', desc: 'Operating clean solar milking blocks and launching reusable canister services.' }
  ];

  return (
    <div className="w-full" id="about-us-view">
      
      {/* Page Title Header banner */}
      <section className="bg-milk-900 py-16 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-butter-300 font-bold">Who We Are</span>
          <h1 className="font-display font-black text-4xl sm:text-5xl tracking-tight">
            About Our Company
          </h1>
          <p className="text-sm font-light text-milk-100 max-w-xl mx-auto leading-relaxed">
            Discover the proud traditions, clinical safety standards, and sustainable values that underpin our fresh pasture-dairy stewards.
          </p>
        </div>
      </section>

      {/* Intro section: Tradition & Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Story text */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-display font-bold text-lg text-butter-600 uppercase tracking-widest font-mono">About Us</h2>
              <h2 className="font-display font-extrabold text-3xl text-milk-900 tracking-tight leading-tight">
                Rooted in tradition.<br />Growing with purpose.
              </h2>
              <div className="text-sm text-milk-600 space-y-4 leading-relaxed font-light">
                <p>
                  Milk Rise began with a simple idea: produce high-quality dairy products without compromising on animal welfare, sustainability, or taste. What started as a small family dairy has grown into a trusted brand serving homes, cafes, and local stores.
                </p>
                <p>
                  Founded by a family with generations of farming experience, Milk Rush was built on respect for the land and pride in honest work. Over the years, we’ve combined traditional dairy values with modern production methods to ensure every product meets high standards of safety, nutrition, and flavor.
                </p>
              </div>

              {/* Mini statistic highlights block */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="p-3 rounded-2xl bg-dairy-cream border border-milk-100">
                  <span className="block font-display font-extrabold text-2xl text-milk-800">40+</span>
                  <span className="text-[10px] text-milk-400 capitalize tracking-wider font-mono font-medium">Farming Years</span>
                </div>
                <div className="p-3 rounded-2xl bg-dairy-cream border border-milk-100">
                  <span className="block font-display font-extrabold text-2xl text-milk-800">100%</span>
                  <span className="text-[10px] text-milk-400 capitalize tracking-wider font-mono font-medium">Pasture Raised</span>
                </div>
                <div className="p-3 rounded-2xl bg-dairy-cream border border-milk-100">
                  <span className="block font-display font-extrabold text-2xl text-milk-800">Zero</span>
                  <span className="text-[10px] text-milk-400 capitalize tracking-wider font-mono font-medium">BGH Hormones</span>
                </div>
              </div>
            </div>

            {/* Illustrative Frame */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-dairy-crust aspect-[4/3] lg:aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=600"
                  alt="Scenic Brookvale Dairy Pasture Cows"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#f0ebe3]">Scenic Ridge</span>
                    <h4 className="font-display font-semibold text-sm">Brookvale Meadow Farm</h4>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mission & Vision Callouts (Dual side-by-side bento card layout) */}
      <section className="py-16 bg-dairy-cream border-t border-milk-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Mission Container card */}
            <div className="p-8 rounded-3xl bg-white border border-milk-100 shadow-sm relative overflow-hidden flex flex-col justify-between group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-milk-50 rounded-bl-full pointer-events-none transition-all group-hover:scale-110" />
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-butter-600 flex items-center justify-center">
                  <Landmark className="w-5 h-5" />
                </div>
                <h3 className="font-display font-extrabold text-xl text-milk-900 uppercase tracking-tight">Our Mission</h3>
                <p className="text-sm font-light text-milk-600 leading-relaxed">
                  To provide fresh, nourishing dairy products that support healthy families, responsible farming models, and stronger local cooperative community bonds.
                </p>
              </div>
              <div className="pt-6 font-mono text-[10px] tracking-wider text-milk-400 uppercase mt-4">
                • Nourish Everyday Life
              </div>
            </div>

            {/* Vision Container card */}
            <div className="p-8 rounded-3xl bg-white border border-milk-100 shadow-sm relative overflow-hidden flex flex-col justify-between group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50/50 rounded-bl-full pointer-events-none transition-all group-hover:scale-110" />
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-milk-50 text-milk-700 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-display font-extrabold text-xl text-milk-900 uppercase tracking-tight">Our Vision</h3>
                <p className="text-sm font-light text-milk-600 leading-relaxed">
                  To become a globally respected steward in clean dairy by consistently setting standard metrics for ecological freshness, production transparency, and sustainable soil growth.
                </p>
              </div>
              <div className="pt-6 font-mono text-[10px] tracking-wider text-milk-400 uppercase mt-4">
                • Ethical Stewardship Benchmarks
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-[#c29c5b] font-bold block">The MilkRise Ledger</span>
            <h2 className="font-display font-bold text-3xl text-milk-900 tracking-tight">Core Dairy Values</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((v, i) => {
              const ValIcon = v.icon;
              return (
                <div 
                  key={i}
                  className="p-6 rounded-2xl bg-dairy-cream hover:bg-white border border-milk-50 hover:border-milk-100 transition-all shadow-sm hover:shadow-md flex gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-white border border-milk-100 text-milk-700 font-bold shrink-0 flex items-center justify-center">
                    <ValIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-base text-milk-900 mb-1">{v.title}</h3>
                    <p className="text-xs text-milk-500 font-light leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Milestones timeline vertical list */}
      <section className="py-20 bg-dairy-crust border-t border-milk-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center space-y-2 mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-milk-500 block">Our Chronology</span>
            <h2 className="font-display font-bold text-3xl text-milk-900">Historical Dairy Milestones</h2>
          </div>

          <div className="relative border-l-2 border-milk-200 pl-6 ml-4 space-y-12">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative">
                {/* Timeline node */}
                <div className="absolute -left-10 top-0.5 w-6 h-6 rounded-full bg-milk-850 text-white flex items-center justify-center border-4 border-dairy-crust font-display text-[9px] font-bold shadow-sm">
                  {idx + 1}
                </div>
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-butter-100 text-butter-600 font-mono text-xs font-bold mb-1">
                    {m.year}
                  </span>
                  <h3 className="font-display font-semibold text-base text-milk-900">{m.title}</h3>
                  <p className="text-xs text-milk-500 font-light mt-1 max-w-xl leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="rounded-3xl bg-milk-900 text-white p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row gap-8 items-center">
            <div className="absolute top-0 right-0 w-48 h-48 bg-milk-800/60 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-4 md:w-2/3">
              <span className="text-xs font-mono uppercase text-butter-300 font-semibold tracking-widest">Why Choose Us</span>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight leading-tight">
                Honest production, sustainable packaging, family commitment.
              </h3>
              <p className="text-xs text-milk-100 font-light leading-relaxed">
                MilkRise stands for dependable quality and everyday goodness. We focus on the details that matter - clean production, careful sourcing, pasture-fed cows, and products people feel good serving at home.
              </p>
            </div>
            
            <div className="md:w-1/3 text-center">
              <button
                onClick={onCheckProducts}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-butter-500 hover:bg-butter-400 text-milk-950 font-bold text-xs uppercase tracking-wider transition-colors active:scale-95 shadow-lg shadow-butter-500/10"
              >
                Browse Our Items
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
