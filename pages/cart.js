import React from 'react';
import { useCart } from '../src/context/CartContext'; // تأكدنا الآن من المسار
import Link from 'next/link';

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();

  // حساب المجموع الكلي
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', direction: 'rtl' }}>
        <h2>سلتك فارغة حالياً 🛒</h2>
        <p>لم تقم بإضافة أي عطور بعد..</p>
        <Link href="/">
          <button style={btnStyle}>تصفح العطور</button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', direction: 'rtl', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px' }}>🛒 سلة المشتريات</h1>
      
      {cartItems.map((item) => (
        <div key={item._id} style={itemStyle}>
          {/* صورة المنتج */}
          <div style={{ width: '80px', height: '80px' }}>
             {item.imageUrl && <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px' }} />}
          </div>
          
          {/* تفاصيل المنتج */}
          <div style={{ flex: '1', paddingRight: '15px' }}>
            <h3>{item.name}</h3>
            <p style={{ color: '#888' }}>{item.price} جنيه × {item.qty}</p>
          </div>

          {/* زر الحذف */}
          <button onClick={() => removeFromCart(item)} style={removeBtnStyle}>
            حذف 🗑️
          </button>
        </div>
      ))}

      {/* ملخص الطلب */}
      <div style={{ marginTop: '30px', borderTop: '2px solid #eee', paddingTop: '20px' }}>
        <h2 style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>المجموع الكلي:</span>
          <span style={{ color: '#d4af37' }}>{totalPrice} جنيه</span>
        </h2>
        
        <button style={checkoutBtnStyle} onClick={() => alert("سيتم ربط الدفع قريباً! 💳")}>
          إتمام الشراء ✅
        </button>
      </div>
    </div>
  );
}

// --- التنسيقات ---
const itemStyle = {
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid #eee',
  padding: '15px 0',
  backgroundColor: 'white',
  marginTop: '10px',
  borderRadius: '8px',
  padding: '10px'
};

const btnStyle = {
  marginTop: '20px',
  padding: '10px 20px',
  backgroundColor: 'black',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

const removeBtnStyle = {
  backgroundColor: '#ff4d4d',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '0.9rem'
};

const checkoutBtnStyle = {
  width: '100%',
  padding: '15px',
  backgroundColor: '#d4af37',
  color: 'black',
  border: 'none',
  borderRadius: '8px',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginTop: '20px'
};