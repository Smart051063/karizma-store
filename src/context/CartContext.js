رimport React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // 1️⃣ محاولة استرجاع السلة من التخزين المحلي عند البدء
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('karizma_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error parsing cart data:", error);
      }
    }
  }, []);

  // 2️⃣ حفظ السلة في التخزين المحلي عند أي تغيير
  useEffect(() => {
    localStorage.setItem('karizma_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // دالة إضافة منتج للسلة
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);
      if (existingItem) {
        return prevItems.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // دالة حذف منتج
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  // دالة تغيير الكمية
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) => (item._id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  // حساب الإجمالي (مع مراعاة الخصم)
  const totalPrice = cartItems.reduce((total, item) => {
    const price = item.discount 
      ? item.price - (item.price * item.discount / 100) 
      : item.price;
    return total + price * item.quantity;
  }, 0);

  // 🟢 دالة إرسال الطلب عبر واتساب (تم التعديل هنا)
  const checkout = () => {
    const phoneNumber = "201002410037"; // رقمك
    
    let message = `👋 مرحباً كاريزما، أريد إتمام الطلب التالي:\n\n`;

    cartItems.forEach((item, index) => {
      // حساب السعر النهائي للقطعة الواحدة
      const originalPrice = item.price;
      const hasDiscount = item.discount && item.discount > 0;
      const finalPrice = hasDiscount 
        ? originalPrice - (originalPrice * item.discount / 100) 
        : originalPrice;

      // تنسيق السطر لكل منتج
      message += `${index + 1}. *${item.name}* (الكمية: ${item.quantity})\n`;
      
      if (hasDiscount) {
        // إذا كان هناك خصم: اظهر القديم مشطوب + الجديد + نسبة الخصم
        message += `   🏷️ السعر: ~${originalPrice} ج.م~ ➡️ *${finalPrice} ج.م*\n`;
        message += `   🔥 (خصم خاص ${item.discount}%)\n`;
      } else {
        // إذا لم يوجد خصم
        message += `   💰 السعر: *${originalPrice} ج.م*\n`;
      }
      message += `--------------------\n`;
    });

    message += `\n💰 *الإجمالي النهائي المطلوب: ${totalPrice} ج.م*`;
    message += `\n📍 يرجى تأكيد الطلب والعنوان.`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, totalPrice, checkout }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}