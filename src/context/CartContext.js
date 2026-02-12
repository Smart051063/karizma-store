// src/context/CartContext.js
import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);

  const onAdd = (product, quantity) => {
    // ✅ الحساب الذكي: استخدام discountPrice إذا وجد، وإلا السعر العادي
    const actualPrice = product.discountPrice ? product.discountPrice : product.price;

    const checkProductInCart = cartItems.find((item) => item._id === product._id);
    
    setTotalPrice((prevTotalPrice) => prevTotalPrice + actualPrice * quantity);
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
      // ✅ تخزين السعر الفعلي داخل عنصر السلة لضمان حساب الفاتورة بشكل صحيح
      const productInCart = { ...product, price: actualPrice, quantity };
      setCartItems([...cartItems, productInCart]);
    }
    toast.success(`${quantity} ${product.name} أضيف للسلة.`);
  } 

  // باقي الدوال (onRemove و toggleCartItemQuantity) كما هي في الكود السابق
  const onRemove = (product) => {
    const foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);
    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  return (
    <CartContext.Provider value={{ showCart, setShowCart, cartItems, totalPrice, totalQuantities, onAdd, onRemove }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext);