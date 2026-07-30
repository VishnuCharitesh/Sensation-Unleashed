import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Crown, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import logo from '../assets/logo.png';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-mono-950 border-t border-mono-800 text-mono-400 text-sm mt-20">
      {/* Value Proposition Highlights */}
      <div className="max-w-7xl mx-auto px-4 py-8 border-b border-mono-800 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="flex items-center space-x-3">
          <Crown className="w-8 h-8 text-mono-300 flex-shrink-0" />
          <div>
            <h4 className="text-white font-bold text-sm">₹500 VIP Subscription</h4>
            <p className="text-xs text-mono-400">Exclusive member pricing & early access</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Truck className="w-8 h-8 text-mono-300 flex-shrink-0" />
          <div>
            <h4 className="text-white font-bold text-sm">Nellore Express Delivery</h4>
            <p className="text-xs text-mono-400">24-48 hours delivery across Andhra</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <RefreshCw className="w-8 h-8 text-mono-300 flex-shrink-0" />
          <div>
            <h4 className="text-white font-bold text-sm">7-Day Easy Returns</h4>
            <p className="text-xs text-mono-400">Hassle-free return & size exchange</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <ShieldCheck className="w-8 h-8 text-mono-300 flex-shrink-0" />
          <div>
            <h4 className="text-white font-bold text-sm">Secure UPI & Card Payments</h4>
            <p className="text-xs text-mono-400">Powered by Razorpay & PhonePe</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Location */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-12 w-[150px] overflow-hidden rounded-md bg-white">
              <img
                src={logo}
                alt="Sensation Unleashed"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <p className="text-xs text-mono-400 mb-4 leading-relaxed">
            Nellore's leading ready-made clothing retail destination. Premium ethnic silk sarees, linen formals, and modern fashion backed by our exclusive ₹500/mo VIP subscription.
          </p>
          <div className="flex items-center space-x-2 text-xs text-mono-300 font-semibold">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span>Main Bazaar Road, Near Trunk Road, Nellore - 524001</span>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Shopping Categories</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/shop" className="hover:text-mono-900 transition-colors">Silk Sarees & Ethnic Wear</Link></li>
            <li><Link to="/shop" className="hover:text-mono-900 transition-colors">Men's French Linen Shirts</Link></li>
            <li><Link to="/shop" className="hover:text-mono-900 transition-colors">Festive Kurta Sets</Link></li>
            <li><Link to="/shop" className="hover:text-mono-900 transition-colors">Women's Stretch Denim</Link></li>
            <li><Link to="/shop" className="hover:text-mono-900 transition-colors">Subscriber VIP Exclusive Drops</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">VIP Subscription Perks</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/subscription" className="hover:text-mono-900 transition-colors">₹500/Month Membership Plan</Link></li>
            <li><Link to="/subscription" className="hover:text-mono-900 transition-colors">Member-Only Exclusive Prices</Link></li>
            <li><Link to="/subscription" className="hover:text-mono-900 transition-colors">Early Access Festive Sales</Link></li>
            <li><Link to="/support" className="hover:text-mono-900 transition-colors">VIP Customer Support Line</Link></li>
            <li><Link to="/subscription" className="hover:text-mono-900 transition-colors">Manage Auto-Renewal</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Contact & Support</h4>
          <div className="space-y-3 text-xs">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-mono-300" />
              <span>+91 98480 12345 (Nellore Store)</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-mono-300" />
              <span>support@sensationunleashed.in</span>
            </div>
            <div className="pt-2">
              <span className="block text-[10px] text-mono-500 uppercase tracking-widest font-bold mb-1">Supported Payments</span>
              <div className="flex space-x-2 text-[10px] text-mono-300 font-medium">
                <span className="bg-mono-900 text-white px-2 py-1 rounded border border-mono-800">UPI / GPay</span>
                <span className="bg-mono-900 text-white px-2 py-1 rounded border border-mono-800">PhonePe</span>
                <span className="bg-mono-900 text-white px-2 py-1 rounded border border-mono-800">Cards</span>
                <span className="bg-mono-900 text-white px-2 py-1 rounded border border-mono-800">Net Banking</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-mono-900 py-6 text-center text-xs text-mono-500">
        <p className="mb-2">© {currentYear} Sensation Unleashed Clothing Retail, Nellore. All rights reserved.</p>
        <p>Built for local shoppers, VIP members, and fast Nellore delivery.</p>
      </div>
    </footer>
  );
};
