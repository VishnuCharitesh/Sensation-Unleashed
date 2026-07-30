import type { Product, SupportTicket, AnalyticsData } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Pure Banarasi Silk Saree',
    slug: 'pure-banarasi-silk-saree',
    description: 'Handwoven pure silk saree with traditional zari work. A timeless piece for weddings and festive occasions.',
    regularPrice: 4999,
    subscriberPrice: 3499,
    activeUserPrice: 4999,
    userSavings: 1500,
    isSubscriberExclusive: false,
    isEarlyAccess: true,
    categoryName: 'Ethnic & Festive',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    variants: [
      { id: 'v1', sku: 'SAREE-001-RED', size: 'Free Size', color: 'Crimson Red', stock: 8 },
      { id: 'v2', sku: 'SAREE-001-GRN', size: 'Free Size', color: 'Emerald Green', stock: 5 }
    ]
  },
  {
    id: 'p2',
    name: 'Premium Cotton Kurta Set',
    slug: 'premium-cotton-kurta-set',
    description: 'Breathable pure cotton kurta with matching pyjama. Ideal for daily wear and casual outings.',
    regularPrice: 1899,
    subscriberPrice: 1299,
    activeUserPrice: 1899,
    userSavings: 600,
    isSubscriberExclusive: false,
    isEarlyAccess: false,
    categoryName: 'Ethnic & Festive',
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    variants: [
      { id: 'v3', sku: 'KURTA-002-M-WHT', size: 'M', color: 'White', stock: 15 },
      { id: 'v4', sku: 'KURTA-002-L-BLU', size: 'L', color: 'Sky Blue', stock: 12 },
      { id: 'v5', sku: 'KURTA-002-XL-KHK', size: 'XL', color: 'Khaki', stock: 10 }
    ]
  },
  {
    id: 'p3',
    name: 'Slim Fit Linen Shirt',
    slug: 'slim-fit-linen-shirt',
    description: 'Modern slim-fit linen shirt with a crisp finish. Perfect for formal occasions and office wear.',
    regularPrice: 1599,
    subscriberPrice: 1099,
    activeUserPrice: 1599,
    userSavings: 500,
    isSubscriberExclusive: false,
    isEarlyAccess: false,
    categoryName: "Men's Formals",
    imageUrl: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    variants: [
      { id: 'v6', sku: 'SHIRT-003-M-WHT', size: 'M', color: 'White', stock: 20 },
      { id: 'v7', sku: 'SHIRT-003-L-LBL', size: 'L', color: 'Light Blue', stock: 18 }
    ]
  },
  {
    id: 'p4',
    name: 'Anarkali Cotton Suit',
    slug: 'anarkali-cotton-suit',
    description: 'Elegant Anarkali-style cotton suit with embroidered dupatta. Comfortable grace for festive mornings.',
    regularPrice: 2299,
    subscriberPrice: 1699,
    activeUserPrice: 2299,
    userSavings: 600,
    isSubscriberExclusive: false,
    isEarlyAccess: false,
    categoryName: "Women's Western",
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    variants: [
      { id: 'v8', sku: 'SUIT-004-S-PNK', size: 'S', color: 'Blush Pink', stock: 7 },
      { id: 'v9', sku: 'SUIT-004-M-PNK', size: 'M', color: 'Blush Pink', stock: 9 }
    ]
  },
  {
    id: 'p5',
    name: 'Designer Georgette Saree',
    slug: 'designer-georgette-saree',
    description: 'Lightweight georgette saree with digital print and stone embellishments. Easy draping with premium finish.',
    regularPrice: 2799,
    subscriberPrice: 1999,
    activeUserPrice: 2799,
    userSavings: 800,
    isSubscriberExclusive: false,
    isEarlyAccess: true,
    categoryName: 'Ethnic & Festive',
    imageUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    variants: [
      { id: 'v10', sku: 'SAREE-005-BLU', size: 'Free Size', color: 'Royal Blue', stock: 6 },
      { id: 'v11', sku: 'SAREE-005-BLK', size: 'Free Size', color: 'Black', stock: 4 }
    ]
  },
  {
    id: 'p6',
    name: 'Classic Chino Trousers',
    slug: 'classic-chino-trousers',
    description: 'Tailored stretch-cotton chinos with a comfortable fit. A wardrobe essential for smart casuals.',
    regularPrice: 1499,
    subscriberPrice: 999,
    activeUserPrice: 1499,
    userSavings: 500,
    isSubscriberExclusive: false,
    isEarlyAccess: false,
    categoryName: "Men's Formals",
    imageUrl: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80',
    rating: 4.4,
    variants: [
      { id: 'v12', sku: 'CHINO-006-30-KHK', size: '30', color: 'Khaki', stock: 14 },
      { id: 'v13', sku: 'CHINO-006-32-BLK', size: '32', color: 'Black', stock: 16 },
      { id: 'v14', sku: 'CHINO-006-34-OLV', size: '34', color: 'Olive', stock: 10 }
    ]
  }
];

export const INITIAL_ANALYTICS: AnalyticsData = {
  totalRevenue: 0,
  totalOrders: 0,
  totalSubscribers: 0,
  totalCustomers: 0,
  pendingOrders: 0,
  openSupportTickets: 0,
  monthlySubscriptionRevenue: 0
};

export const INITIAL_TICKETS: SupportTicket[] = [];
