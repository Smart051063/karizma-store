import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast'; // يفضل استخدام التوست بدلاً من alert

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);

  // 1️⃣ استرجاع البيانات عند التحميل
  useEffect(() => {
    const data = localStorage.getItem('cart');
    if (data) {
      const parsedData = JSON.parse(data);
      setCartItems(parsedData);
      
      // إعادة حساب الكميات والأسعار بناءً على البيانات المحفوظة
      let totalP = 0;
      let totalQ = 0;
      parsedData.forEach(item => {
        // حساب السعر (سواء كان بخصم أو بدونه)
        const priceToUse = item.discount ? item.price - (item.price * item.discount / 100) : item.price;
        totalP += priceToUse * item.quantity;
        totalQ += item.quantity;
      });
      setTotalPrice(totalP);
      setTotalQuantities(totalQ);
    }
  }, []);

  // 2️⃣ حفظ البيانات عند أي تغيير (تم إصلاح مشكلة الحذف)
  useEffect(() => {
    // نحفظ دائماً حتى لو المصفوفة فارغة لكي نمسح البيانات القديمة
    if (cartItems !== undefined) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // --- دالة إضافة منتج للسلة ---
  const addToCart = (product) => {
    // التحقق هل المنتج موجود مسبقاً؟
    const checkProductInCart = cartItems.find((item) => item._id === product._id);
    
    // تحديد السعر الفعلي (مع الخصم إن وجد)
    const actualPrice = product.discount 
      ? product.price - (product.price * product.discount / 100) 
      : product.price;

    setTotalPrice((prevTotalPrice) => prevTotalPrice + actualPrice * product.quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + product.quantity);

    if (checkProductInCart) {
      // إذا كان موجوداً، نزيد الكمية فقط
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + product.quantity
        }
        return cartProduct;
      })

      setCartItems(updatedCartItems);
    } else {
      // إذا كان جديداً، نضيفه للقائمة
      product.quantity = product.quantity || 1; // ضمان وجود كمية
      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${product.name} أضيف للسلة`);
  } 

  // --- دالة حذف منتج نهائياً ---
  const removeFromCart = (id) => {
    const foundProduct = cartItems.find((item) => item._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (foundProduct) {
        // حساب السعر لحذفه من المجموع
        const actualPrice = foundProduct.discount 
            ? foundProduct.price - (foundProduct.price * foundProduct.discount / 100) 
            : foundProduct.price;

        setTotalPrice((prevTotalPrice) => prevTotalPrice - actualPrice * foundProduct.quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    }
  }

  // --- دالة تعديل الكمية (+ و -) داخل صفحة السلة ---
  const updateQuantity = (id, newQuantity) => {
    const foundProduct = cartItems.find((item) => item._id === id);
    if (!foundProduct) return;

    if (newQuantity < 1) {
        // إذا قلت الكمية عن 1، لا نفعل شيئاً (أو يمكن استدعاء الحذف)
        return; 
    }

    const actualPrice = foundProduct.discount 
        ? foundProduct.price - (foundProduct.price * foundProduct.discount / 100) 
        : foundProduct.price;

    // الفرق بين الكمية الجديدة والقديمة
    const qtyDifference = newQuantity - foundProduct.quantity;

    // تحديث المجموع والعدد الكلي
    setTotalPrice((prev) => prev + (actualPrice * qtyDifference));
    setTotalQuantities((prev) => prev + qtyDifference);

    // تحديث المصفوفة
    const newCartItems = cartItems.map((item) => 
        item._id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(newCartItems);
  }

  // --- دالة إرسال الطلب واتساب ---
  const checkout = () => {
    const phoneNumber = "201002410037"; // رقمك
    let message = "مرحباً، أود طلب المنتجات التالية:\n\n";
    
    cartItems.forEach(item => {
        message += `- ${item.name} (الكمية: ${item.quantity})\n`;
    });

    message += `\n💰 الإجمالي: ${totalPrice.toFixed(0)} جنيه`;
    
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        totalPrice, 
        totalQuantities, 
        addToCart, 
        removeFromCart,
        updateQuantity,
        checkout
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext);