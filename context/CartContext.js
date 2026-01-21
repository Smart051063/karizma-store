import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // نبدأ بسلة فارغة
  const [cart, setCart] = useState([]);

  // 1. عند تشغيل الموقع: نحاول استرجاع البيانات القديمة من المخزن
  useEffect(() => {
    const savedCart = localStorage.getItem('myCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // 2. عند تحديث السلة: نقوم بحفظ النسخة الجديدة في المخزن فوراً
  useEffect(() => {
    // نتأكد أن السلة ليست فارغة قبل الحفظ لتجنب مسح البيانات بالخطأ عند التحميل
    // (أو يمكننا الحفظ دائماً، لكن سنضيف شرطاً بسيطاً للعملية)
    if (cart.length > 0) {
      localStorage.setItem('myCart', JSON.stringify(cart));
    }
  }, [cart]);

  // دالة الإضافة
  const addToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    localStorage.setItem('myCart', JSON.stringify(newCart)); // حفظ فوري
    alert(`تم إضافة "${product.name}" إلى السلة! ✅`);
  };

  // دالة الحذف
  const removeFromCart = (productId) => {
    const newCart = cart.filter((item) => item._id !== productId);
    setCart(newCart);
    localStorage.setItem('myCart', JSON.stringify(newCart)); // حفظ فوري
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);