import React from 'react';
import { Crown, Lock, ShoppingBag, Star } from 'lucide-react';
import type { Product } from '../types';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const ProductCard: React.FC<{ product: Product; onOpenSubscription: () => void }> = ({ product, onOpenSubscription }) => {
  const { isSubscriber } = useAuth();
  const { addToCart } = useCart();

  const isLocked = product.isSubscriberExclusive && !isSubscriber;
  const currentPrice = isSubscriber ? product.subscriberPrice : product.regularPrice;
  const savings = product.regularPrice - product.subscriberPrice;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLocked) {
      onOpenSubscription();
      return;
    }
    if (product.variants && product.variants.length > 0) {
      addToCart(product, product.variants[0]);
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-200 hover:border-mono-900 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-sm">
      {/* Product Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Exclusive VIP Badge */}
        {product.isSubscriberExclusive && (
          <div className="absolute top-3 left-3 bg-mono-900 text-white font-black text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg">
            <Crown className="w-3.5 h-3.5 fill-white" />
            <span>VIP Member Drop</span>
          </div>
        )}

        {/* Savings Tag */}
        {savings > 0 && (
          <div className="absolute top-3 right-3 bg-mono-900 text-white font-extrabold text-[10px] px-2 py-0.5 rounded">
            Save ₹{savings} with VIP
          </div>
        )}

        {/* Lock Overlay for Subscriber Exclusive items */}
        {isLocked && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-mono-100 border border-mono-300 flex items-center justify-center text-mono-900 mb-2">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="text-mono-900 font-bold text-sm mb-1">Subscriber Exclusive</h4>
            <p className="text-mono-500 text-xs mb-3">Join Sensation VIP Club for ₹500/mo to unlock this saree/suit!</p>
            <button
              onClick={onOpenSubscription}
              className="bg-mono-900 hover:bg-mono-800 text-white font-bold text-xs px-4 py-2 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              Unlock for ₹500
            </button>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-mono-500 mb-1">
            <span className="font-semibold text-mono-900 uppercase tracking-wider">{product.categoryName}</span>
            <span className="flex items-center gap-1 text-mono-900 font-bold">
              <Star className="w-3 h-3 fill-mono-900" /> {product.rating}
            </span>
          </div>

          <h3 className="font-bold text-mono-900 text-base mb-2 group-hover:text-mono-700 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </div>

        {/* Price Breakdown */}
        <div className="pt-2 border-t border-gray-200">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-xs text-mono-500 block">Price:</span>
              <div className="flex items-baseline gap-2">
                <span className={`text-lg font-black ${isSubscriber ? 'text-mono-900' : 'text-mono-900'}`}>
                  ₹{currentPrice}
                </span>
                {isSubscriber ? (
                  <span className="text-xs text-mono-400 line-through">₹{product.regularPrice}</span>
                ) : (
                  <span className="text-xs text-mono-600 font-semibold">(VIP: ₹{product.subscriberPrice})</span>
                )}
              </div>
            </div>

            {isSubscriber && (
              <span className="text-[10px] font-bold text-mono-700 bg-mono-100 px-2 py-0.5 rounded border border-mono-200">
                VIP Applied
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isLocked}
            className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all ${
              isLocked
                ? 'bg-gray-100 text-mono-400 cursor-not-allowed border border-gray-200'
                : isSubscriber
                ? 'bg-mono-900 hover:bg-mono-800 text-white shadow-md'
                : 'bg-white hover:bg-mono-900 hover:text-white text-mono-900 border border-mono-900'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{isLocked ? 'VIP Required' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
