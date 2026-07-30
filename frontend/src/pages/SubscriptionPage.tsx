import React from 'react';
import { Crown, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const SubscriptionPage: React.FC<{ onOpenSubscription: () => void }> = ({ onOpenSubscription }) => {
  const { isSubscriber, user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 bg-mono-900 text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg">
          <Crown className="w-4 h-4 fill-white" />
          <span>Sensation Unleashed VIP Membership</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-mono-900">
          Shop More. Spend Less. <span className="text-mono-600">Just ₹500/Month.</span>
        </h1>
        <p className="text-mono-500 text-sm max-w-xl mx-auto">
          The ultimate clothing subscription program for Nellore fashion enthusiasts. Unlock wholesale pricing, early sale access, and member-only silk sarees!
        </p>
      </div>

      {/* Active Membership Card if user is subscribed */}
      {isSubscriber && (
        <div className="bg-mono-900 text-white p-8 rounded-3xl shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white text-mono-900 rounded-2xl flex items-center justify-center font-black">
                <Crown className="w-7 h-7 fill-mono-900" />
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-mono-200 block">Status: ACTIVE</span>
                <h3 className="text-2xl font-black">{user ? user.fullName : 'VIP Member'}</h3>
              </div>
            </div>
            <span className="bg-white text-mono-900 text-xs font-black px-3 py-1.5 rounded-full">
              ₹500 / Month
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-mono-700 text-xs">
            <div>
              <span className="block opacity-80 font-bold">Total Savings This Month:</span>
              <span className="text-xl font-black">~₹1,850</span>
            </div>
            <div>
              <span className="block opacity-80 font-bold">Next Billing Date:</span>
              <span className="text-sm font-black">28 Aug 2026</span>
            </div>
            <div>
              <span className="block opacity-80 font-bold">Auto-Renewal Mandate:</span>
              <span className="text-sm font-black text-mono-200">PhonePe UPI Active</span>
            </div>
          </div>
        </div>
      )}

      {/* Membership Plan Comparison Card */}
      <div className="bg-white border border-mono-200 rounded-3xl p-8 shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
          <div>
            <span className="text-xs font-bold text-mono-500 uppercase tracking-widest">Single All-Inclusive Pass</span>
            <h3 className="text-3xl font-black text-mono-900">VIP Monthly Pass</h3>
          </div>
          <div className="text-right">
            <span className="text-4xl font-black text-mono-900">₹500</span>
            <span className="text-xs text-mono-500"> / 30 days</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-4">
            <h4 className="font-bold text-mono-900 uppercase text-xs tracking-wider">What You Get:</h4>
            <ul className="space-y-3 text-mono-600 text-xs">
              <li className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-mono-900 flex-shrink-0" />
                <span><strong>Discounted Prices</strong> on sarees, linen shirts & kurtas</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-mono-900 flex-shrink-0" />
                <span><strong>Access to Member-Only Products</strong> (Exclusive Kanchipuram drops)</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-mono-900 flex-shrink-0" />
                <span><strong>24-Hour Express Delivery</strong> across Nellore district</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-mono-900 flex-shrink-0" />
                <span><strong>Early Sale Access</strong> (Be first during Diwali & Ugadi sales)</span>
              </li>
            </ul>
          </div>

          <div className="bg-mono-50 p-6 rounded-2xl border border-gray-200 space-y-4 flex flex-col justify-between">
            <div>
              <span className="text-xs text-mono-500 block mb-1">Average Subscriber Savings</span>
              <p className="text-xs text-mono-600">
                A single festive saree purchase of ₹4,999 drops to <strong>₹3,499</strong> for VIP members—saving you <strong>₹1,500 instantly</strong> on your very first order!
              </p>
            </div>

            <button
              onClick={onOpenSubscription}
              className="w-full py-3.5 bg-mono-900 hover:bg-mono-800 text-white font-black text-sm rounded-xl shadow-xl"
            >
              {isSubscriber ? 'Manage Renewal Settings' : 'Subscribe Now for ₹500/mo'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
