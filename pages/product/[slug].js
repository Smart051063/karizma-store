import React, { useState, useEffect } from 'react';
import { client } from '../../src/sanity/lib/client';
import { useCart } from '../../src/context/CartContext';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

export default function ProductDetails({ product, reviews, relatedProducts, error }) {
  const { onAdd, setShowCart } = useCart();
  
  // --- إعداد الأحجام والأسعار ---
  const [selectedSize, setSelectedSize] = useState(100); // الحجم الافتراضي
  const [currentPrice, setCurrentPrice] = useState(product?.price || 0);

  // قائمة الأحجام القياسية التي تريدها
  const standardSizes = [100, 60, 50, 30, 20, 10];

  // دالة ذكية لحساب السعر بناءً على الحجم
  const calculatePrice = (size) => {
    // 1. لو في سعر مخصص في Sanity، استخدمه
    const customSize = product.customSizes?.find(s => s.size === size);
    if (customSize) return customSize.price;

    // 2. لو مفيش، نحسبها بمعادلة تقريبية (كلما صغر الحجم، زاد السعر بالمللي)
    const basePrice = product.price; // سعر الـ 100 مل
    if (size === 100) return basePrice;
    
    // معادلة تسعير العطور التقريبية (يمكنك تعديل النسب)
    if (size === 60) return Math.round(basePrice * 0.70); // 60مل = 70% من السعر
    if (size === 50) return Math.round(basePrice * 0.60); // 50مل = 60% من السعر
    if (size === 30) return Math.round(basePrice * 0.40); // 30مل = 40% من السعر
    if (size === 20) return Math.round(basePrice * 0.30); // 20مل = 30% من السعر
    if (size === 10) return Math.round(basePrice * 0.18); // 10مل = 18% من السعر
    
    return basePrice;
  };

  // تحديث السعر عند تغيير الحجم
  useEffect(() => {
    if(product) {
      setCurrentPrice(calculatePrice(selectedSize));
    }
  }, [selectedSize, product]);


  // --- باقي الكود القديم (حالات التقييم والتحقق) ---
  const [phone, setPhone] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [verifyMessage, setVerifyMessage] = useState('');
  const [reviewForm, setReviewForm] = useState({ name: '', comment: '', rating: 5 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  if (!product) return <div>Loading...</div>; // (تم اختصار شاشة الخطأ هنا)

  // إضافة للسلة (مع الحجم)
  const handleAddToCart = () => {
    // نرسل المنتج للسلة ولكن نعدل السعر والاسم ليشمل الحجم
    const productWithSize = {
      ...product,
      _id: `${product._id}_${selectedSize}`, // نصنع ID فريد للحجم
      name: `${product.name} (${selectedSize} مل)`,
      price: currentPrice
    };
    onAdd(productWithSize, 1);
    setShowCart(true);
  };

  // ... (دوال التحقق والتقييم تبقى كما هي) ...

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff', fontFamily: 'Tajawal, Arial', direction: 'rtl' }}>
      <Head>
        <title>{product.name} | كاريزما</title>
      </Head>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>
        {/* صورة المنتج */}
        <div style={{ flex: '1', minWidth: '300px', position: 'relative', height: '500px', backgroundColor: '#f9f9f9', borderRadius: '20px', overflow: 'hidden', border: '1px solid #eee' }}>
          {product.imageUrl && <Image src={product.imageUrl} alt={product.name} fill style={{ objectFit: 'contain', padding: '20px' }} />}
        </div>

        {/* تفاصيل المنتج */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#222' }}>{product.name}</h1>
          <p style={{ fontSize: '1.2rem', color: '#666', lineHeight: '1.8', marginBottom: '20px' }}>{product.description}</p>
          
          {/* 🔥 قسم اختيار الحجم (الجديد) 🔥 */}
          <div style={{ marginBottom: '25px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '10px', color: '#333' }}>اختر الحجم:</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {standardSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '10px',
                    border: selectedSize === size ? '2px solid #d4af37' : '1px solid #ddd',
                    backgroundColor: selectedSize === size ? '#d4af37' : '#fff',
                    color: selectedSize === size ? '#fff' : '#333',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: '0.3s'
                  }}
                >
                  {size} مل
                </button>
              ))}
            </div>
          </div>

          {/* قسم السعر */}
          <div style={{ marginBottom: '30px', padding: '10px 0' }}>
            <h2 style={{ color: '#d4af37', fontSize: '2.5rem', margin: 0, fontWeight: 'bold' }}>
              {currentPrice} ج.م
            </h2>
            {product.discount > 0 && selectedSize === 100 && (
               <span style={{ backgroundColor: '#ff4d4d', color: 'white', padding: '2px 8px', borderRadius: '5px', fontSize: '0.9rem' }}>
                 يوجد خصم إضافي على الـ 100 مل
               </span>
            )}
          </div>
          
          {/* الأزرار */}
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <button onClick={handleAddToCart} style={{ flex: 1, padding: '15px', backgroundColor: '#fff', color: '#d4af37', border: '2px solid #d4af37', borderRadius: '50px', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold' }}>
              🛒 أضف للسلة
            </button>
            <button onClick={() => window.open(`https://wa.me/201002410037?text=أريد طلب ${product.name} حجم ${selectedSize} مل`, '_blank')} style={{ flex: 1, padding: '15px', backgroundColor: '#000', color: '#d4af37', border: 'none', borderRadius: '50px', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold' }}>
              📱 طلب سريع
            </button>
          </div>
        </div>
      </div>

      {/* ... (باقي أقسام التقييمات والمنتجات المقترحة كما هي في كودك السابق) ... */}
      {/* سأضع هنا فقط نهاية الملف لاستعلام البيانات */}
      
      {/* ... Reviews Section Here ... */}
      
    </div>
  );
}

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] { slug { current } }`;
  const products = await client.fetch(query);
  const paths = products.map((product) => ({ params: { slug: product.slug.current } }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps = async ({ params: { slug } }) => {
  // ✅ نضيف جلب الحقول الجديدة customSizes
  const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]{
    _id, name, description, price, discount, "imageUrl": image.asset->url, slug,
    customSizes
  }`;
  
  const product = await client.fetch(productQuery);

  if (!product) return { props: { error: slug } };

  const reviewsQuery = `*[_type == "review" && product._ref == '${product._id}'] | order(_createdAt desc)`;
  const reviews = await client.fetch(reviewsQuery);

  const relatedQuery = `*[_type == "product" && _id != '${product._id}'] | order(_createdAt desc)[0...4]{
    _id, name, price, discount, slug, "imageUrl": image.asset->url
  }`;
  const relatedProducts = await client.fetch(relatedQuery);

  return { props: { product, reviews, relatedProducts }, revalidate: 1 };
};