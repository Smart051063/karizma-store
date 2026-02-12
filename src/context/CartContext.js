import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);

  // دالة مساعدة لحساب السعر الفعلي (تستخدم داخلياً فقط للحسابات)
  const getNetPrice = (product) => {
    return product.discount 
      ? Math.round(product.price - (product.price * product.discount / 100))
      : product.price;
  }

  // 1️⃣ إضافة منتج
  const onAdd = (product, quantity) => {
    const netPrice = getNetPrice(product); // نحسب 641

    const checkProductInCart = cartItems.find((item) => item._id === product._id);
    
    // نزيد الإجمالي بالسعر الصافي (641)
    setTotalPrice((prevTotalPrice) => prevTotalPrice + netPrice * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
        return cartProduct;
      })
      setCartItems(updatedCartItems);
    } else {
      // ✅ هنا السر: نخزن المنتج بسعره الأصلي (675) في القائمة
      // لكي يظهر في صفحة السلة 675 مشطوبة، وتقوم الصفحة بحساب الخصم للعرض فقط
      setCartItems([...cartItems, { ...product, quantity }]);
    }
    toast.success(`تم إضافة ${quantity} من ${product.name} للسلة.`);
  } 

  // 2️⃣ حذف منتج
  const onRemove = (product) => {
    const foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);
    
    // عند الحذف، نحسب كم كان صافي سعره لنخصمه من الإجمالي
    const netPrice = getNetPrice(foundProduct);

    setTotalPrice((prevTotalPrice) => prevTotalPrice - netPrice * foundProduct.quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  // 3️⃣ تعديل الكمية
  const toggleCartItemQuantity = (id, value) => {
    const foundProduct = cartItems.find((item) => item._id === id);
    const index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = [...cartItems];
    
    // نحسب السعر الصافي للقطعة الواحدة للتعديل في الإجمالي
    const netPrice = getNetPrice(foundProduct);

    if (value === 'inc') {
      newCartItems[index] = { ...foundProduct, quantity: foundProduct.quantity + 1 };
      setCartItems(newCartItems);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + netPrice); // نزيد 641
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === 'dec') {
      if (foundProduct.quantity > 1) {
        newCartItems[index] = { ...foundProduct, quantity: foundProduct.quantity - 1 };
        setCartItems(newCartItems);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - netPrice); // ننقص 641
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  }

  return (
    <CartContext.Provider value={{
      showCart, setShowCart, cartItems, totalPrice, totalQuantities,
      onAdd, onRemove, toggleCartItemQuantity
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext);