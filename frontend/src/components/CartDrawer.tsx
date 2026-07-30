import React from 'react';
import { X, Trash2, Crown, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const CartDrawer: React.FC<{ onOpenSubscription: () => void }> = ({ onOpenSubscription }) => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalAmount, totalSavings } = useCart();
  const { isSubscriber } = useAuth();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-mono-950/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-gray-200 shadow-2xl flex flex-col justify-between text-mono-900">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-mono-900" />
              <h2 className="text-lg font-bold">Your Cart ({cart.length})</h2>
            </div>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-mono-500 hover:text-mono-900 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-12 text-mono-400">
                <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-mono-300" />
                <p className="font-semibold text-sm text-mono-900">Your cart is currently empty.</p>
                <p className="text-xs text-mono-500 mt-1">Explore our Nellore retail collection!</p>
              </div>
            ) : (
              cart.map(item => {
                const price = isSubscriber ? item.product.subscriberPrice : item.product.regularPrice;
                return (
                  <div key={item.selectedVariant.id} className="flex space-x-4 bg-gray-50 p-3 rounded-xl border border-gray-200">
                    <img 
                      src={item.product.imageUrl} 
                      alt={item.product.name}
                      className="w-16 h-20 object-cover rounded-lg bg-gray-100" 
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-mono-900 line-clamp-1">{item.product.name}</h4>
                        <p className="text-xs text-mono-500">
                          Size: <span className="text-mono-900 font-semibold">{item.selectedVariant.size}</span> | Color: {item.selectedVariant.color}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                          <button 
                            onClick={() => updateQuantity(item.selectedVariant.id, item.quantity - 1)}
                            className="px-2 py-0.5 text-xs text-mono-500 hover:text-mono-900 hover:bg-gray-100"
                          >-</button>
                          <span className="px-2 text-xs font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.selectedVariant.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-xs text-mono-500 hover:text-mono-900 hover:bg-gray-100"
                          >+</button>
                        </div>

                        <div className="text-right">
                          <span className="font-extrabold text-sm text-mono-900">₹{price * item.quantity}</span>
                          {isSubscriber && (
                            <span className="block text-[10px] text-mono-600 font-semibold">VIP Price</span>
                          )}
                        </div>

                        <button 
                          onClick={() => removeFromCart(item.selectedVariant.id)}
                          className="text-mono-400 hover:text-mono-900 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-gray-200 bg-gray-50 space-y-4">
              {/* VIP Savings Prompt */}
              {isSubscriber ? (
                <div className="bg-mono-100 border border-mono-200 rounded-xl p-3 flex items-center justify-between text-xs text-mono-700">
                  <div className="flex items-center space-x-2">
                    <Crown className="w-4 h-4 text-mono-900 fill-mono-900" />
                    <span>Your VIP ₹500/mo Member Savings:</span>
                  </div>
                  <span className="font-extrabold text-sm">₹{totalSavings} Saved</span>
                </div>
              ) : (
                <div className="bg-gray-100 p-3 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="text-mono-900 font-bold block">Unlock VIP Member Price</span>
                    <span className="text-mono-500 text-[11px]">Save up to ₹700 on this order</span>
                  </div>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      onOpenSubscription();
                    }}
                    className="bg-mono-900 text-white font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-mono-800"
                  >
                    Join ₹500/mo
                  </button>
                </div>
              )}

              <div className="space-y-1.5 text-xs text-mono-500">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-mono-900 font-bold">₹{totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Nellore Delivery:</span>
                  <span className="text-mono-900 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-base text-mono-900 font-extrabold pt-2 border-t border-gray-200">
                  <span>Total Amount:</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3.5 bg-mono-900 hover:bg-mono-800 text-white font-black text-sm rounded-xl shadow-lg flex items-center justify-center space-x-2 transition-transform hover:scale-[1.02]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
