import { createContext, useContext, useState } from 'react';

// 1. إنشاء الذاكرة
const CartContext = createContext();

// 2. إنشاء المزود (الذي يغلف الموقع ويعطيه البيانات)
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // دالة لإضافة منتج للسلة
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert(`✅ تم إضافة "${product.name}" إلى السلة!`);
  };

  // دالة لمعرفة عدد المنتجات
  const getCartCount = () => {
    return cart.length;
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, getCartCount }}>
      {children}
    </CartContext.Provider>
  );
}

// 3. خطاف بسيط لاستخدام السلة في أي صفحة
export const useCart = () => useContext(CartContext);