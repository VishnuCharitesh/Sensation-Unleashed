import React, { useState } from 'react';
import { CheckCircle2, Lock, MapPin, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useProduct } from '../context/ProductContext';
import { useOrders } from '../context/OrderContext';

export const CheckoutPage: React.FC = () => {
  const { cart, totalAmount, totalSavings, clearCart } = useCart();
  const { isSubscriber, user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: user ? user.fullName : '',
    phone: user ? user.phone : '',
    pincode: '524001',
    street: 'Main Bazaar Road, Near Trunk Road',
    city: 'Nellore',
    state: 'Andhra Pradesh'
  });

  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'NETBANKING'>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (cart.length === 0 && !orderCompleted) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold text-mono-900">Your Cart is Empty</h2>
        <button
          onClick={() => navigate('/shop')}
          className="px-6 py-2.5 bg-mono-900 text-white font-bold text-xs rounded-xl"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const { decrementVariantStock } = useProduct();
  const { addOrder } = useOrders();

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const createdOrder = addOrder(
        cart,
        user ? user.id : 'guest',
        user ? user.email : 'guest@example.com',
        user ? user.fullName : 'Guest Customer',
        isSubscriber,
        paymentMethod
      );
      cart.forEach((item) => {
        decrementVariantStock(item.product.id, item.selectedVariant.id, item.quantity);
      });
      setOrderNumber(createdOrder.orderNumber);
      setOrderCompleted(true);
      clearCart();
      setIsProcessing(false);
    }, 1500);
  };

  if (orderCompleted) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-6 bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
        <div className="w-16 h-16 bg-mono-900 text-white rounded-full mx-auto flex items-center justify-center font-black">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div>
          <span className="text-xs font-bold text-mono-500 uppercase tracking-widest block">Payment Successful</span>
          <h2 className="text-2xl font-black text-mono-900 mt-1">Order Confirmed!</h2>
          <p className="text-xs text-mono-500 font-mono mt-1">Order ID: {orderNumber}</p>
        </div>

        <p className="text-xs text-mono-500 leading-relaxed">
          Thank you for shopping with Sensation Unleashed! Your order will be fulfilled from our Nellore warehouse within <strong>24-48 hours</strong>. Transaction receipt sent to your phone/email.
        </p>

        <button
          onClick={() => navigate('/shop')}
          className="w-full py-3 bg-mono-900 text-white font-bold text-xs rounded-xl hover:bg-mono-800"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-black text-mono-900">Checkout & Delivery</h1>
        <p className="text-xs text-mono-500">Provide shipping details & pay via Razorpay/PhonePe UPI</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Details */}
        <form onSubmit={handlePlaceOrder} className="lg:col-span-2 space-y-6">
          {/* Address Section */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4">
            <div className="flex items-center space-x-2 text-mono-900 font-bold text-sm">
              <MapPin className="w-4 h-4" />
              <h3>Shipping Address (Nellore & AP)</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-mono-500 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  className="w-full bg-gray-50 text-mono-900 rounded-xl p-2.5 border border-gray-200"
                />
              </div>
              <div>
                <label className="text-mono-500 block mb-1">Phone Number (WhatsApp)</label>
                <input
                  type="text"
                  required
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  className="w-full bg-gray-50 text-mono-900 rounded-xl p-2.5 border border-gray-200"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-mono-500 block mb-1">Door No, Street & Landmark</label>
                <input
                  type="text"
                  required
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  className="w-full bg-gray-50 text-mono-900 rounded-xl p-2.5 border border-gray-200"
                />
              </div>
              <div>
                <label className="text-mono-500 block mb-1">City / Mandal</label>
                <input
                  type="text"
                  required
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="w-full bg-gray-50 text-mono-900 rounded-xl p-2.5 border border-gray-200"
                />
              </div>
              <div>
                <label className="text-mono-500 block mb-1">Pincode (e.g. 524001)</label>
                <input
                  type="text"
                  required
                  value={address.pincode}
                  onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                  className="w-full bg-gray-50 text-mono-900 rounded-xl p-2.5 border border-gray-200"
                />
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4">
            <div className="flex items-center space-x-2 text-mono-900 font-bold text-sm">
              <CreditCard className="w-4 h-4" />
              <h3>Select Payment Gateway</h3>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('UPI')}
                className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                  paymentMethod === 'UPI'
                    ? 'border-mono-900 bg-mono-100 text-mono-900'
                    : 'border-gray-200 bg-gray-50 text-mono-500'
                }`}
              >
                UPI Intent (GPay / PhonePe)
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('CARD')}
                className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                  paymentMethod === 'CARD'
                    ? 'border-mono-900 bg-mono-100 text-mono-900'
                    : 'border-gray-200 bg-gray-50 text-mono-500'
                }`}
              >
                Cards (Visa/Master/RuPay)
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('NETBANKING')}
                className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                  paymentMethod === 'NETBANKING'
                    ? 'border-mono-900 bg-mono-100 text-mono-900'
                    : 'border-gray-200 bg-gray-50 text-mono-500'
                }`}
              >
                Net Banking
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-4 bg-mono-900 hover:bg-mono-800 text-white font-black text-sm rounded-xl shadow-xl flex items-center justify-center space-x-2"
          >
            {isProcessing ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Pay ₹{totalAmount} & Place Order</span>
              </>
            )}
          </button>
        </form>

        {/* Order Summary Sidebar */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 h-fit space-y-4">
          <h3 className="font-bold text-mono-900 text-base border-b border-gray-200 pb-3">Order Summary</h3>

          <div className="space-y-3 max-h-60 overflow-y-auto text-xs">
            {cart.map(item => (
              <div key={item.selectedVariant.id} className="flex justify-between items-center text-mono-600">
                <div>
                  <span className="font-semibold block text-mono-900">{item.product.name}</span>
                  <span className="text-[10px] text-mono-400">Size: {item.selectedVariant.size} x {item.quantity}</span>
                </div>
                <span className="font-bold text-mono-900">
                  ₹{(isSubscriber ? item.product.subscriberPrice : item.product.regularPrice) * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-3 space-y-2 text-xs text-mono-500">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="text-mono-900 font-bold">₹{totalAmount}</span>
            </div>
            {isSubscriber && (
              <div className="flex justify-between text-mono-700 font-semibold">
                <span>VIP Member Savings:</span>
                <span>-₹{totalSavings}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Nellore Shipping:</span>
              <span className="text-mono-900 font-bold">FREE</span>
            </div>
            <div className="flex justify-between text-lg text-mono-900 font-black pt-2 border-t border-gray-200">
              <span>Total Payable:</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
