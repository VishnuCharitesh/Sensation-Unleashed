import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { OrderProvider } from './context/OrderContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SubscriptionModal } from './components/SubscriptionModal';
import { LiveChatWidget } from './components/LiveChatWidget';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { SubscriptionPage } from './pages/SubscriptionPage';
import { OffersPage } from './pages/OffersPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { SupportPage } from './pages/SupportPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { LoginPage } from './pages/LoginPage';
import { useAuth } from './context/AuthContext';

const AdminRoute: React.FC = () => {
  const { role } = useAuth();
  return role === 'ROLE_ADMIN' ? <AdminDashboardPage /> : <Navigate to="/" replace />;
};

export function App() {
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);

  return (
    <AuthProvider>
      <ProductProvider>
        <OrderProvider>
          <CartProvider>
            <BrowserRouter>
              <div className="min-h-screen bg-white text-mono-950 flex flex-col justify-between selection:bg-mono-900 selection:text-white">
                <Navbar onOpenSubscription={() => setIsSubModalOpen(true)} />

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex-1 w-full">
                  <Routes>
                    <Route path="/" element={<HomePage onOpenSubscription={() => setIsSubModalOpen(true)} />} />
                    <Route path="/shop" element={<ShopPage onOpenSubscription={() => setIsSubModalOpen(true)} />} />
                    <Route path="/subscription" element={<SubscriptionPage onOpenSubscription={() => setIsSubModalOpen(true)} />} />
                    <Route path="/offers" element={<OffersPage onOpenSubscription={() => setIsSubModalOpen(true)} />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/support" element={<SupportPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/admin" element={<AdminRoute />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>

                <Footer />

                <CartDrawer onOpenSubscription={() => setIsSubModalOpen(true)} />
                <SubscriptionModal isOpen={isSubModalOpen} onClose={() => setIsSubModalOpen(false)} />
                <LiveChatWidget />
              </div>
            </BrowserRouter>
          </CartProvider>
        </OrderProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
