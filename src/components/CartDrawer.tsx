import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, Plus, Minus, Check, Heart, MessageSquareDot, HelpCircle } from 'lucide-react';
import { CartItem, Product } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onAddFromFavorites: (product: Product, size: string) => void;
  favorites: Product[];
  onRemoveFavorite: (id: string) => void;
  isFavoritesDrawer?: boolean; // toggle whether showing cart or favorites
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onAddFromFavorites,
  favorites,
  onRemoveFavorite,
  isFavoritesDrawer = false
}: CartDrawerProps) {
  const [activeTab, setActiveTab] = useState<'cart' | 'favorites'>(isFavoritesDrawer ? 'favorites' : 'cart');
  const [checkoutStep, setCheckoutStep] = useState<'idle' | 'shipping' | 'submitting' | 'success'>('idle');
  
  // Shipping form fields
  const [deliveryName, setDeliveryName] = useState('');
  const [deliveryPhone, setDeliveryPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [orderInvoice, setOrderInvoice] = useState('');

  // Make sure to sync activeTab when drawer type changes from parent
  React.useEffect(() => {
    setActiveTab(isFavoritesDrawer ? 'favorites' : 'cart');
  }, [isFavoritesDrawer, isOpen]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal > 30 ? 0 : 3.99;
  const total = subtotal + deliveryFee;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveryName || !deliveryPhone || !deliveryAddress) {
      alert('Please fill out the essential delivery fields.');
      return;
    }
    
    setCheckoutStep('submitting');
    setTimeout(() => {
      const invoiceNo = 'MR-' + Math.floor(100000 + Math.random() * 90000);
      setOrderInvoice(invoiceNo);
      setCheckoutStep('success');
      onClearCart();
    }, 1500);
  };

  const handleResetCheckout = () => {
    setCheckoutStep('idle');
    setDeliveryName('');
    setDeliveryPhone('');
    setDeliveryAddress('');
    setDeliveryNotes('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 pointer-events-auto"
          />

          {/* Drawer Body */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-dairy-cream border-l border-milk-100 shadow-2xl z-50 flex flex-col h-full overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 md:p-6 border-b border-milk-100 flex items-center justify-between bg-white">
              <div className="flex gap-2">
                <button
                  onClick={() => { setActiveTab('cart'); setCheckoutStep('idle'); }}
                  className={`px-4 py-2 rounded-xl font-display text-sm font-semibold transition-colors ${
                    activeTab === 'cart'
                      ? 'bg-milk-800 text-white'
                      : 'text-milk-500 hover:text-milk-800'
                  }`}
                >
                  Your Basket ({cartItems.length})
                </button>
                <button
                  onClick={() => { setActiveTab('favorites'); setCheckoutStep('idle'); }}
                  className={`px-4 py-2 rounded-xl font-display text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                    activeTab === 'favorites'
                      ? 'bg-milk-800 text-white'
                      : 'text-milk-500 hover:text-milk-800'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  Wishlist ({favorites.length})
                </button>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-milk-500 hover:text-milk-800 hover:bg-milk-50 transition-colors"
                id="cart-close-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Switcher */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              {activeTab === 'cart' ? (
                <>
                  {checkoutStep === 'idle' && (
                    <div className="space-y-4">
                      {cartItems.length === 0 ? (
                        <div className="text-center py-16 px-4">
                          <div className="w-16 h-16 rounded-full bg-milk-50 text-milk-400 flex items-center justify-center mx-auto mb-4">
                            <ShoppingBag className="w-8 h-8" />
                          </div>
                          <h3 className="font-display font-semibold text-lg text-milk-900 mb-1">Your basket is empty</h3>
                          <p className="text-sm text-milk-500 max-w-xs mx-auto mb-6">
                            Go to our Products tab and fill your life with milk, cheese, butter, and yogurt models.
                          </p>
                          <button
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-xl bg-milk-800 text-white text-sm font-medium hover:bg-milk-900 transition-colors shadow-md"
                          >
                            Browse Products
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3.5">
                          {cartItems.map((item) => (
                            <div 
                              key={item.id} 
                              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-milk-100 shadow-sm transition-all hover:border-milk-200"
                            >
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                referrerPolicy="no-referrer"
                                loading="lazy"
                                decoding="async"
                                className="w-16 h-16 object-cover rounded-xl bg-milk-50 border border-milk-50 shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-display font-semibold text-sm text-milk-900 truncate">{item.product.name}</h4>
                                <p className="text-xs text-milk-500 font-medium font-mono mb-1.5">{item.selectedSize}</p>
                                <div className="text-sm font-semibold text-milk-800">
                                  ${(item.product.price * item.quantity).toFixed(2)}
                                </div>
                              </div>
                              <div className="flex flex-col items-end justify-between gap-2 self-stretch">
                                <button
                                  onClick={() => onRemoveItem(item.id)}
                                  className="text-milk-400 hover:text-rose-500 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                                  title="Remove item"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                                <div className="flex items-center bg-milk-50 rounded-lg p-0.5 border border-milk-100">
                                  <button
                                    onClick={() => onUpdateQuantity(item.id, -1)}
                                    className="p-1 text-milk-600 hover:bg-white rounded-md transition-colors"
                                    disabled={item.quantity <= 1}
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="px-2 font-mono text-xs font-semibold text-milk-800">{item.quantity}</span>
                                  <button
                                    onClick={() => onUpdateQuantity(item.id, 1)}
                                    className="p-1 text-milk-600 hover:bg-white rounded-md transition-colors"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Checkout Shipping Phase */}
                  {checkoutStep === 'shipping' && (
                    <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                      <div className="p-4 rounded-xl bg-milk-50 text-milk-900 text-xs flex gap-2 border border-milk-100">
                        <MessageSquareDot className="w-4 h-4 shrink-0 text-milk-600" />
                        <div>
                          <strong>Simulated Checkout Mode</strong>: Complete this offline farm form. We do not process actual money. Deliveries will arrive fresh at Brookvale area.
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-semibold uppercase text-milk-700 tracking-wider mb-1">
                            Your Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={deliveryName}
                            onChange={(e) => setDeliveryName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-milk-200 bg-white font-sans text-sm focus:outline-none focus:border-milk-500 focus:ring-1 focus:ring-milk-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase text-milk-700 tracking-wider mb-1">
                            Contact Phone Number *
                          </label>
                          <input
                            type="tel"
                            required
                            value={deliveryPhone}
                            onChange={(e) => setDeliveryPhone(e.target.value)}
                            placeholder="+1 (555) 000-0000"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-milk-200 bg-white font-sans text-sm focus:outline-none focus:border-milk-500 focus:ring-1 focus:ring-milk-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase text-milk-700 tracking-wider mb-1">
                            Brookvale Delivery Address *
                          </label>
                          <textarea
                            required
                            rows={3}
                            value={deliveryAddress}
                            onChange={(e) => setDeliveryAddress(e.target.value)}
                            placeholder="e.g. 504 Sunrise Ave, Flat B, Brookvale, CA"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-milk-200 bg-white font-sans text-sm focus:outline-none focus:border-milk-500 focus:ring-1 focus:ring-milk-500 resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase text-milk-700 tracking-wider mb-2 flex items-center justify-between">
                            <span>Special Drop-off Instructions</span>
                            <span className="text-[10px] text-milk-400 capitalize">Optional</span>
                          </label>
                          <textarea
                            rows={2}
                            value={deliveryNotes}
                            onChange={(e) => setDeliveryNotes(e.target.value)}
                            placeholder="e.g. Leave glass bottles inside cold milk-cooler box on front porch."
                            className="w-full px-3.5 py-2.5 rounded-xl border border-milk-200 bg-white font-sans text-sm focus:outline-none focus:border-milk-500 focus:ring-1 focus:ring-milk-500 resize-none"
                          />
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4">
                        <button
                          type="button"
                          onClick={() => setCheckoutStep('idle')}
                          className="w-1/3 py-3 rounded-xl border border-milk-200 text-milk-700 text-xs font-bold hover:bg-milk-50 transition-colors"
                        >
                          Back to Basket
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-3 rounded-xl bg-milk-800 text-white text-xs font-bold hover:bg-milk-900 transition-all flex items-center justify-center gap-2 shadow-md hover:scale-[1.01]"
                        >
                          Verify & Confirm (${total.toFixed(2)})
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Checkout Submitting Transition */}
                  {checkoutStep === 'submitting' && (
                    <div className="text-center py-20 px-4 space-y-4">
                      <div className="w-14 h-14 rounded-full border-4 border-milk-200 border-t-milk-700 animate-spin mx-auto" />
                      <h4 className="font-display font-semibold text-lg text-milk-900">Churning your order...</h4>
                      <p className="text-xs text-milk-500 max-w-xs mx-auto">
                        Generating invoice metrics, verifying milk-delivery slots, and locking down your grass-fed premium bundle values.
                      </p>
                    </div>
                  )}

                  {/* Checkout Fresh Success */}
                  {checkoutStep === 'success' && (
                    <div className="text-center py-12 px-2 space-y-6">
                      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-md">
                        <Check className="w-8 h-8" />
                      </div>
                      <div className="space-y-1.5">
                        <h4 className="font-display font-bold text-xl text-milk-900">Wholesome Freshness Secured!</h4>
                        <p className="text-sm text-milk-500">Your order is locked into tomorrow morning\'s delivery cycle.</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-white border border-dashed border-milk-200 text-left text-xs space-y-3 shadow-md max-w-sm mx-auto">
                        <div className="flex justify-between items-center text-milk-400 font-mono">
                          <span>INVOICE NUMBER:</span>
                          <span className="font-bold text-milk-800 font-mono">{orderInvoice}</span>
                        </div>
                        <div className="border-t border-milk-100 my-1" />
                        <div className="space-y-1.5 text-milk-700">
                          <p>🥛 Status: <strong>Fresh Milk Reserved</strong></p>
                          <p>📅 Delivery: <strong>Tomorrow morning before 7:30 AM</strong></p>
                          <p>📍 Location: <strong>{deliveryAddress}</strong></p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleResetCheckout}
                        className="w-full py-3 rounded-xl bg-milk-800 text-white font-semibold text-sm hover:bg-milk-900 transition-colors shadow-md"
                      >
                        Keep Exploring MilkRise
                      </button>
                    </div>
                  )}
                </>
              ) : (
                /* Wishlist Tab Content */
                <div className="space-y-4">
                  {favorites.length === 0 ? (
                    <div className="text-center py-16 px-4">
                      <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-300 flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-8 h-8" />
                      </div>
                      <h3 className="font-display font-semibold text-lg text-milk-900 mb-1">Your wishlist is empty</h3>
                      <p className="text-sm text-milk-500 max-w-xs mx-auto">
                        Tap the heart icons on any of our organic products to accumulate them here for simple quick shopping access.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3.5">
                      {favorites.map((product) => (
                        <div 
                          key={product.id} 
                          className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-milk-100 shadow-sm transition-all hover:border-milk-200"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            decoding="async"
                            className="w-16 h-16 object-cover rounded-xl shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-display font-semibold text-sm text-milk-900 truncate">{product.name}</h4>
                            <p className="text-xs text-milk-500 font-mono mb-1.5">{product.unit} • ${product.price.toFixed(2)}</p>
                            <button
                              onClick={() => {
                                onAddFromFavorites(product, product.sizes[0]);
                                setActiveTab('cart');
                              }}
                              className="px-3 py-1 rounded-lg bg-orange-50 text-butter-600 border border-orange-100 hover:bg-orange-100 transition-colors text-[10px] font-bold uppercase tracking-wider"
                            >
                              Add to Basket
                            </button>
                          </div>
                          <button
                            onClick={() => onRemoveFavorite(product.id)}
                            className="text-rose-400 hover:text-rose-600 p-2 rounded-lg hover:bg-rose-50 transition-colors shrink-0"
                            title="Remove from favorites"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sticky Order Totals summary block at base of cart */}
            {activeTab === 'cart' && cartItems.length > 0 && checkoutStep === 'idle' && (
              <div className="p-4 md:p-6 border-t border-milk-100 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
                <div className="space-y-2.5 mb-4">
                  <div className="flex justify-between text-sm text-milk-600">
                    <span>Products Subtotal</span>
                    <span className="font-mono font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-milk-600 items-center">
                    <span className="flex items-center gap-1">
                      Fresh Farm Courier 
                      {deliveryFee === 0 && (
                        <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-1.5 py-0.5 rounded uppercase font-mono">
                          Free Over $30
                        </span>
                      )}
                    </span>
                    <span className="font-mono font-medium">
                      {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="border-t border-milk-50 my-1" />
                  <div className="flex justify-between items-center text-milk-900">
                    <span className="font-display font-semibold">Total Order Value</span>
                    <span className="font-display font-bold text-lg text-milk-800 font-mono">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setCheckoutStep('shipping')}
                    className="w-full py-3.5 rounded-xl bg-milk-800 text-white font-bold text-sm tracking-wide hover:bg-milk-900 transition-transform active:scale-[0.98] shadow-md shadow-milk-800/10 flex items-center justify-center gap-2"
                  >
                    Proceed to Fresh Delivery Form
                  </button>
                  <button
                    onClick={onClearCart}
                    className="w-full py-1.5 text-xs font-semibold text-milk-400 hover:text-rose-500 transition-colors text-center"
                  >
                    Flush Basket
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
