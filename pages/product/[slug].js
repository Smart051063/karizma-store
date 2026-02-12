import React, { useState } from 'react';
import { client } from '../../src/sanity/lib/client';
import { useCart } from '../../src/context/CartContext'; // استيراد دالة السلة
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

export default function ProductDetails({ product, reviews, relatedProducts }) {
  const { onAdd, setShowCart } = useCart(); // استخدام دالة الإضافة للسلة
  
  // حالات نظام التقييم
  const [phone, setPhone] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [verifyMessage, setVerifyMessage] = useState('');
  const [reviewForm, setReviewForm] = useState({ name: '', comment: '', rating: 5 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  if (!product) return <div style={{textAlign: 'center', padding: '50px'}}>جاري التحميل...</div>;

  // دالة التعامل مع إضافة للسلة
  const handleAddToCart = () => {
    onAdd(product, 1);
    setShowCart(true); // فتح السلة تلقائياً ليرى العميل المنتج
  };

  // --- دوال التقييم (كما هي) ---
  const handleVerify = async () => { /* ... نفس كود التحقق السابق ... */ };
  const handleSubmitReview = async (e) => { /* ... نفس كود الإرسال السابق ... */ };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff', fontFamily: 'Tajawal, Arial', direction: 'rtl' }}>
      <Head>
        <title>{product.name} | كاريزما</title>
      </Head>

      {/* --- قسم تفاصيل المنتج --- */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>
        {/* الصورة */}
        <div style={{ flex: '1', minWidth: '300px', position: 'relative', height: '500px', backgroundColor: '#f9f9f9', borderRadius: '20px', overflow: 'hidden' }}>
          {product.imageUrl && <Image src={product.imageUrl} alt={product.name} fill style={{ objectFit: 'contain', padding: '20px' }} />}
        </div>

        {/* المعلومات والأزرار */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '15px', color: '#222' }}>{product.name}</h1>
          <p style={{ fontSize: '1.2rem', color: '#666', lineHeight: '1.8', marginBottom: '20px' }}>{product.description}</p>
          <h2 style={{ color: '#d4af37', fontSize: '2rem', marginBottom: '30px' }}>{product.price} ج.م</h2>
          
          {/* 👇👇 هنا الأزرار الجديدة 👇👇 */}
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            
            {/* زر أضف للسلة */}
            <button 
              onClick={handleAddToCart}
              style={{ flex: 1, padding: '15px', backgroundColor: '#fff', color: '#d4af37', border: '2px solid #d4af37', borderRadius: '50px', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', transition: '0.3s' }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#fff8e1'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#fff'}
            >
              🛒 أضف للسلة
            </button>

            {/* زر اطلب عبر واتساب */}
            <button 
              onClick={() => window.open(`https://wa.me/201002410037?text=أريد طلب ${product.name}`, '_blank')} 
              style={{ flex: 1, padding: '15px', backgroundColor: '#000', color: '#d4af37', border: 'none', borderRadius: '50px', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              📱 طلب سريع (واتساب)
            </button>
            
          </div>

        </div>
      </div>

      {/* --- باقي الأقسام (التقييمات + منتجات مقترحة) --- */}
      {/* ... (اترك باقي الكود كما هو في الملف السابق) ... */}
    
    </div>
  );
}

// ... (getStaticProps و getStaticPaths كما هي) ...