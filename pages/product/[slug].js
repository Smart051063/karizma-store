import React, { useState } from 'react';
import { client } from '../../src/sanity/lib/client';
import { useCart } from '../../src/context/CartContext';
import Head from 'next/head';
import Link from 'next/link';

export default function ProductDetails({ product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);

  // حماية: إذا لم يتم العثور على المنتج
  if (!product) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>عذراً، المنتج غير متاح حالياً 😕</div>;
  }

  // حساب السعر للعرض فقط في الصفحة (للمشاهدة)
  const price = product.price;
  const discount = product.discount || 0;
  const finalPrice = discount ? price - (price * discount / 100) : price;

  // دوال زيادة ونقصان الكمية
  const incQty = () => setQuantity((prev) => prev + 1);
  const decQty = () => setQuantity((prev) => (prev - 1 < 1 ? 1 : prev - 1));

  // ✅ دالة الإضافة للسلة (مصححة لمنع الخصم المزدوج)
  const handleAddToCart = () => {
    addToCart({ 
      _id: product._id,
      name: product.name,
      price: product.price, // 👈 هام: نرسل السعر الأصلي (780) والسلة ستخصم النسبة تلقائياً
      discount: product.discount, // نرسل نسبة الخصم
      image: product.imageUrl,
      slug: product.slug.current,
      quantity: quantity 
    });

    // إظهار إشعار النجاح
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div style={{ padding: '40px 20px', direction: 'rtl', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <Head>
        <title>{product.name} | كاريزما للعطور</title>
      </Head>

      {/* إشعار الإضافة للسلة */}
      {showNotification && (
        <div style={{
          position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
          backgroundColor: '#28a745', color: 'white', padding: '10px 20px',
          borderRadius: '8px', zIndex: 1000, boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          ✅ تمت إضافة {product.name} للسلة بنجاح!
        </div>
      )}

      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '40px', backgroundColor: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
        
        {/* 1️⃣ صورة المنتج */}
        <div style={{ flex: '1 1 400px', textAlign: 'center' }}>
          <div style={{ position: 'relative', borderRadius: '15px', overflow: 'hidden', border: '1px solid #eee' }}>
            {discount > 0 && (
              <span style={{
                position: 'absolute', top: '10px', right: '10px',
                backgroundColor: '#e74c3c', color: 'white', padding: '5px 15px',
                borderRadius: '20px', fontWeight: 'bold'
              }}>
                خصم {discount}% 🔥
              </span>
            )}
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'contain' }} 
            />
          </div>
        </div>

        {/* 2️⃣ تفاصيل المنتج */}
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '10px', color: '#333' }}>{product.name}</h1>
          
          <div style={{ marginBottom: '20px' }}>
            {discount > 0 ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#e74c3c' }}>{finalPrice} ج.م</span>
                <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '1.2rem' }}>{price} ج.م</span>
              </div>
            ) : (
              <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#333' }}>{price} ج.م</span>
            )}
          </div>

          <p style={{ lineHeight: '1.8', color: '#666', marginBottom: '30px', fontSize: '1.1rem' }}>
            {product.details ? product.details : 'وصف العطر ومكوناته المميزة ستجدها هنا قريباً...'}
          </p>

          {/* التحكم بالكمية */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
            <span style={{ fontWeight: 'bold' }}>الكمية:</span>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '5px' }}>
              <button onClick={decQty} style={{ padding: '10px 15px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>-</button>
              <span style={{ padding: '10px 15px', borderLeft: '1px solid #ddd', borderRight: '1px solid #ddd', minWidth: '40px', textAlign: 'center' }}>{quantity}</span>
              <button onClick={incQty} style={{ padding: '10px 15px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>+</button>
            </div>
          </div>

          {/* أزرار الإجراءات */}
          <div style={{ display: 'flex', gap: '15px' }}>
            <button 
              onClick={handleAddToCart}
              style={{ 
                flex: 1, padding: '15px', backgroundColor: '#1a1a1a', color: 'white', 
                border: 'none', borderRadius: '8px', fontSize: '1.1rem', cursor: 'pointer', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
              }}
            >
              🛒 إضافة للسلة
            </button>
          </div>
          
          <Link href="/shop" style={{ marginTop: '20px', textAlign: 'center', color: '#d4af37', textDecoration: 'none' }}>
            &larr; مواصلة التسوق
          </Link>
        </div>
      </div>
    </div>
  );
}

// 👇 دالة السيرفر (مهمة جداً لجلب البيانات)
export const getServerSideProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]{
    _id,
    name,
    image,
    price,
    discount,
    details,
    slug,
    "imageUrl": image.asset->url
  }`;
  
  const product = await client.fetch(query);

  return {
    props: { product }
  }
}