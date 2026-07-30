import React from 'react';
import { Crown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';
import { useProduct } from '../context/ProductContext';
import logo from '../assets/logo.png';

export const HomePage: React.FC<{ onOpenSubscription: () => void }> = ({ onOpenSubscription }) => {
  const { isSubscriber, user } = useAuth();
  const isAdmin = user?.role === 'ROLE_ADMIN';
  const { products } = useProduct();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-3xl bg-mono-950 border border-mono-800 p-8 md:p-16">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-mono-800 to-transparent pointer-events-none" />
        
        <div className="max-w-2xl relative z-10 space-y-6">
          <div className="h-20 w-[220px] overflow-hidden rounded-2xl bg-white shadow-sm">
            <img
              src={logo}
              alt="Sensation Unleashed"
              className="h-full w-full object-cover"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight">
            Sensation <span className="text-mono-200 block">- Feel The Fashion</span>
          </h1>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to="/shop"
              className="px-6 py-3.5 bg-mono-900 hover:bg-mono-800 text-white font-black text-sm rounded-xl shadow-xl flex items-center space-x-2 transition-transform hover:scale-105"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {!isSubscriber && !isAdmin && (
              <button
                onClick={onOpenSubscription}
                className="px-6 py-3.5 bg-white hover:bg-gray-100 text-mono-900 border border-mono-300 font-bold text-sm rounded-xl flex items-center space-x-2 transition-transform hover:scale-105"
              >
                <Crown className="w-4 h-4" />
                <span>Join VIP Club (₹500/mo)</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Subscription Value Highlight Banner */}
      <section className="bg-mono-100 rounded-3xl border border-mono-200 p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-mono-900 flex items-center justify-center text-white flex-shrink-0 shadow-lg">
            <Crown className="w-8 h-8 fill-white" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-mono-900">Why Pay Regular Price?</h3>
            <p className="text-mono-600 text-sm">
              Subscribe for <strong>₹500/month</strong> and save up to ₹1,500 on sarees & suits. Cancel anytime!
            </p>
          </div>
        </div>

        {!isAdmin ? (
          <button
            onClick={onOpenSubscription}
            className="px-6 py-3 bg-mono-900 hover:bg-mono-800 text-white font-black text-sm rounded-xl shadow-xl transition-transform hover:scale-105 whitespace-nowrap"
          >
            {isSubscriber ? 'Manage VIP Membership' : 'Activate VIP for ₹500'}
          </button>
        ) : (
          <span className="inline-flex items-center px-4 py-3 rounded-xl bg-mono-50 text-mono-700 text-sm font-semibold">
            Admin accounts already have VIP access.
          </span>
        )}
      </section>

      {/* Featured Products Grid */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-black text-mono-900">Trending Arrivals</h2>
          </div>
          <Link to="/shop" className="text-xs font-bold text-mono-900 hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} onOpenSubscription={onOpenSubscription} />
          ))}
        </div>
      </section>

      {/* Nellore Physical Store Notice */}
      <section className="bg-white rounded-3xl p-8 border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2">
          <span className="text-xs font-bold text-mono-500 uppercase tracking-wider">Visit Us Offline</span>
          <h3 className="text-2xl font-black text-mono-900">Sensation Retail Store, Nellore</h3>
          <p className="text-mono-500 text-sm max-w-xl">
            Main Bazaar Road, Near Trunk Road, Nellore, AP - 524001. Experience fabrics in person or pick up your online VIP orders directly in store!
          </p>
        </div>
        <div className="bg-mono-50 px-6 py-4 rounded-2xl border border-gray-200 text-center">
          <span className="text-xs text-mono-500 block">Store Hours</span>
          <span className="text-sm font-bold text-mono-900">10:00 AM - 9:30 PM (Mon-Sun)</span>
        </div>
      </section>
    </div>
  );
};
