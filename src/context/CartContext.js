import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // 1. أول ما يفتح الموقع، نحاول استرجاع السلة القديمة من ذاكرة المتصفح
  useEffect(() => {
    const savedCart = localStorage.getItem('karizma_cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // 2. كلما تغيرت السلة، نقوم بحفظ النسخة الجديدة في المتصفح فوراً
  useEffect(() => {
    localStorage.setItem('karizma_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // دالة لإضافة منتج للسلة
  const addToCart = (product) => {
    const exist = cartItems.find((x) => x._id === product._id);
    if (exist) {
      // إذا المنتج موجود، زود الكمية فقط
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      // إذا جديد، ضيفه للقديم
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
    // تنبيه صغير للنجاح
    alert(`تمت إضافة "${product.name}" للسلة بنجاح! 🛒`);
  };

  // دالة لحذف منتج (سنحتاجها لاحقاً)
  const removeFromCart = (product) => {
    const exist = cartItems.find((x) => x._id === product._id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x._id !== product._id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// هذا هو "الخطاف" الذي سنستخدمه في الصفحات
export const useCart = () => useContext(CartContext);