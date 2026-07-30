import React, { useMemo, useState } from 'react';
import { Shield, DollarSign, Crown, Package, Plus, ArrowRight, BarChart3 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useProduct } from '../context/ProductContext';
import type { Product } from '../types';

const initialNewProduct: Product = {
  id: '',
  name: '',
  slug: '',
  description: '',
  regularPrice: 0,
  subscriberPrice: 0,
  activeUserPrice: 0,
  userSavings: 0,
  isSubscriberExclusive: false,
  isEarlyAccess: false,
  categoryName: '',
  imageUrl: '',
  rating: 4.5,
  variants: []
};

export const AdminDashboardPage: React.FC = () => {
  const { registeredUsers, vipCustomers, normalCustomers } = useAuth();
  const { products, addProduct, updateVariantStock } = useProduct();
  const { orders, updateOrderStatus } = useOrders();

  const [newProduct, setNewProduct] = useState<Product>(initialNewProduct);
  const [newVariant, setNewVariant] = useState({ id: '', sku: '', size: '', color: '', stock: 0 });
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [customerSearch, setCustomerSearch] = useState<string>('');

  const activeAdmins = registeredUsers.filter((user) => user.role === 'ROLE_ADMIN');
  const recentOrders = useMemo(() => orders.slice(0, 5), [orders]);
  const customerSummaries = useMemo(() => registeredUsers.map((customer) => {
    const customerOrders = orders.filter((order) => order.customerId === customer.id);
    return {
      ...customer,
      orderCount: customerOrders.length,
      totalSpent: customerOrders.reduce((sum, order) => sum + order.finalAmount, 0),
      orders: customerOrders
    };
  }), [registeredUsers, orders]);

  const filteredCustomers = useMemo(() => {
    const trimmed = customerSearch.trim().toLowerCase();
    if (!trimmed) return [];
    return customerSummaries.filter((customer) =>
      customer.fullName.toLowerCase().includes(trimmed) ||
      customer.email.toLowerCase().includes(trimmed) ||
      customer.phone.toLowerCase().includes(trimmed)
    );
  }, [customerSearch, customerSummaries]);

  const selectedCustomer = customerSummaries.find((customer) => customer.id === selectedCustomerId);

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.slug || !newProduct.categoryName) return;
    addProduct({ ...newProduct, id: `p-${Date.now()}`, variants: newProduct.variants });
    setNewProduct(initialNewProduct);
  };

  const handleAddVariant = () => {
    if (!newVariant.id || !newVariant.sku) return;
    setNewProduct((prev) => ({
      ...prev,
      variants: [...prev.variants, { ...newVariant, stock: Number(newVariant.stock) }]
    }));
    setNewVariant({ id: '', sku: '', size: '', color: '', stock: 0 });
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-gray-200 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-mono-900 text-white text-xs font-bold px-3 py-1 rounded-full mb-1">
            <Shield className="w-3.5 h-3.5" />
            <span>Admin & VIP Customer Control</span>
          </div>
          <h1 className="text-3xl font-black text-mono-900">Sensation Admin Suite</h1>
          <p className="text-sm text-mono-500">Manage orders, inventory, VIP customers, and all admin operations from one business console.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <span className="text-xs text-mono-500 bg-mono-100 px-3 py-1 rounded-full">Admins: {activeAdmins.length}</span>
          <span className="text-xs text-mono-500 bg-mono-100 px-3 py-1 rounded-full">VIPs: {vipCustomers.length}</span>
          <span className="text-xs text-mono-500 bg-mono-100 px-3 py-1 rounded-full">Customers: {normalCustomers.length}</span>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-mono-500 uppercase tracking-widest">VIP & Customer Summary</p>
              <h2 className="text-xl font-black text-mono-900">Customer Breakdown</h2>
            </div>
            <Crown className="w-5 h-5 text-mono-900" />
          </div>
          <div className="space-y-3 text-sm text-mono-600">
            <div className="flex justify-between border-b border-gray-100 pb-3">
              <span>Total VIP Members</span>
              <span className="font-bold text-mono-900">{vipCustomers.length}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-3">
              <span>Normal Customers</span>
              <span className="font-bold text-mono-900">{normalCustomers.length}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-3">
              <span>Admin Accounts</span>
              <span className="font-bold text-mono-900">{activeAdmins.length}</span>
            </div>
            <div className="mt-4 rounded-3xl bg-mono-50 p-4 text-xs text-mono-500">
              <p className="font-semibold text-mono-900">VIP Insights</p>
              <p>Admin accounts are permanent VIPs. They have priority access to customer data, order history, and payment details.</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-mono-500 uppercase tracking-widest">Orders & payments</p>
              <h2 className="text-xl font-black text-mono-900">Latest Order Activity</h2>
            </div>
            <DollarSign className="w-5 h-5 text-mono-900" />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-mono-600">
              <thead className="bg-mono-50 text-xs uppercase text-mono-500">
                <tr>
                  <th className="px-4 py-3">Order #</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Payment</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-mono-900">{order.orderNumber}</td>
                    <td className="px-4 py-3 text-mono-700">{order.shippingAddress}</td>
                    <td className="px-4 py-3 font-bold text-mono-900">₹{order.finalAmount}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold ${order.orderStatus === 'Processing' ? 'bg-yellow-100 text-yellow-700' : order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-mono-700'}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3">{order.paymentStatus}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => updateOrderStatus(order.id, order.orderStatus === 'Processing' ? 'Delivered' : 'Processing')}
                        className="inline-flex items-center gap-1 rounded-full border border-mono-200 bg-white px-3 py-1 text-xs font-semibold text-mono-900 hover:bg-mono-50"
                      >
                        {order.orderStatus === 'Processing' ? 'Mark Delivered' : 'Set Processing'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-mono-500 uppercase tracking-widest">Inventory control</p>
              <h2 className="text-xl font-black text-mono-900">VIP Product Stock</h2>
            </div>
            <Package className="w-5 h-5 text-mono-900" />
          </div>
          <div className="space-y-4">
            {products.slice(0, 3).map((product) => (
              <div key={product.id} className="rounded-3xl border border-gray-100 p-4 bg-mono-50">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-mono-900">{product.name}</p>
                    <p className="text-xs text-mono-500">{product.categoryName}</p>
                  </div>
                  <span className="text-xs font-bold text-mono-700">₹{product.subscriberPrice}</span>
                </div>
                <div className="space-y-3">
                  {product.variants.map((variant) => (
                    <div key={variant.id} className="grid gap-3 sm:grid-cols-3 items-center">
                      <div>
                        <p className="text-xs text-mono-700 font-semibold">{variant.size} / {variant.color}</p>
                        <p className="text-[10px] text-mono-500">SKU {variant.sku}</p>
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 border border-gray-200">
                        <span className="text-[11px] text-mono-500">Stock</span>
                        <input
                          type="number"
                          value={variant.stock}
                          min={0}
                          onChange={(e) => updateVariantStock(product.id, variant.id, Number(e.target.value))}
                          className="w-16 rounded-lg border border-gray-200 px-2 py-1 text-xs text-mono-900"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-mono-500 uppercase tracking-widest">VIP + admin operations</p>
              <h2 className="text-xl font-black text-mono-900">Add New Product</h2>
            </div>
            <Plus className="w-5 h-5 text-mono-900" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              value={newProduct.name}
              onChange={(e) => setNewProduct((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Product name"
              className="rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-mono-900"
            />
            <input
              value={newProduct.slug}
              onChange={(e) => setNewProduct((prev) => ({ ...prev, slug: e.target.value }))}
              placeholder="Product slug"
              className="rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-mono-900"
            />
            <input
              value={newProduct.categoryName}
              onChange={(e) => setNewProduct((prev) => ({ ...prev, categoryName: e.target.value }))}
              placeholder="Category"
              className="rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-mono-900"
            />
            <input
              value={newProduct.imageUrl}
              onChange={(e) => setNewProduct((prev) => ({ ...prev, imageUrl: e.target.value }))}
              placeholder="Image URL"
              className="rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-mono-900"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3 mt-4">
            <input
              type="number"
              value={newProduct.regularPrice}
              onChange={(e) => setNewProduct((prev) => ({ ...prev, regularPrice: Number(e.target.value) }))}
              placeholder="Regular price"
              className="rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-mono-900"
            />
            <input
              type="number"
              value={newProduct.subscriberPrice}
              onChange={(e) => setNewProduct((prev) => ({ ...prev, subscriberPrice: Number(e.target.value) }))}
              placeholder="VIP price"
              className="rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-mono-900"
            />
            <input
              value={newProduct.description}
              onChange={(e) => setNewProduct((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Description"
              className="rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-mono-900"
            />
          </div>

          <div className="mt-4 rounded-3xl border border-dashed border-gray-200 bg-mono-50 p-4 space-y-3">
            <p className="text-xs font-semibold text-mono-900">Add Variant</p>
            <div className="grid gap-3 sm:grid-cols-4">
              <input
                value={newVariant.id}
                onChange={(e) => setNewVariant((prev) => ({ ...prev, id: e.target.value }))}
                placeholder="Variant id"
                className="rounded-3xl border border-gray-200 bg-white px-4 py-3 text-sm text-mono-900"
              />
              <input
                value={newVariant.sku}
                onChange={(e) => setNewVariant((prev) => ({ ...prev, sku: e.target.value }))}
                placeholder="SKU"
                className="rounded-3xl border border-gray-200 bg-white px-4 py-3 text-sm text-mono-900"
              />
              <input
                value={newVariant.size}
                onChange={(e) => setNewVariant((prev) => ({ ...prev, size: e.target.value }))}
                placeholder="Size"
                className="rounded-3xl border border-gray-200 bg-white px-4 py-3 text-sm text-mono-900"
              />
              <input
                value={newVariant.color}
                onChange={(e) => setNewVariant((prev) => ({ ...prev, color: e.target.value }))}
                placeholder="Color"
                className="rounded-3xl border border-gray-200 bg-white px-4 py-3 text-sm text-mono-900"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2 items-end">
              <input
                type="number"
                value={newVariant.stock}
                onChange={(e) => setNewVariant((prev) => ({ ...prev, stock: Number(e.target.value) }))}
                placeholder="Stock"
                className="rounded-3xl border border-gray-200 bg-white px-4 py-3 text-sm text-mono-900"
              />
              <button
                type="button"
                onClick={handleAddVariant}
                className="rounded-3xl bg-mono-900 px-4 py-3 text-sm font-bold text-white hover:bg-mono-800"
              >
                Add Variant
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleAddProduct}
              className="rounded-3xl bg-mono-900 px-6 py-3 text-sm font-bold text-white hover:bg-mono-800"
            >
              Add New Product
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-3xl border border-gray-200 bg-white px-5 py-3 text-sm text-mono-900 hover:bg-gray-50"
            >
              <ArrowRight className="w-4 h-4" />
              View Product Catalog
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-mono-500 uppercase tracking-widest">Business insights</p>
            <h2 className="text-xl font-black text-mono-900">Dashboard Intelligence</h2>
          </div>
          <BarChart3 className="w-5 h-5 text-mono-900" />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-mono-50 p-5 border border-gray-100">
            <p className="text-xs text-mono-500 uppercase tracking-widest">Total Orders</p>
            <p className="mt-3 text-3xl font-black text-mono-900">{orders.length}</p>
          </div>
          <div className="rounded-3xl bg-mono-50 p-5 border border-gray-100">
            <p className="text-xs text-mono-500 uppercase tracking-widest">Active VIPs</p>
            <p className="mt-3 text-3xl font-black text-mono-900">{vipCustomers.length}</p>
          </div>
          <div className="rounded-3xl bg-mono-50 p-5 border border-gray-100">
            <p className="text-xs text-mono-500 uppercase tracking-widest">Stock Alerts</p>
            <p className="mt-3 text-3xl font-black text-mono-900">{products.filter((product) => product.variants.some((variant) => variant.stock <= 5)).length}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm xl:col-span-3">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
            <div>
              <p className="text-xs text-mono-500 uppercase tracking-widest">Customer management</p>
              <h2 className="text-xl font-black text-mono-900">Customer Directory</h2>
            </div>
            <div className="w-full sm:w-auto">
              <label className="sr-only" htmlFor="customer-search">Search customers</label>
              <input
                id="customer-search"
                type="text"
                value={customerSearch}
                onChange={(e) => {
                  setCustomerSearch(e.target.value);
                  setSelectedCustomerId('');
                }}
                placeholder="Search by name, email or phone"
                className="w-full rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-mono-900 shadow-sm focus:border-mono-900 focus:outline-none"
              />
            </div>
          </div>

          {customerSearch.trim() === '' ? (
            <div className="rounded-3xl border border-dashed border-gray-200 bg-mono-50 p-8 text-center text-sm text-mono-500">
              Search a customer by name, email, or phone to access their order history and VIP status.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm text-mono-600">
                <thead className="bg-mono-50 text-xs uppercase text-mono-500">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Orders</th>
                    <th className="px-4 py-3">Total Spent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredCustomers.length > 0 ? filteredCustomers.map((customer) => (
                    <tr
                      key={customer.id}
                      className={`hover:bg-gray-50 cursor-pointer ${selectedCustomerId === customer.id ? 'bg-mono-50' : ''}`}
                      onClick={() => setSelectedCustomerId(customer.id)}
                    >
                      <td className="px-4 py-3 font-semibold text-mono-900">{customer.fullName}</td>
                      <td className="px-4 py-3 text-mono-700">{customer.email}</td>
                      <td className="px-4 py-3 text-mono-700">{customer.phone}</td>
                      <td className="px-4 py-3 text-mono-700">{customer.role.replace('ROLE_', '')}</td>
                      <td className="px-4 py-3 font-bold text-mono-900">{customer.orderCount}</td>
                      <td className="px-4 py-3 font-bold text-mono-900">₹{customer.totalSpent}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={6} className="px-4 py-10 text-center text-sm text-mono-500">
                        No customer found for "{customerSearch.trim()}".
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {selectedCustomer && (
            <div className="mt-6 rounded-3xl border border-gray-200 bg-mono-50 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-black text-mono-900">{selectedCustomer.fullName}'s Order History</h3>
                  <p className="text-xs text-mono-500">{selectedCustomer.email} · {selectedCustomer.phone}</p>
                </div>
                <span className="text-xs text-mono-500">{selectedCustomer.orderCount} orders</span>
              </div>

              {selectedCustomer.orders.length === 0 ? (
                <p className="text-sm text-mono-500">No orders found for this customer yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm text-mono-600">
                    <thead className="bg-white text-xs uppercase text-mono-500 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3">Order #</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Amount</th>
                        <th className="px-4 py-3">Payment</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {selectedCustomer.orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-semibold text-mono-900">{order.orderNumber}</td>
                          <td className="px-4 py-3 text-mono-700">{new Date(order.createdAt).toLocaleDateString()}</td>
                          <td className="px-4 py-3 font-bold text-mono-900">₹{order.finalAmount}</td>
                          <td className="px-4 py-3 text-mono-700">{order.paymentMethod} · {order.paymentStatus}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold ${order.orderStatus === 'Processing' ? 'bg-yellow-100 text-yellow-700' : order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-mono-700'}`}>
                              {order.orderStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
