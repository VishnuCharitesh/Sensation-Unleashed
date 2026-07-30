import React from 'react';
import { Sparkles, Clock } from 'lucide-react';
import { useProduct } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';

export const OffersPage: React.FC<{ onOpenSubscription: () => void }> = ({ onOpenSubscription }) => {
  const { products } = useProduct();
  const offerProducts = products.filter(p => p.isEarlyAccess || p.isSubscriberExclusive);

  return (
    <div className="space-y-8 pb-12">
      <div className="bg-mono-50 p-8 rounded-3xl border border-mono-200 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-white border border-mono-300 text-mono-900 text-xs font-bold px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Festive Discounts & Early Access</span>
          </div>
          <h1 className="text-3xl font-black text-mono-900">Nellore Seasonal Offers</h1>
          <p className="text-mono-500 text-xs mt-1">Special weaver promotions & member exclusive deals</p>
        </div>
        <div className="bg-white px-5 py-3 rounded-2xl border border-mono-200 text-center">
          <span className="text-[10px] text-mono-500 block uppercase font-bold">Offer Ends In</span>
          <span className="text-lg font-black text-mono-900 flex items-center gap-1">
            <Clock className="w-4 h-4" /> 04 Days : 12 Hours
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {offerProducts.map(product => (
          <ProductCard key={product.id} product={product} onOpenSubscription={onOpenSubscription} />
        ))}
      </div>
    </div>
  );
};
