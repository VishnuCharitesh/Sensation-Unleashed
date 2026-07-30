import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Crown, User as UserIcon, Search, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';

export const Navbar: React.FC<{ onOpenSubscription: () => void }> = ({ onOpenSubscription }) => {
  const { user, isSubscriber, logout } = useAuth();
  const { itemCount, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-mono-900">
            <img
              src={logo}
              alt="Sensation Unleashed"
              className="h-12 w-auto max-h-[50px] max-w-[180px] object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </Link>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <input
              type="text"
              placeholder="Search silk sarees, linen shirts, ethnic wear..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 text-mono-900 placeholder-mono-400 text-sm rounded-full pl-10 pr-4 py-2.5 border border-gray-200 focus:outline-none focus:border-mono-900 transition-all"
            />
            <Search className="w-4 h-4 text-mono-400 absolute left-3.5 top-3" />
          </form>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
            <Link to="/shop" className="text-mono-600 hover:text-mono-900 transition-colors">Shop Catalog</Link>
            <Link to="/subscription" className="text-mono-600 hover:text-mono-900 transition-colors flex items-center gap-1">
              <Crown className="w-4 h-4 text-mono-900" />
              <span>VIP Membership</span>
            </Link>
            <Link to="/offers" className="text-mono-600 hover:text-mono-900 transition-colors">Festive Offers</Link>
            <Link to="/support" className="text-mono-600 hover:text-mono-900 transition-colors">Support</Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-4">
            {/* VIP Status / Subscribe Action */}
            {isSubscriber ? (
              <div className="hidden sm:flex items-center gap-1.5 bg-mono-900 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                <Crown className="w-4 h-4 fill-white" />
                <span>VIP MEMBER (₹500/mo)</span>
              </div>
            ) : (
              <button
                onClick={onOpenSubscription}
                className="hidden sm:flex items-center gap-1.5 bg-mono-900 hover:bg-mono-800 text-white font-bold text-xs px-3.5 py-2 rounded-full shadow-lg transition-all hover:scale-105"
              >
                <Crown className="w-4 h-4" />
                <span>Join VIP (₹500)</span>
              </button>
            )}

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-gray-100 text-mono-900 hover:text-mono-900 border border-gray-200 transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-mono-900 text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Profile Dropdown / Auth */}
            {user ? (
              <div className="flex items-center space-x-2">
                <Link
                  to={isSubscriber ? "/subscription" : "/shop"}
                  className="flex items-center space-x-2 p-2 rounded-xl bg-gray-100 border border-gray-200 hover:border-mono-900 transition-all"
                >
                  <UserIcon className="w-5 h-5 text-mono-900" />
                  <span className="hidden md:inline text-xs font-semibold text-mono-900">{user.fullName.split(' ')[0]}</span>
                </Link>
                <button
                  onClick={logout}
                  className="p-2 rounded-xl bg-gray-100 text-mono-500 hover:text-mono-900 border border-gray-200"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-xs font-semibold text-mono-900 hover:underline"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-gray-100 text-mono-900"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-gray-50 border-t border-gray-200 p-4 space-y-3">
          <form onSubmit={handleSearch} className="relative mb-3">
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 text-mono-900 text-sm rounded-lg pl-9 pr-4 py-2 border border-gray-200"
            />
            <Search className="w-4 h-4 text-mono-400 absolute left-3 top-2.5" />
          </form>

          <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="block text-mono-900 py-2 font-medium">Shop Catalog</Link>
          <Link to="/subscription" onClick={() => setIsMobileMenuOpen(false)} className="block text-mono-900 py-2 font-medium">₹500 VIP Membership</Link>
          <Link to="/offers" onClick={() => setIsMobileMenuOpen(false)} className="block text-mono-900 py-2 font-medium">Festive Offers</Link>
          <Link to="/support" onClick={() => setIsMobileMenuOpen(false)} className="block text-mono-900 py-2 font-medium">Support & FAQ</Link>
        </div>
      )}
    </header>
  );
};
