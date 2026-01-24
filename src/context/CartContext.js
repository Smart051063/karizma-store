import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // 1️⃣ استرجاع السلة من ذاكرة المتصفح عند فتح الموقع (لكي لا تضيع المنتجات)
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // 2️⃣ حفظ السلة في ذاكرة المتصفح عند أي تغيير
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // 3️⃣ 🔥 حساب إجمالي عدد القطع (هذا ما كان ينقصك للعداد الأحمر!)
  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

  // دالة إضافة منتج
  const addToCart = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);

    if (checkProductInCart) {
      // لو المنتج موجود، زود عدده
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) return {
          ...cartProduct,
          qty: cartProduct.qty + quantity
        }
        return cartProduct;
      });
      setCartItems(updatedCartItems);
    } else {
      // لو جديد، ضيفه للسلة
      product.qty = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
  };

  // دالة حذف منتج
  const removeFromCart = (product) => {
    const newCartItems = cartItems.filter((item) => item._id !== product._id);
    setCartItems(newCartItems);
  };

  // دالة تعديل الكمية
  const updateQty = (id, newQty) => {
    if (newQty < 1) return; // منع الكمية صفر
    const updatedCartItems = cartItems.map((item) => 
      item._id === id ? { ...item, qty: newQty } : item
    );
    setCartItems(updatedCartItems);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQty, 
      totalQty // 👈 قمنا بتمرير الإجمالي هنا ليستقبله TopBar
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);