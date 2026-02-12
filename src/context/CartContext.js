import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // ✅ 1. إضافة حالة التحكم في ظهور السلة (هذا ما كان ينقصك)
  const [showCart, setShowCart] = useState(false);
  
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  // 🧮 دالة حساب السعر مع الخصم (من كودك القديم الممتاز)
  const getProductPrice = (product) => {
    if (product.discount) {
      return Math.round(product.price - (product.price * product.discount / 100));
    }
    return product.price;
  }

  // إضافة منتج
  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);
    const realPrice = getProductPrice(product); // نستخدم السعر بعد الخصم

    setTotalPrice((prevTotalPrice) => prevTotalPrice + realPrice * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    
    if(checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if(cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
        return cartProduct;
      })
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    
    toast.success(`${quantity} ${product.name} أضيف للسلة.`);
    setShowCart(true); // ✅ تفتح السلة تلقائياً عند الإضافة
  } 

  // حذف منتج
  const onRemove = (product) => {
    const foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);
    const realPrice = getProductPrice(foundProduct);

    setTotalPrice((prevTotalPrice) => prevTotalPrice - realPrice * foundProduct.quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  // تعديل الكمية
  const toggleCartItemQuanitity = (id, value) => {
    const foundProduct = cartItems.find((item) => item._id === id);
    const index = cartItems.findIndex((product) => product._id === id);
    const realPrice = getProductPrice(foundProduct);

    // نستخدم نسخة جديدة من المصفوفة لتجنب المشاكل
    const newCartItems = [...cartItems];

    if(value === 'inc') {
      newCartItems[index] = { ...foundProduct, quantity: foundProduct.quantity + 1 };
      setCartItems(newCartItems);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + realPrice);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if(value === 'dec') {
      if (foundProduct.quantity > 1) {
        newCartItems[index] = { ...foundProduct, quantity: foundProduct.quantity - 1 };
        setCartItems(newCartItems);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - realPrice);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  }

  // دوال زيادة ونقصان الكمية في صفحة المنتج (اختياري)
  const incQty = () => setQty((prevQty) => prevQty + 1);
  const decQty = () => setQty((prevQty) => (prevQty - 1 < 1 ? 1 : prevQty - 1));

  return (
    <CartContext.Provider 
      value={{
        showCart,     // ✅ تمرير الحالة
        setShowCart,  // ✅ تمرير دالة التعديل
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities 
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext);