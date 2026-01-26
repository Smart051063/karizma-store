import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantities, setTotalQuantities] = useState(0); // 👈 تم تعديل الاسم ليتوافق مع Navbar

  // 1️⃣ الشفاء الذاتي للسلة (Self-Healing) عند فتح الموقع
  useEffect(() => {
    const savedCart = localStorage.getItem('karizma_cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        
        // عملية تنظيف إجبارية لكل البيانات
        const cleanCart = parsedCart.map(item => ({
          ...item,
          quantity: (item.quantity && !isNaN(item.quantity) && item.quantity > 0) ? Number(item.quantity) : 1,
          price: Number(item.price) || 0,
          discount: Number(item.discount) || 0
        }));

        setCartItems(cleanCart);
      } catch (error) {
        console.error("Cart data corrupted, resetting...", error);
        localStorage.removeItem('karizma_cart');
        setCartItems([]);
      }
    }
  }, []);

  // 2️⃣ حفظ السلة وتحديث العداد
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('karizma_cart', JSON.stringify(cartItems));
    } else {
        // تنظيف التخزين إذا كانت السلة فارغة لتجنب الأخطاء
        // localStorage.removeItem('karizma_cart'); // اختياري
    }
    
    // حساب العداد (الأيقونة الحمراء) بشكل آمن
    const count = cartItems.reduce((acc, item) => {
      const qty = item.quantity ? Number(item.quantity) : 1;
      return acc + qty;
    }, 0);
    
    setTotalQuantities(count); // 👈 تحديث المتغير بالاسم الصحيح

  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);
      if (existingItem) {
        return prevItems.map((item) =>
          item._id === product._id 
            ? { ...item, quantity: (item.quantity || 1) + 1 } 
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    const newCart = cartItems.filter((item) => item._id !== id);
    setCartItems(newCart);
    if (newCart.length === 0) {
      localStorage.removeItem('karizma_cart');
    }
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) => (item._id === id ? { ...item, quantity: Number(newQuantity) } : item))
    );
  };

  // 3️⃣ حساب الإجمالي (محصن ضد NaN)
  const totalPrice = cartItems.reduce((total, item) => {
    const qty = (item.quantity && !isNaN(item.quantity)) ? Number(item.quantity) : 1;
    const itemPrice = Number(item.price) || 0;
    const itemDiscount = Number(item.discount) || 0;

    const finalPrice = itemDiscount > 0
      ? itemPrice - (itemPrice * itemDiscount / 100) 
      : itemPrice;

    return total + (finalPrice * qty);
  }, 0);

  // 4️⃣ دالة إتمام الطلب (مع تتبع تيك توك)
  const checkout = () => {
    const phoneNumber = "201002410037";
    let message = `👋 مرحباً كاريزما، أريد إتمام الطلب التالي:\n\n`;

    cartItems.forEach((item, index) => {
      const qty = item.quantity || 1;
      const originalPrice = Number(item.price);
      const discount = Number(item.discount) || 0;
      
      const finalPrice = discount > 0 
        ? originalPrice - (originalPrice * discount / 100) 
        : originalPrice;

      message += `${index + 1}. *${item.name}* (الكمية: ${qty})\n`;
      
      if (discount > 0) {
        message += `   🏷️ السعر: ~${originalPrice} ج.م~ ➡️ *${finalPrice} ج.م*\n`;
        message += `   🔥 (خصم ${discount}%)\n`;
      } else {
        message += `   💰 السعر: *${originalPrice} ج.م*\n`;
      }
      message += `--------------------\n`;
    });

    message += `\n💰 *الإجمالي النهائي: ${totalPrice.toFixed(0)} ج.م*`;
    message += `\n📍 يرجى تأكيد الطلب والعنوان.`;

    // 👇🔥 دمج كود تيك توك هنا
    if (typeof window !== 'undefined' && window.ttq) {
      window.ttq.track('CompletePayment', {
        content_type: 'product',
        value: Number(totalPrice.toFixed(2)),
        currency: 'EGP',
      });
      console.log("✅ TikTok Pixel: Purchase Event Sent!");
    }

    // فتح الواتساب
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    // 👈 هنا مررنا totalQuantities لكي يراها الناف بار
    <CartContext.Provider value={{ cartItems, totalQuantities, addToCart, removeFromCart, updateQuantity, totalPrice, checkout }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}