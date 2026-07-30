import React, { useState } from 'react';
import { X, Crown, CheckCircle2, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const SubscriptionModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { activateSubscription, user } = useAuth();
  const isAdmin = user?.role === 'ROLE_ADMIN';
  const [selectedMethod, setSelectedMethod] = useState<'UPI' | 'CARD' | 'NETBANKING'>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubscribe = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      activateSubscription();
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1800);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-mono-950/85 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-gray-200 p-6 md:p-8 shadow-2xl text-mono-900 overflow-hidden">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-mono-500 hover:text-mono-900 rounded-full hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-mono-900 text-white font-black mx-auto flex items-center justify-center animate-bounce">
              <Crown className="w-10 h-10 fill-white" />
            </div>
            <h3 className="text-2xl font-black text-mono-900">Welcome to Sensation VIP!</h3>
            <p className="text-sm text-mono-600">Your ₹500/month subscription is ACTIVE. Exclusive subscriber pricing is now enabled across the entire store!</p>
          </div>
        ) : isAdmin ? (
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-mono-900 flex items-center justify-center text-white shadow-lg">
                <Crown className="w-6 h-6 fill-white" />
              </div>
              <div>
                <span className="text-xs font-bold text-mono-500 uppercase tracking-widest">Admin Account</span>
                <h2 className="text-2xl font-black">Permanent VIP Access</h2>
              </div>
            </div>

            <div className="bg-mono-50 p-4 rounded-2xl border border-gray-200">
              <p className="text-sm text-mono-700">
                Admin users already have permanent VIP privileges. No monthly subscription is required.
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-4 bg-mono-900 hover:bg-mono-800 text-white font-black text-sm rounded-xl shadow-xl transition-transform hover:scale-[1.02]"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-mono-900 flex items-center justify-center text-white shadow-lg">
                <Crown className="w-6 h-6 fill-white" />
              </div>
              <div>
                <span className="text-xs font-bold text-mono-500 uppercase tracking-widest">Exclusive Membership</span>
                <h2 className="text-2xl font-black">Sensation VIP Club</h2>
              </div>
            </div>

            {/* Price Badge */}
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-mono-500 block">Monthly Subscription Fee</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-mono-900">₹500</span>
                  <span className="text-xs text-mono-500">/ month</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] bg-mono-100 text-mono-700 border border-mono-200 px-2.5 py-1 rounded-full font-bold">
                  Save ~₹2,500/mo avg
                </span>
              </div>
            </div>

            {/* VIP Perks List */}
            <div className="space-y-2.5 text-xs text-mono-600">
              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-mono-900 flex-shrink-0 mt-0.5" />
                <span><strong>Member-Only Discount Prices</strong> on all ready-made clothing & silk sarees</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-mono-900 flex-shrink-0 mt-0.5" />
                <span><strong>Early Access</strong> to upcoming festival sales & weaver drops</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-mono-900 flex-shrink-0 mt-0.5" />
                <span><strong>Exclusive VIP Products</strong> (Kanchipuram Silk Sarees, Designer Suits)</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-mono-900 flex-shrink-0 mt-0.5" />
                <span><strong>Priority Nellore Support Line</strong> & instant return processing</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="text-xs font-bold text-mono-500 block mb-2">Select Payment Gateway:</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedMethod('UPI')}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    selectedMethod === 'UPI'
                      ? 'border-mono-900 bg-mono-100 text-mono-900'
                      : 'border-gray-200 bg-white text-mono-500'
                  }`}
                >
                  UPI (GPay / PhonePe)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedMethod('CARD')}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    selectedMethod === 'CARD'
                      ? 'border-mono-900 bg-mono-100 text-mono-900'
                      : 'border-gray-200 bg-white text-mono-500'
                  }`}
                >
                  Credit / Debit Card
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedMethod('NETBANKING')}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    selectedMethod === 'NETBANKING'
                      ? 'border-mono-900 bg-mono-100 text-mono-900'
                      : 'border-gray-200 bg-white text-mono-500'
                  }`}
                >
                  Net Banking
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubscribe}
              disabled={isProcessing}
              className="w-full py-4 bg-mono-900 hover:bg-mono-800 text-white font-black text-sm rounded-xl shadow-xl flex items-center justify-center space-x-2 transition-transform hover:scale-[1.02]"
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Pay ₹500 & Activate VIP Club</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
