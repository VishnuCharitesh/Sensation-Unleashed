export type Role = 'GUEST' | 'ROLE_CUSTOMER' | 'ROLE_SUBSCRIBER' | 'ROLE_SUPPORT' | 'ROLE_ADMIN';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: Role;
  isSubscriber: boolean;
}

export interface ProductVariant {
  id: string;
  sku: string;
  size: string;
  color: string;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  regularPrice: number;
  subscriberPrice: number; // VIP ₹500 member price
  activeUserPrice: number;
  userSavings: number;
  isSubscriberExclusive: boolean;
  isEarlyAccess: boolean;
  categoryName: string;
  imageUrl: string;
  rating: number;
  variants: ProductVariant[];
}

export interface CartItem {
  product: Product;
  selectedVariant: ProductVariant;
  quantity: number;
}

export interface OrderItem {
  id: string;
  productName: string;
  size: string;
  color: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  orderStatus: string;
  paymentStatus: string;
  shippingAddress: string;
  isSubscriberOrder: boolean;
  createdAt: string;
  items: OrderItem[];
}

export interface Subscription {
  id?: string;
  status: 'ACTIVE' | 'EXPIRED' | 'INACTIVE';
  amount: number;
  startDate?: string;
  endDate?: string;
  paymentReference?: string;
  isActive: boolean;
  daysRemaining: number;
}

export interface TicketMessage {
  id: string;
  senderName: string;
  senderRole: string;
  message: string;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  userName: string;
  userEmail: string;
  subject: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  category: string;
  createdAt: string;
  messages: TicketMessage[];
}

export interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  totalSubscribers: number;
  totalCustomers: number;
  pendingOrders: number;
  openSupportTickets: number;
  monthlySubscriptionRevenue: number;
}
