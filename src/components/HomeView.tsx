import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sun, Award, Landmark, Sparkles, MessageSquareQuote, Heart, Milk } from 'lucide-react';
import { Product, ActivePage } from '../types';

interface HomeViewProps {
  onExploreProducts: () => void;
  onExploreStory: () => void;
  featuredProducts: Product[];
  onQuickAdd: (product: Product, size: string) => void;
  onOpenProductDetail: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
  favorites: Product[];
}

export default function HomeView({
  onExploreProducts,
  onExploreStory,
  featuredProducts,
  onQuickAdd,
  onOpenProductDetail,
  onToggleFavorite,
  favorites
}: HomeViewProps) {
  const [subscribed, setSubscribed] = React.useState(false);
  
  const highlights = [
    {
      icon: Sparkles,
      title: 'Farm Fresh Quality',
      desc: 'Carefully produced and quickly delivered for maximum freshness of every pasture-grade drop.'
    },
    {
      icon: Heart,
      title: 'Animal Care First',
      desc: 'Healthy cows, spacious bedding, and ethical grazing practices are at the absolute heart of everything.'
    },
    {
      icon: Sun,
      title: 'Sustainable Methods',
      desc: 'We focus on responsible land stewardship, solar energy lines, and long-term organic restoration.'
    },
    {
      icon: Award,
      title: 'Made for Every Home',
      desc: 'Everyday essentials and specialty gourmet offerings for every family and local coffee bar.'
    }
  ];

  return (
    <div className="w-full" id="home-view">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-milk-900 via-milk-850 to-milk-950 py-20 lg:py-32 text-white">
        {/* Subtle geometric circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-milk-700/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-butter-500/5 rounded-full blur-3xl pointer-events-none" />
        
        {/* Farm graphic decoration */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-milk-700/50 border border-milk-500/30 text-xs font-semibold text-milk-100 uppercase tracking-widest font-mono"
              >
                <Sparkles className="w-3.5 h-3.5 text-butter-300 animate-pulse" />
                Pure Farm-To-Table Goodness
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.10]"
              >
                Caring for Cows.<br className="hidden sm:inline" />
                <span className="text-butter-300">Delivering Purity.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-base sm:text-lg text-milk-100 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed"
              >
                Welcome to Milk Rush, a premium Certified Organic and Humane dairy supplier. As a leading <span className="font-semibold text-butter-300">Organic Milk Supplier</span>, we provide specialized <span className="font-semibold text-butter-300">Bulk Milk Supply</span> solutions for businesses across India, rooted in the highest standards of animal welfare.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-wrap justify-center lg:justify-start gap-4 pt-3"
              >
                <button
                  onClick={onExploreProducts}
                  className="px-6 py-3.5 rounded-xl bg-butter-500 text-milk-950 font-bold text-sm tracking-wide hover:bg-butter-400 active:scale-[0.98] transition-transform shadow-lg shadow-butter-500/10 flex items-center gap-2"
                >
                  Explore Products
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onExploreStory}
                  className="px-6 py-3.5 rounded-xl bg-milk-800 text-white font-bold text-sm tracking-wide border border-milk-600 hover:bg-milk-700 active:scale-[0.98] transition-transform"
                >
                  Our Story
                </button>
              </motion.div>
            </div>

            {/* Right Column Interactive Lactose Splash Frame */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative w-full max-w-sm sm:max-w-md aspect-square rounded-[2rem] overflow-hidden shadow-2xl bg-milk-800 border-4 border-milk-700/50"
              >
                <img
                  src="https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=720"
                  alt="Organic Dairy Farm Pouring Milk"
                  referrerPolicy="no-referrer"
                  decoding="async"
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                />
                
                {/* Visual badge card floating */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-milk-100 flex items-center justify-between text-milk-900">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-milk-500">Local Dispatch</span>
                    <h4 className="font-display font-semibold text-sm">Tomorrow Morning</h4>
                    <p className="text-xs text-milk-500 font-light">Direct to Brookvale community</p>
                  </div>
                  <div className="w-11 h-11 rounded-full bg-milk-50 flex items-center justify-center border border-milk-100 text-milk-800">
                    <Milk className="w-5 h-5 text-milk-700" />
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Wave Separator */}
      <div className="relative w-full overflow-hidden leading-[0] h-5 bg-milk-900">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12 text-white fill-current">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,53.05,17.15,81,25.33,146.6,44.59,214.7,59.39,321.39,56.44Z"></path>
        </svg>
      </div>

      {/* 2. Welcome Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-12 h-1 bg-butter-500 mx-auto rounded-full" />
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-milk-900 tracking-tight">
            Why Animal-Centric Matters
          </h2>
          <p className="text-base sm:text-lg text-milk-600 font-light leading-relaxed max-w-3xl mx-auto">
            At Milk Rush, we champion <span className="font-semibold text-milk-800">Ethical Dairy Farming</span> as the gold standard of modern agriculture. We believe that caring for our herd translates directly to the purity of our supply. Stress-free grazing, nutritious pastures, and premium veterinarian standards guarantee an uncompromised raw product for processing.
          </p>
        </div>
      </section>

      {/* 2b. Why Partner With Us Section */}
      <section className="py-16 bg-milk-50 border-t border-b border-milk-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-butter-600 font-bold block mb-2">B2B Sourcing Advantages</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-milk-900 tracking-tight mb-6">
                Why Partner With Us
              </h2>
              <p className="text-milk-600 font-light leading-relaxed mb-6">
                We are India's premier B2B bulk supplier specializing in humanely premium and organic dairy supply chains. Our facilities handle high-volume processing while preserving single-origin traceability, ensuring your company obtains milk that is both ethically sound and chemically superior.
              </p>
              
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-milk-100 shadow-sm">
                  <h3 className="font-display font-bold text-lg text-milk-900 mb-1">
                    Reliable Bulk Supply
                  </h3>
                  <p className="text-xs text-milk-500 leading-relaxed">
                    With highly scalable cold-chain networks and regional cooperative integrations across the country, we guarantee zero-delay bulk deliveries, even in peak seasons.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-milk-100 bg-milk-200">
                <img 
                  src="https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&q=80&w=720"
                  alt="High quality bulk dairy container logistics"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute lg:-bottom-6 lg:-right-6 bottom-4 right-4 p-5 bg-butter-500 text-milk-950 rounded-2xl shadow-lg border border-butter-400 max-w-[240px] sm:max-w-xs hidden sm:block">
                <p className="font-display font-bold text-sm">100% Reliable Bulk Supply</p>
                <p className="text-[11px] opacity-90 font-mono mt-1">Guaranteed temperature-controlled delivery chain.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Highlights Section (Bento style grid) */}
      <section className="py-16 bg-dairy-cream border-y border-milk-100" id="home-highlights">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-butter-600 font-bold block">The Milk Rush Philosophy</span>
            <h2 className="font-display font-bold text-3xl text-milk-900 tracking-tight">Cared For In Every Dimension</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((h, i) => {
              const IconComp = h.icon;
              return (
                <div 
                  key={i}
                  className="p-6 rounded-2xl bg-white border border-milk-100 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-milk-200 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-50 text-butter-600 flex items-center justify-center mb-4 transition-colors group-hover:bg-milk-800 group-hover:text-white">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-milk-900 mb-2">{h.title}</h3>
                  <p className="text-xs text-milk-500 font-sans leading-relaxed">{h.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Featured Products Preview */}
      <section className="py-20 bg-white" id="featured-products-preview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-milk-600 font-bold block">Wholesome Selection</span>
              <h2 className="font-display font-bold text-3xl text-milk-900 tracking-tight">Featured Dairy Products</h2>
            </div>
            <button
              onClick={onExploreProducts}
              className="px-5 py-2.5 rounded-xl border border-milk-200 text-milk-800 hover:text-milk-600 hover:bg-milk-50 font-semibold text-sm transition-colors flex items-center gap-1.5 self-start md:self-auto"
            >
              View Full Dairy Range
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {featuredProducts.slice(0, 5).map((product) => {
              const isFavorited = favorites.some((f) => f.id === product.id);
              return (
                <div 
                  key={product.id}
                  className="rounded-3xl border border-milk-100 bg-white shadow-sm overflow-hidden flex flex-col group transition-all hover:border-milk-200 hover:shadow-md h-full relative"
                >
                  
                  {/* Heart Float */}
                  <button
                    onClick={() => onToggleFavorite(product)}
                    className="absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md bg-white/70 hover:bg-white text-milk-400 hover:text-rose-500 transition-all border border-milk-50 active:scale-95"
                    title="Add to Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>

                  {/* Thumbnail Image */}
                  <div className="relative aspect-square overflow-hidden bg-milk-50 border-b border-milk-100 cursor-pointer" onClick={() => onOpenProductDetail(product)}>
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-milk-900/80 text-white font-mono text-[9px] uppercase tracking-wider font-semibold">
                      {product.category}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <h3 
                        className="font-display font-bold text-sm text-milk-900 group-hover:text-milk-600 transition-colors cursor-pointer"
                        onClick={() => onOpenProductDetail(product)}
                      >
                        {product.name}
                      </h3>
                      <p className="text-xs text-milk-600 font-light line-clamp-2 min-h-[2rem]">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-4 flex items-center justify-between gap-1 mt-auto">
                      <div>
                        <span className="block text-[9px] uppercase font-mono tracking-widest text-milk-400">Regular</span>
                        <span className="font-display font-extrabold text-sm text-milk-800">${product.price.toFixed(2)}</span>
                      </div>
                      <button
                        onClick={() => onQuickAdd(product, product.sizes[0])}
                        className="px-3.5 py-2 rounded-xl bg-milk-50 hover:bg-milk-800 text-milk-800 hover:text-white transition-all text-xs font-bold uppercase tracking-wider active:scale-95"
                      >
                        + Add
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Mini Testimonial */}
      <section className="py-20 bg-dairy-crust relative overflow-hidden flex flex-col items-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-milk-100/30 font-display font-extrabold text-9xl tracking-tighter select-none pointer-events-none text-stroke-milk font-serif">
          &ldquo; PURE &rdquo;
        </div>
        <div className="max-w-2xl mx-auto px-4 text-center relative z-10 space-y-6">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-milk-100 mx-auto shadow shadow-milk-100">
            <MessageSquareQuote className="w-5 h-5 text-butter-500 fill-butter-500" />
          </div>
          
          <blockquote className="font-display font-medium text-lg sm:text-xl text-milk-900 italic leading-relaxed">
            "Milk Rush products remind us what real dairy should taste like - fresh, rich, and comforting."
          </blockquote>
          
          <div className="space-y-0.5">
            <cite className="not-italic font-mono text-xs uppercase font-bold text-milk-700 tracking-wider">
              Mrs. Clara Abernathy
            </cite>
            <p className="text-[10px] text-milk-400 font-mono mt-0.5">Brookvale Neighborhood Organizer • Family Customer</p>
          </div>
        </div>
      </section>

      {/* 6. Newsletter micro conversion */}
      <section className="py-12 bg-milk-900 text-white border-t border-milk-950">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <h3 className="font-display font-bold text-xl">Keep Updated with the Farm</h3>
          <p className="text-xs text-milk-200 max-w-sm mx-auto font-light leading-relaxed">
            Sign up to our monthly bulletin for free tasting coupons, seasonal B2B bulk updates, and recipes.
          </p>
          
          {subscribed ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 bg-milk-800 rounded-xl max-w-md mx-auto text-butter-300 font-mono text-xs text-center border border-butter-500/20"
            >
              ✓ Thank you! You have successfully subscribed to the Milk Rush newsletter ledger.
            </motion.div>
          ) : (
            <div className="flex max-w-md mx-auto rounded-xl overflow-hidden shadow-inner border border-milk-800 bg-milk-850 p-1">
              <input 
                type="email" 
                placeholder="dairyname@email.com" 
                className="flex-1 bg-transparent px-3 py-2.5 text-xs text-white placeholder-milk-400 focus:outline-none"
              />
              <button 
                onClick={() => setSubscribed(true)}
                className="px-4 py-2 bg-butter-500 hover:bg-butter-400 text-milk-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
                id="newsletter-submit-btn"
              >
                Enroll
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
