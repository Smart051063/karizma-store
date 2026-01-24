import React from 'react';
import Link from 'next/link';
import { useCart } from '../src/context/CartContext';
import { FaTrash, FaWhatsapp, FaArrowRight } from 'react-icons/fa';

export default function Cart() {
  // 👇 لاحظ هنا: استخدمنا الأسماء الصحيحة كما هي في ملف Context
  const { cartItems, totalPrice, removeFromCart, updateQuantity, checkout } = useCart();

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', minHeight: '60vh' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: '#333' }}>السلة فارغة 🛒</h2>
        <p style={{ color: '#777', marginBottom: '30px' }}>لم تضف أي منتجات للسلة بعد.</p>
        <Link href="/shop" style={{ 
          backgroundColor: '#d4af37', color: '#000', padding: '12px 30px', 
          borderRadius: '30px', textDecoration: 'none', fontWeight: 'bold' 
        }}>
          تصفح المنتجات
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto', direction: 'rtl', minHeight: '80vh' }}>
      
      <h1 style={{ textAlign: 'center', marginBottom: '40px', color: '#d4af37' }}>🛒 سلة المشتريات</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {cartItems.map((item) => (
          <div key={item._id} style={{ 
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
            backgroundColor: '#fff', padding: '15px', borderRadius: '15px', 
            boxShadow: '0 4px 10px rgba(0,0,0,0.05)', flexWrap: 'wrap', gap: '15px' 
          }}>
            
            {/* صورة المنتج واسمه */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: '1 1 200px' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '10px', overflow: 'hidden', backgroundColor: '#f9f9f9' }}>
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>لا توجد صورة</div>
                )}
              </div>
              <div>
                <h3 style={{ margin: '0 0 5px', fontSize: '1.1rem', color: '#333' }}>{item.name}</h3>
                <p style={{ margin: 0, color: '#d4af37', fontWeight: 'bold' }}>
                  {item.price} ج.م 
                  {item.discount > 0 && <span style={{ fontSize: '0.8rem', color: 'red', marginRight: '5px' }}>(-{item.discount}%)</span>}
                </p>
              </div>
            </div>

            {/* التحكم في الكمية */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#f5f5f5', padding: '5px 10px', borderRadius: '20px' }}>
              <button 
                // 👇 التصحيح هنا: استخدام updateQuantity بدلاً من updateQty
                onClick={() => updateQuantity(item._id, (item.quantity || 1) + 1)} 
                style={btnStyle}>+</button>
              
              <span style={{ fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>{item.quantity || 1}</span>
              
              <button 
                onClick={() => updateQuantity(item._id, (item.quantity || 1) - 1)} 
                style={btnStyle}>-</button>
            </div>

            {/* زر الحذف */}
            <button onClick={() => removeFromCart(item._id)} style={{ color: '#ff4d4d', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>
              <FaTrash />
            </button>
          </div>
        ))}
      </div>

      {/* ملخص السلة */}
      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#fff', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: 0 }}>المجموع الكلي:</h3>
          {/* 👇 التصحيح: حماية الرقم من NaN */}
          <h2 style={{ margin: 0, color: '#d4af37' }}>{totalPrice ? totalPrice.toFixed(0) : 0} ج.م</h2>
        </div>

        <button onClick={checkout} className="hover-btn" style={{ 
          width: '100%', padding: '15px', backgroundColor: '#25D366', color: 'white', 
          border: 'none', borderRadius: '10px', fontSize: '1.1rem', fontWeight: 'bold', 
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' 
        }}>
          <FaWhatsapp size={24} /> إتمام الطلب عبر واتساب
        </button>
      </div>

    </div>
  );
}

// تنسيق بسيط للأزرار
const btnStyle = {
  width: '30px', height: '30px', borderRadius: '50%', border: 'none', 
  backgroundColor: '#fff', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  fontWeight: 'bold', color: '#333'
};