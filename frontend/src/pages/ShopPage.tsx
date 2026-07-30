import React, { useEffect, useState } from 'react';
import { Filter, Search, Crown } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';

export const ShopPage: React.FC<{ onOpenSubscription: () => void }> = ({ onOpenSubscription }) => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [onlyExclusive, setOnlyExclusive] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>(() => searchParams.get('q') ?? '');
  const { products } = useProduct();

  useEffect(() => {
    setSearchQuery(searchParams.get('q') ?? '');
  }, [searchParams]);

  const categories = ['ALL', 'Ethnic & Festive', "Men's Formals", "Women's Western"];

  const filteredProducts = products.filter(p => {
    if (selectedCategory !== 'ALL' && p.categoryName !== selectedCategory) return false;
    if (onlyExclusive && !p.isSubscriberExclusive) return false;
    if (searchQuery.trim() && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-black text-mono-900">Clothing Store Catalog</h1>
          <p className="text-sm text-mono-500">Nellore Ready-Made Apparel & Pure Silk Sarees</p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 text-mono-900 text-xs rounded-xl pl-9 pr-4 py-2.5 border border-gray-200 focus:outline-none focus:border-mono-900"
          />
          <Search className="w-4 h-4 text-mono-400 absolute left-3 top-3" />
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-200">
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-4 h-4 text-mono-900 flex-shrink-0" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-mono-900 text-white shadow-md'
                  : 'bg-white text-mono-500 hover:text-mono-900 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Subscriber Exclusive Filter Toggle */}
        <label className="flex items-center space-x-2 text-xs text-mono-900 font-bold cursor-pointer select-none">
          <input
            type="checkbox"
            checked={onlyExclusive}
            onChange={(e) => setOnlyExclusive(e.target.checked)}
            className="w-4 h-4 accent-mono-900 rounded cursor-pointer"
          />
          <Crown className="w-4 h-4 fill-mono-900" />
          <span>VIP Member Drops Only</span>
        </label>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 text-mono-400">
          <p className="font-semibold text-lg text-mono-900">No clothing items match your search filter.</p>
          <button
            onClick={() => { setSelectedCategory('ALL'); setOnlyExclusive(false); setSearchQuery(''); }}
            className="mt-3 text-xs text-mono-900 hover:underline font-bold"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onOpenSubscription={onOpenSubscription} />
          ))}
        </div>
      )}
    </div>
  );
};
