import React from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext'; // استيراد السلة

export default function CartPage() {
  // جلب المنتجات ودالة الحذف من السلة
  const { cart, removeFromCart } = useCart();

  // حساب السعر الإجمالي
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  // --- دالة إرسال الطلب عبر واتساب ---
  const handleCheckout = () => {
    // 1. تحويل قائمة المنتجات إلى نص مقروء
    const productsText = cart.map(item => `- ${item.name} (${item.price} جنيه)`).join('\n');

    // 2. تجهيز الرسالة النهائية
    const message = `مرحباً، أريد طلب العطور التالية:
${productsText}

💰 الإجمالي: ${total} جنيه`;

    // 3. تشفير الرسالة لتناسب الرابط
    const encodedMessage = encodeURIComponent(message);

    // 4. فتح واتساب (ضع رقمك هنا بدلاً من الأصفار مع مفتاح الدولة)
    // مثال لمصر: 201000000000
    const phoneNumber = "201002410037"; 
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };
  // -----------------------------------

  // 1. حالة السلة الفارغة
  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', direction: 'rtl', fontFamily: 'Arial' }}>
        <h2 style={{ fontSize: '2rem' }}>سلتك فارغة حالياً 🛒</h2>
        <p style={{ color: '#666' }}>لم تقم بإضافة أي عطور بعد.</p>
        <Link href="/">
          <button style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            تصفح العطور
          </button>
        </Link>
      </div>
    );
  }

  // 2. حالة وجود منتجات
  return (
    <div style={{ padding: '20px', direction: 'rtl', fontFamily: 'Arial', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>سلة المشتريات ({cart.length})</h1>
      
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        {cart.map((item, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', padding: '15px 0' }}>
            
            {/* صورة واسم المنتج */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              {item.imageUrl && (
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  style={{ width: '60px', height: '60px', borderRadius: '5px', objectFit: 'cover' }} 
                />
              )}
              <div>
                <h3 style={{ margin: '0', fontSize: '1.1rem' }}>{item.name}</h3>
                <p style={{ margin: '5px 0', color: '#d4af37', fontWeight: 'bold' }}>{item.price} جنيه</p>
              </div>
            </div>

            {/* زر الحذف */}
            <button 
               onClick={() => removeFromCart && removeFromCart(item._id)}
               style={{ backgroundColor: '#ff4444', color: 'white', border: 'none', padding: '5px 12px', borderRadius: '5px', cursor: 'pointer', fontSize: '0.9rem' }}
            >
              حذف 🗑️
            </button>
          </div>
        ))}

        {/* القسم السفلي: الإجمالي وزر الشراء */}
        <div style={{ marginTop: '30px', borderTop: '2px solid #000', paddingTop: '20px', textAlign: 'left' }}>
          <h2 style={{ margin: '0 0 15px 0' }}>الإجمالي: {total} جنيه</h2>
          
          <div style={{ display: 'flex', gap: '10px' }}>
             <Link href="/" style={{ textDecoration: 'none' }}>
                <button style={{ padding: '15px', backgroundColor: '#eee', color: 'black', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                  متابعة التسوق
                </button>
             </Link>
             
             {/* زر إتمام الشراء المربوط بواتساب */}
             <button 
                onClick={handleCheckout}
                style={{ flex: 1, padding: '15px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '8px', fontSize: '18px', cursor: 'pointer' }}
             >
                إتمام الشراء ✅
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}