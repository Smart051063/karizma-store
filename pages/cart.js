import React, { useRef } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useCart } from '../src/context/CartContext';
import { client } from '../src/sanity/lib/client';
import Image from 'next/image'; // لتحسين عرض الصور

export default function Cart() {
  const { cartItems, totalPrice, totalQuantities, toggleCartItemQuanitity, onRemove } = useCart();
  const cartRef = useRef();

  // دالة لإرسال الطلب عبر واتساب
  const handleCheckout = () => {
    // 1. تجهيز رسالة الطلب
    let message = `مرحباً، أريد إتمام الطلب التالي من موقع كاريزما:\n\n`;
    
    cartItems.forEach((item) => {
      const finalPrice = item.discount ? (item.price - (item.price * item.discount / 100)) : item.price;
      message += `▪️ ${item.name} \n   الكمية: ${item.quantity} \n   السعر: ${Math.round(finalPrice)} ج.م\n----------------\n`;
    });

    message += `\n💰 الإجمالي الكلي: ${totalPrice} ج.م\n`;
    message += `📍 يرجى تأكيد الطلب والعنوان.`;

    // 2. توجيه العميل لواتساب
    const whatsappUrl = `https://wa.me/201002410037?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="cart-wrapper" ref={cartRef} style={{ minHeight: '100vh', backgroundColor: '#f9f9f9', padding: '40px 20px', direction: 'rtl', fontFamily: 'Arial' }}>
      
      <Head>
        <title>سلة المشتريات | كاريزما للعطور</title>
      </Head>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* عنوان الصفحة */}
        <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          🛒 سلة المشتريات 
          <span style={{ fontSize: '1rem', color: '#777' }}>({totalQuantities} منتجات)</span>
        </h2>

        {/* حالة السلة فارغة */}
        {cartItems.length < 1 && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '5rem', marginBottom: '20px' }}>🛍️</div>
            <h3>سلتك فارغة حالياً</h3>
            <Link href="/shop">
              <button style={{ marginTop: '20px', padding: '12px 30px', backgroundColor: '#d4af37', color: 'black', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold' }}>
                تصفح المنتجات
              </button>
            </Link>
          </div>
        )}

        {/* عرض المنتجات */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {cartItems.length >= 1 && cartItems.map((item) => {
            
            // حساب السعر النهائي للقطعة الواحدة للعرض
            const originalPrice = item.price;
            const discount = item.discount || 0;
            const finalPrice = discount ? Math.round(originalPrice - (originalPrice * discount / 100)) : originalPrice;

            return (
              <div key={item._id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px' }}>
                
                {/* 1. صورة المنتج */}
                {item?.imageUrl && (
                   <div style={{ width: '80px', height: '80px', position: 'relative', borderRadius: '10px', overflow: 'hidden', border: '1px solid #eee' }}>
                     <Image src={item.imageUrl} alt={item.name} fill style={{ objectFit: 'cover' }} />
                   </div>
                )}

                {/* 2. تفاصيل الاسم والسعر (الجزء المعدل) */}
                <div style={{ flex: '1', minWidth: '200px', padding: '0 15px' }}>
                  <h5 style={{ margin: '0 0 10px 0', fontSize: '1rem', color: '#333' }}>{item.name}</h5>
                  
                  {/* 👇👇 هنا التعديل المطلوب لعرض السعر والخصم 👇👇 */}
                  {discount > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                      {/* السعر القديم مشطوب */}
                      <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '0.9rem' }}>
                        {originalPrice} ج.م
                      </span>
                      
                      {/* السعر الجديد والخصم */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '1.1rem' }}>
                          {finalPrice} ج.م
                        </span>
                        <span style={{ backgroundColor: '#ffebee', color: '#c62828', fontSize: '0.8rem', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
                          خصم {discount}% 🔥
                        </span>
                      </div>
                    </div>
                  ) : (
                    // إذا لم يكن هناك خصم
                    <span style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '1.1rem' }}>
                      {originalPrice} ج.م
                    </span>
                  )}
                </div>

                {/* 3. التحكم بالكمية */}
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '25px', padding: '5px' }}>
                  <button onClick={() => toggleCartItemQuanitity(item._id, 'dec')} style={{ background: 'none', border: 'none', padding: '5px 12px', cursor: 'pointer', fontSize: '1.2rem', color: '#555' }}>-</button>
                  <span style={{ padding: '0 10px', fontWeight: 'bold' }}>{item.quantity}</span>
                  <button onClick={() => toggleCartItemQuanitity(item._id, 'inc')} style={{ background: 'none', border: 'none', padding: '5px 12px', cursor: 'pointer', fontSize: '1.2rem', color: '#555' }}>+</button>
                </div>

                {/* 4. زر الحذف */}
                <button
                  type="button"
                  onClick={() => onRemove(item)}
                  style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', fontSize: '1.5rem', padding: '10px' }}
                  title="حذف المنتج"
                >
                  🗑️
                </button>

              </div>
            )
          })}
        </div>

        {/* ملخص الطلب والزر الأخضر */}
        {cartItems.length >= 1 && (
          <div style={{ marginTop: '40px', backgroundColor: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', fontSize: '1.3rem', fontWeight: 'bold' }}>
              <span>المجموع الكلي:</span>
              <span style={{ color: '#d4af37' }}>{totalPrice} ج.م</span>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <button
                type="button"
                className="whatsapp-checkout-btn"
                onClick={handleCheckout}
                style={{ width: '100%', padding: '18px', backgroundColor: '#25D366', color: 'white', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)' }}
              >
                 📱 إتمام الطلب عبر واتساب
              </button>
            </div>
            
             {/* زر العودة */}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Link href="/">
                    <button style={{ background: 'black', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>
                        🏠 العودة للصفحة الرئيسية
                    </button>
                </Link>
            </div>

          </div>
        )}
      </div>

      <style jsx>{`
        .whatsapp-checkout-btn:hover { background-color: #1ebc57 !important; transform: scale(1.02); transition: 0.3s; }
      `}</style>
    </div>
  )
}