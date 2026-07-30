import React, { useState } from 'react';
import { Shield, DollarSign, Crown, ShoppingBag, Users, Package } from 'lucide-react';
import { INITIAL_ANALYTICS, INITIAL_PRODUCTS } from '../data/mockData';

export const AdminDashboardPage: React.FC = () => {
  const [stats] = useState(INITIAL_ANALYTICS);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  const handleUpdateStock = (productId: string, variantId: string, newStock: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const updatedVariants = p.variants.map(v => v.id === variantId ? { ...v, stock: newStock } : v);
        return { ...p, variants: updatedVariants };
      }
      return p;
    }));
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-mono-900 text-white text-xs font-bold px-3 py-1 rounded-full mb-1">
            <Shield className="w-3.5 h-3.5" />
            <span>Enterprise Admin Portal</span>
          </div>
          <h1 className="text-3xl font-black text-mono-900">Sensation Business Intelligence</h1>
        </div>
        <span className="text-xs text-mono-700 font-bold bg-mono-100 px-3 py-1.5 rounded-full border border-mono-200">
          System Status: Online (Nellore Node)
        </span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-mono-500 text-xs">
            <span>Total Sales Revenue</span>
            <DollarSign className="w-4 h-4 text-mono-900" />
          </div>
          <span className="text-2xl font-black text-mono-900 block">₹{stats.totalRevenue.toLocaleString()}</span>
          <span className="text-[10px] text-mono-600 font-semibold">+18.4% vs last month</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-mono-500 text-xs">
            <span>VIP Subscriber Revenue</span>
            <Crown className="w-4 h-4 text-mono-900" />
          </div>
          <span className="text-2xl font-black text-mono-900 block">₹{stats.monthlySubscriptionRevenue.toLocaleString()}</span>
          <span className="text-[10px] text-mono-600 font-semibold">{stats.totalSubscribers} Active VIPs (₹500/mo)</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-mono-500 text-xs">
            <span>Total Orders Fulfilled</span>
            <ShoppingBag className="w-4 h-4 text-mono-900" />
          </div>
          <span className="text-2xl font-black text-mono-900 block">{stats.totalOrders}</span>
          <span className="text-[10px] text-mono-600 font-semibold">{stats.pendingOrders} Orders Processing</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-mono-500 text-xs">
            <span>Total Registered Accounts</span>
            <Users className="w-4 h-4 text-mono-900" />
          </div>
          <span className="text-2xl font-black text-mono-900 block">{stats.totalCustomers}</span>
          <span className="text-[10px] text-mono-500">Nellore & AP Customers</span>
        </div>
      </div>

      {/* Inventory & Product Management Table */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-mono-900" />
            <h3 className="font-bold text-mono-900 text-lg">Product Inventory & VIP Pricing Control</h3>
          </div>
          <span className="text-xs text-mono-500 font-medium">Real-time Stock Management</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-mono-600">
            <thead className="bg-mono-50 text-mono-500 uppercase text-[10px] border-b border-gray-200">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Category</th>
                <th className="p-3">Regular Price</th>
                <th className="p-3">VIP Price (₹500 Sub)</th>
                <th className="p-3">Member Exclusive</th>
                <th className="p-3">Variant Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="p-3 flex items-center space-x-3">
                    <img src={p.imageUrl} alt={p.name} className="w-10 h-10 object-cover rounded-lg bg-gray-100" />
                    <div>
                      <span className="font-bold text-mono-900 block">{p.name}</span>
                      <span className="text-[10px] text-mono-400">{p.slug}</span>
                    </div>
                  </td>
                  <td className="p-3 text-mono-600">{p.categoryName}</td>
                  <td className="p-3 font-semibold text-mono-900">₹{p.regularPrice}</td>
                  <td className="p-3 font-bold text-mono-900">₹{p.subscriberPrice}</td>
                  <td className="p-3">
                    {p.isSubscriberExclusive ? (
                      <span className="bg-mono-100 text-mono-900 border border-mono-200 px-2 py-0.5 rounded text-[10px] font-bold">
                        VIP Exclusive
                      </span>
                    ) : (
                      <span className="text-mono-400 text-[10px]">Standard</span>
                    )}
                  </td>
                  <td className="p-3">
                    {p.variants.map(v => (
                      <div key={v.id} className="flex items-center space-x-2 my-1">
                        <span className="w-12 font-mono text-[10px] text-mono-500">{v.size}/{v.color}:</span>
                        <input
                          type="number"
                          value={v.stock}
                          onChange={(e) => handleUpdateStock(p.id, v.id, parseInt(e.target.value) || 0)}
                          className="w-16 bg-gray-50 text-mono-900 rounded px-2 py-0.5 border border-gray-200 text-xs text-center"
                        />
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
