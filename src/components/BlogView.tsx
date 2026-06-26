import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Calendar, User, Clock, Tag, ArrowLeft, Bookmark, Heart, Share2 } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogViewProps {
  posts: BlogPost[];
}

export default function BlogView({ posts }: BlogViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [bookmarkedList, setBookmarkedList] = useState<string[]>([]);
  const [copiedTitle, setCopiedTitle] = useState<string | null>(null);

  // Collect all unique tags for filter pills
  const allTags = ['All', ...Array.from(new Set(posts.flatMap(p => p.tags)))];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const handleToggleBookmark = (id: string) => {
    if (bookmarkedList.includes(id)) {
      setBookmarkedList(bookmarkedList.filter(b => b !== id));
    } else {
      setBookmarkedList([...bookmarkedList, id]);
    }
  };

  const handleShare = (title: string) => {
    setCopiedTitle(title);
    setTimeout(() => {
      setCopiedTitle(null);
    }, 4000);
  };

  return (
    <div className="w-full" id="blog-view-container">
      {/* Toast Notification */}
      <AnimatePresence>
        {copiedTitle && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 16, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 rounded-2xl bg-milk-900 border border-butter-500/20 text-white font-mono text-xs flex items-center gap-3 shadow-2xl shadow-milk-950/20"
          >
            <span className="text-butter-300">✓</span> Link copied for: "{copiedTitle}"
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence mode="wait">
        {!activePost ? (
          /* LIST VIEW */
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-12"
          >
            {/* Header Banner */}
            <section className="bg-milk-900 py-16 text-center text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
              <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4">
                <span className="font-mono text-xs uppercase tracking-widest text-butter-300 font-bold">The Pasture Journal</span>
                <h1 className="font-display font-black text-4xl sm:text-5xl tracking-tight">Better Farming & Better Milk</h1>
                <p className="text-sm font-light text-milk-100 max-w-xl mx-auto leading-relaxed">
                  Insights on <span className="text-butter-300 font-medium">Dairy Farming</span> parameters, strict <span className="text-butter-300 font-medium">Animal Welfare Standards</span>, daily <span className="text-butter-300 font-medium">Milk Quality Testing</span>, and organic <span className="text-butter-300 font-medium">Sustainable Dairy Practices</span>.
                </p>
              </div>
            </section>

            {/* Live Search and Tag Filter Bar */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between pb-6 border-b border-milk-100">
                {/* Search text box */}
                <div className="relative w-full md:max-w-xs">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-milk-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles & guides..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-milk-200 bg-white text-xs text-milk-800 placeholder-milk-400 focus:outline-none focus:border-milk-500 focus:ring-1 focus:ring-milk-500 shadow-sm"
                  />
                </div>

                {/* Filter tags checklist */}
                <div className="flex flex-wrap gap-1.5 self-start md:self-auto overflow-x-auto max-w-full pb-1">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all border shrink-0 ${
                        selectedTag === tag
                          ? 'bg-milk-800 text-white border-milk-850'
                          : 'bg-white text-milk-700 border-milk-100 hover:bg-milk-50'
                      }`}
                    >
                      {tag === 'All' ? '📂 All Topics' : `#${tag}`}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Articles Grid container */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-20 bg-dairy-cream rounded-3xl border border-milk-100">
                  <p className="text-sm text-milk-500">No blog posts match your custom search keyword or topic filter.</p>
                  <button 
                    onClick={() => { setSearchQuery(''); setSelectedTag('All'); }}
                    className="mt-4 text-xs font-mono font-bold text-butter-600 underline"
                  >
                    Reset Filter Grid
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post) => {
                    const isBookmarked = bookmarkedList.includes(post.id);
                    return (
                      <article 
                        key={post.id}
                        className="bg-white rounded-[2rem] border border-milk-100 overflow-hidden shadow-sm flex flex-col justify-between group transition-all hover:-translate-y-1 hover:shadow-md hover:border-milk-200"
                      >
                        {/* Thumbnail image */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-milk-50 border-b border-milk-100">
                          <img
                            src={post.image}
                            alt={post.title}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <button
                            onClick={() => handleToggleBookmark(post.id)}
                            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm text-milk-500 hover:text-butter-600 transition-colors"
                            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Story'}
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-butter-500 text-butter-500' : ''}`} />
                          </button>
                        </div>

                        {/* Text detail block */}
                        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                          <div className="space-y-2">
                            {/* Author date ticker */}
                            <div className="flex items-center gap-3 text-[10px] text-milk-500 font-mono font-medium">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {post.date}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {post.readTime}
                              </span>
                            </div>

                            <h3 className="font-display font-extrabold text-base text-milk-900 leading-snug group-hover:text-milk-600 transition-colors">
                              {post.title}
                            </h3>
                            
                            <p className="text-xs text-milk-600 font-light line-clamp-3 leading-relaxed">
                              {post.excerpt}
                            </p>
                          </div>

                          {/* Footer action trigger */}
                          <div className="pt-4 border-t border-milk-50 flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold text-milk-500 uppercase tracking-wider bg-milk-50 px-2.5 py-0.5 rounded-md">
                              {post.category}
                            </span>
                            
                            <button
                              onClick={() => setActivePost(post)}
                              className="text-xs font-display font-bold text-milk-800 hover:text-milk-600 flex items-center gap-1 group-hover:translate-x-1.5 transition-transform"
                            >
                              Read Full Story →
                            </button>
                          </div>
                        </div>

                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          </motion.div>
        ) : (
          /* DETAILED ARTICLE EXPANSION VIEW */
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-4xl mx-auto px-4 py-8 space-y-8"
          >
            {/* Back action bar */}
            <div className="flex items-center justify-between border-b border-milk-100 pb-4">
              <button
                onClick={() => setActivePost(null)}
                className="flex items-center gap-2.5 px-4 py-2 rounded-xl border border-milk-100 bg-white hover:bg-milk-50 font-display text-xs font-bold text-milk-850 active:scale-95 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Archive Ledger
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleBookmark(activePost.id)}
                  className="p-2 rounded-full border border-milk-100 bg-white text-milk-600 hover:text-butter-600 transition-colors"
                  title="Bookmark Article"
                >
                  <Bookmark className={`w-4 h-4 ${bookmarkedList.includes(activePost.id) ? 'fill-butter-500 text-butter-500' : ''}`} />
                </button>
                <button
                  onClick={() => handleShare(activePost.title)}
                  className="p-2 rounded-full border border-milk-100 bg-white text-milk-600 hover:text-butter-600 transition-colors"
                  title="Share Link"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Expansive Hero Graphic */}
            <div className="rounded-[2.5rem] overflow-hidden aspect-[2/1] relative shadow-lg">
              <img
                src={activePost.image}
                alt={activePost.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-end p-6 md:p-8">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#ffe39c] bg-butter-500/20 backdrop-blur border border-butter-500/30 px-3 py-1 rounded-full font-bold">
                  {activePost.category} Article
                </span>
              </div>
            </div>

            {/* Authoring information */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-milk-500 border-b border-milk-50 pb-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-butter-500" />
                  <span>By <strong className="text-milk-855 font-semibold">{activePost.author}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-butter-500" />
                  <span>Published {activePost.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-butter-500" />
                  <span>{activePost.readTime} reading time</span>
                </div>
              </div>

              {/* Title Display */}
              <h1 className="font-display font-black text-3xl sm:text-4xl text-milk-900 leading-tight">
                {activePost.title}
              </h1>
            </div>

            {/* Paragraph Content letterbox */}
            <div className="space-y-5 text-sm sm:text-base font-light text-milk-800 leading-relaxed font-sans max-w-3xl">
              {activePost.content.map((para, idx) => (
                <p key={idx} className="first-letter:text-2xl first-letter:font-semibold">
                  {para}
                </p>
              ))}
            </div>

            {/* Tags footer block */}
            <div className="pt-8 border-t border-milk-100 flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] font-bold text-milk-400 flex items-center gap-1.5 mr-2">
                <Tag className="w-3.5 h-3.5" /> Filed Tags:
              </span>
              {activePost.tags.map((tg, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full bg-dairy-cream border border-milk-100 text-[10px] font-mono font-medium text-milk-600 uppercase">
                  #{tg}
                </span>
              ))}
            </div>

            {/* Final post recommendation panel */}
            <div className="p-6 rounded-3xl bg-dairy-cream border border-milk-100 text-center space-y-3">
              <h4 className="font-display font-bold text-sm text-milk-900">Found this article informative?</h4>
              <p className="text-xs text-milk-500 font-light max-w-md mx-auto">
                All of our stories are inspired by our veterinary and farm teams. For updates about new releases, make sure to check out our daily fresh products list.
              </p>
              <button
                onClick={() => setActivePost(null)}
                className="px-5 py-2 rounded-xl bg-milk-800 text-white font-semibold text-xs uppercase tracking-wider hover:bg-milk-900 transition-colors"
              >
                Return to Blog Archive
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
