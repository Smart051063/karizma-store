import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);

  const onAdd = (product, quantity) => {
    // تحديد السعر الحقيقي: إذا وجد سعر خصم نستخدمه، وإلا السعر الأصلي
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
      // تخزين السعر المحسوب داخل المنتج لضمان صحة العمليات اللاحقة
      const productWithCorrectPrice = { ...product, price: actualPrice };
      productWithCorrectPrice.quantity = quantity;
      setCartItems([...cartItems, productWithCorrectPrice]);
    }
    toast.success(`تم إضافة ${quantity} من ${product.name} للسلة`);
  } 

  const onRemove = (product) => {
    const foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  const toggleCartItemQuantity = (id, value) => {
    const foundProduct = cartItems.find((item) => item._id === id);
    const index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = [...cartItems];

    if (value === 'inc') {
      newCartItems[index] = { ...foundProduct, quantity: foundProduct.quantity + 1 };
      setCartItems(newCartItems);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === 'dec') {
      if (foundProduct.quantity > 1) {
        newCartItems[index] = { ...foundProduct, quantity: foundProduct.quantity - 1 };
        setCartItems(newCartItems);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
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