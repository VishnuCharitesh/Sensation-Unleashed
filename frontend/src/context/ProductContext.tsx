import React, { createContext, useContext, useEffect, useState } from 'react';
import { INITIAL_PRODUCTS } from '../data/mockData';
import type { Product } from '../types';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateVariantStock: (productId: string, variantId: string, stock: number) => void;
  decrementVariantStock: (productId: string, variantId: string, quantity: number) => void;
  getProductById: (productId: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('sensation_products');
    if (saved) {
      try {
        return JSON.parse(saved) as Product[];
      } catch {
        return INITIAL_PRODUCTS;
      }
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('sensation_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const updateVariantStock = (productId: string, variantId: string, stock: number) => {
    setProducts((prev) => prev.map((product) => {
      if (product.id !== productId) return product;
      return {
        ...product,
        variants: product.variants.map((variant) =>
          variant.id === variantId
            ? { ...variant, stock: Math.max(0, stock) }
            : variant
        )
      };
    }));
  };

  const decrementVariantStock = (productId: string, variantId: string, quantity: number) => {
    setProducts((prev) => prev.map((product) => {
      if (product.id !== productId) return product;
      return {
        ...product,
        variants: product.variants.map((variant) =>
          variant.id === variantId
            ? { ...variant, stock: Math.max(0, variant.stock - quantity) }
            : variant
        )
      };
    }));
  };

  const getProductById = (productId: string) => products.find((product) => product.id === productId);

  return (
    <ProductContext.Provider value={{ products, addProduct, updateVariantStock, decrementVariantStock, getProductById }}>
      {children}
    </ProductContext.Provider>
  );
};

export function useProduct() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within ProductProvider');
  }
  return context;
}
