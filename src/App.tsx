import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import ProductsView from './components/ProductsView';
import BlogView from './components/BlogView';
import ContactView from './components/ContactView';
import OurModelView from './components/OurModelView';
import WebMapView from './components/WebMapView';
import CartDrawer from './components/CartDrawer';
import SEO from './components/SEO';
import MobileQuickBar from './components/MobileQuickBar';

import { productsData, blogPostsData } from './data';
import { ActivePage, CartItem, Product, ContactInquiry } from './types';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  
  // Modals / Drawer toggles
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesDrawer, setIsFavoritesDrawer] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Compute activePage synchronously based on current routing path
  const getActivePageFromPath = (path: string): ActivePage => {
    if (path === '/' || path === '/home') return 'home';
    if (path === '/about' || path === '/aboutus') return 'about';
    if (path === '/ourmodel') return 'ourmodel';
    if (path === '/services' || path === '/products') return 'services';
    if (path === '/webmap') return 'webmap';
    if (path === '/blog') return 'blog';
    if (path === '/contact') return 'contact';
    return 'home';
  };

  const activePage = getActivePageFromPath(location.pathname);

  // Initialize from LocalStorage for durable UX
  useEffect(() => {
    const cachedCart = localStorage.getItem('milkrise_cart_v1');
    const cachedFavorites = localStorage.getItem('milkrise_favorites_v1');
    const cachedInquiries = localStorage.getItem('milkrise_inquiries_v1');

    if (cachedCart) {
      try { setCart(JSON.parse(cachedCart)); } catch (e) { console.error(e); }
    }
    if (cachedFavorites) {
      try { setFavorites(JSON.parse(cachedFavorites)); } catch (e) { console.error(e); }
    }
    if (cachedInquiries) {
      try { setInquiries(JSON.parse(cachedInquiries)); } catch (e) { console.error(e); }
    }
  }, []);

  // Save changes to LocalStorage
  const syncLocalStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const handlePageChange = (page: ActivePage) => {
    const targetPath = page === 'home' ? '/' : (page === 'about' ? '/aboutus' : `/${page}`);
    navigate(targetPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Methods
  const handleAddToCart = (product: Product, size: string) => {
    const itemUniqueId = `${product.id}-${size}`;
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex((item) => item.id === itemUniqueId);
      let updated: CartItem[];
      
      if (existingIdx > -1) {
        updated = prevCart.map((item, idx) => 
          idx === existingIdx ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updated = [
          ...prevCart,
          { id: itemUniqueId, product, quantity: 1, selectedSize: size }
        ];
      }
      syncLocalStorage('milkrise_cart_v1', updated);
      return updated;
    });

    // Automatically trigger visual slide drawer to alert user of successful addition
    setIsCartOpen(true);
    setIsFavoritesDrawer(false);
  };

  const handleUpdateQuantity = (itemUniqueId: string, delta: number) => {
    setCart((prevCart) => {
      const updated = prevCart.map((item) => {
        if (item.id === itemUniqueId) {
          const newQ = item.quantity + delta;
          return { ...item, quantity: Math.max(1, newQ) };
        }
        return item;
      });
      syncLocalStorage('milkrise_cart_v1', updated);
      return updated;
    });
  };

  const handleRemoveItem = (itemUniqueId: string) => {
    setCart((prevCart) => {
      const updated = prevCart.filter((item) => item.id !== itemUniqueId);
      syncLocalStorage('milkrise_cart_v1', updated);
      return updated;
    });
  };

  const handleClearCart = () => {
    setCart([]);
    syncLocalStorage('milkrise_cart_v1', []);
  };

  // Favorites Methods
  const handleToggleFavorite = (product: Product) => {
    setFavorites((prevFavorites) => {
      const exists = prevFavorites.some((item) => item.id === product.id);
      let updated: Product[];
      if (exists) {
        updated = prevFavorites.filter((item) => item.id !== product.id);
      } else {
        updated = [...prevFavorites, product];
      }
      syncLocalStorage('milkrise_favorites_v1', updated);
      return updated;
    });
  };

  const handleRemoveFavorite = (productId: string) => {
    setFavorites((prevFavorites) => {
      const updated = prevFavorites.filter((item) => item.id !== productId);
      syncLocalStorage('milkrise_favorites_v1', updated);
      return updated;
    });
  };

  // Inquiry form Methods
  const handleAddInquiry = (inquiry: ContactInquiry) => {
    setInquiries((prevInquiries) => {
      const updated = [inquiry, ...prevInquiries];
      syncLocalStorage('milkrise_inquiries_v1', updated);
      return updated;
    });
  };

  const handleClearInquiries = () => {
    setInquiries([]);
    syncLocalStorage('milkrise_inquiries_v1', []);
  };

  // Open cart or wishlist in drawer
  const handleOpenCartDrawer = () => {
    setIsFavoritesDrawer(false);
    setIsCartOpen(true);
  };

  const handleOpenFavoritesDrawer = () => {
    setIsFavoritesDrawer(true);
    setIsCartOpen(true);
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-dairy-cream text-milk-900 font-sans selection:bg-milk-100 selection:text-milk-850">
      
      {/* Header bar */}
      <Header
        activePage={activePage}
        setActivePage={handlePageChange}
        cartCount={totalCartCount}
        onOpenCart={handleOpenCartDrawer}
        favoritesCount={favorites.length}
        onOpenFavorites={handleOpenFavoritesDrawer}
      />

      {/* Main viewport area */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <SEO
                      title="Milk Rush - Certified Organic & Humane Dairy Supplier"
                      description="Premium organic and humane-certified bulk milk supplier for businesses across India."
                    />
                    <HomeView
                      onExploreProducts={() => handlePageChange('products')}
                      onExploreStory={() => handlePageChange('about')}
                      featuredProducts={productsData}
                      onQuickAdd={handleAddToCart}
                      onOpenProductDetail={setSelectedProduct}
                      onToggleFavorite={handleToggleFavorite}
                      favorites={favorites}
                    />
                  </>
                }
              />

              <Route
                path="/aboutus"
                element={
                  <>
                    <SEO
                      title="About Milk Rush"
                      description="Learn about Milk Rush's mission of ethical dairy farming and animal welfare."
                    />
                    <AboutView
                      onCheckProducts={() => handlePageChange('products')}
                    />
                  </>
                }
              />

              <Route path="/about" element={<Navigate to="/aboutus" replace />} />

              <Route
                path="/ourmodel"
                element={
                  <>
                    <SEO
                      title="Our Dairy Model"
                      description="Redefining dairy through premium animal welfare standards, organic milk, humane certified dairy, and a traceable milk supply."
                    />
                    <OurModelView
                      onCheckProducts={() => handlePageChange('products')}
                    />
                  </>
                }
              />

              <Route
                path="/services"
                element={
                  <>
                    <SEO
                      title="Services - Farmer & Dairy Services"
                      description="Discover our premium farmer and dairy services, featuring state of the art supply chains for bulk milk and organic products."
                    />
                    <ProductsView
                      products={productsData}
                      onQuickAdd={handleAddToCart}
                      favorites={favorites}
                      onToggleFavorite={handleToggleFavorite}
                      selectedProduct={selectedProduct}
                      onOpenProductDetail={setSelectedProduct}
                      onCloseProductDetail={() => setSelectedProduct(null)}
                    />
                  </>
                }
              />

              <Route path="/products" element={<Navigate to="/services" replace />} />

              <Route
                path="/webmap"
                element={
                  <>
                    <SEO
                      title="Sourcing WebMap & Logistics Ledger"
                      description="Interactive cow-welfare certified dairy cooperatives and live bulk cold-chain tracer routes across India."
                    />
                    <WebMapView />
                  </>
                }
              />

              <Route
                path="/blog"
                element={
                  <>
                    <SEO
                      title="Dairy Insights & Resources"
                      description="Better Farming & Better Milk - Read our articles on dairy farming, animal welfare standards, and quality testing."
                    />
                    <BlogView
                      posts={blogPostsData}
                    />
                  </>
                }
              />

              <Route
                path="/contact"
                element={
                  <>
                    <SEO
                      title="Contact Milk Rush"
                      description="Contact Milk Rush for bulk milk supply, partnerships, and dairy solutions."
                    />
                    <ContactView
                      inquiries={inquiries}
                      onAddInquiry={handleAddInquiry}
                      onClearInquiries={handleClearInquiries}
                    />
                  </>
                }
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Sitemap Footer */}
      <Footer 
        setActivePage={handlePageChange} 
        activePage={activePage} 
      />

      {/* Sliding Basket & Favorites Right Drawer Container */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onAddFromFavorites={handleAddToCart}
        favorites={favorites}
        onRemoveFavorite={handleRemoveFavorite}
        isFavoritesDrawer={isFavoritesDrawer}
      />

      {/* Floating & Bottom Mobile-Friendly Actions */}
      <MobileQuickBar
        activePage={activePage}
        setActivePage={handlePageChange}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => {
          setIsFavoritesDrawer(false);
          setIsCartOpen(true);
        }}
      />
    </div>
  );
}
