import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // دالة إضافة منتج للسلة
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // 🆕 دالة الحذف الجديدة (تقوم بفلترة المنتج واستبعاده)
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  // حساب عدد المنتجات
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    // لاحظ أننا أضفنا removeFromCart هنا لنتمكن من استخدامها في الصفحات
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}