import React from 'react';
import Link from 'next/link';
import { useCart } from '../src/context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQty } = useCart();

  // حساب الإجمالي
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  // 👇 دالة إرسال الطلب عبر واتساب
  const handleCheckout = () => {
    // 1️⃣ ضع رقم هاتفك هنا (مع مفتاح الدولة 20 لمصر) بدون فواصل أو علامة +
    const phoneNumber = "201002410037"; // ⚠️ استبدل هذا الرقم برقمك الحقيقي!

    // 2️⃣ تجهيز نص الرسالة
    let message = `مرحباً كاريزما للعطور 👋\nأريد إتمام الطلب التالي:\n\n`;

    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} \n   (العدد: ${item.qty}) - السعر: ${item.price} ج.م\n`;
    });

    message += `\n💰 الإجمالي النهائي: ${totalPrice} ج.م\n\nشكراً لكم! ✨`;

    // 3️⃣ فتح واتساب
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div style={{ minHeight: '80vh', direction: 'rtl', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#d4af37' }}>🛒 سلة المشتريات</h1>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <p style={{ fontSize: '1.2rem', color: '#777' }}>السلة فارغة حالياً..</p>
          <Link href="/mixes" style={{ textDecoration: 'none', color: '#d4af37', fontWeight: 'bold' }}>
            تصفح العطور وأضف بعض المنتجات 🛍️
          </Link>
        </div>
      ) : (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          {/* قائمة المنتجات */}
          {cartItems.map((item) => (
            <div key={item._id} style={cartItemStyle}>
              
              {/* صورة المنتج */}
              <div style={{ width: '80px', height: '80px', borderRadius: '10px', overflow: 'hidden', border: '1px solid #eee' }}>
                <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* التفاصيل */}
              <div style={{ flex: 1, paddingRight: '15px' }}>
                <h3 style={{ margin: '0 0 5px', fontSize: '1rem' }}>{item.name}</h3>
                <p style={{ margin: 0, color: '#d4af37', fontWeight: 'bold' }}>{item.price} ج.م</p>
              </div>

              {/* التحكم بالكمية */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button onClick={() => updateQty(item._id, item.qty - 1)} style={qtyBtnStyle}>-</button>
                <span style={{ fontWeight: 'bold' }}>{item.qty}</span>
                <button onClick={() => updateQty(item._id, item.qty + 1)} style={qtyBtnStyle}>+</button>
              </div>

              {/* زر الحذف */}
              <button onClick={() => removeFromCart(item._id)} style={deleteBtnStyle}>🗑️</button>
            </div>
          ))}

          {/* ملخص الطلب */}
          <div style={{ marginTop: '30px', borderTop: '2px solid #eee', paddingTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '20px' }}>
              <span>المجموع الكلي:</span>
              <span style={{ color: '#e74c3c' }}>{totalPrice} ج.م</span>
            </div>

            {/* 👇 زر إتمام الطلب */}
            <button 
              onClick={handleCheckout}
              style={{
                width: '100%', padding: '15px', backgroundColor: '#25D366', color: 'white', // لون واتساب الأخضر
                border: 'none', borderRadius: '10px', fontSize: '1.2rem', fontWeight: 'bold',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
              }}
            >
              <span>📱 إتمام الطلب عبر واتساب</span>
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

// --- التنسيقات ---
const cartItemStyle = {
  display: 'flex', alignItems: 'center', backgroundColor: 'white',
  padding: '15px', borderRadius: '10px', marginBottom: '15px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.05)', border: '1px solid #f0f0f0'
};

const qtyBtnStyle = {
  width: '25px', height: '25px', borderRadius: '50%', border: '1px solid #ccc',
  backgroundColor: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
};

const deleteBtnStyle = {
  marginRight: '15px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem'
};