import React, { useState } from 'react';
import { client } from '../../src/sanity/lib/client';
import { useCart } from '../../src/context/CartContext';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

export default function ProductDetails({ product, reviews, relatedProducts, error }) {
  const { onAdd, setShowCart } = useCart();
  
  // حالات التقييم والتحقق
  const [phone, setPhone] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [verifyMessage, setVerifyMessage] = useState('');
  const [reviewForm, setReviewForm] = useState({ name: '', comment: '', rating: 5 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // 1. حالة عدم وجود المنتج
  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', minHeight: '60vh', fontFamily: 'Arial' }}>
        <h1 style={{ color: 'red' }}>عذراً، المنتج غير موجود!</h1>
        <Link href="/shop">
           <button style={{ marginTop: '20px', padding: '15px 30px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer' }}>🏠 العودة للمتجر</button>
        </Link>
      </div>
    );
  }

  // ✅ حساب السعر النهائي أوتوماتيكياً للعرض
  const finalPrice = product.discount 
    ? Math.round(product.price - (product.price * product.discount / 100))
    : product.price;

  const handleAddToCart = () => {
    onAdd(product, 1); // نرسل المنتج للسلة، والسلة ستقوم بالحساب أيضاً
    setShowCart(true);
  };

  // دوال التحقق والتقييم (كما هي)
  const handleVerify = async () => { /* ... نفس الكود السابق ... */ };
  const handleSubmitReview = async (e) => { /* ... نفس الكود السابق ... */ };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff', fontFamily: 'Tajawal, Arial', direction: 'rtl' }}>
      <Head>
        <title>{product.name} | كاريزما</title>
      </Head>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>
        {/* الصورة */}
        <div style={{ flex: '1', minWidth: '300px', position: 'relative', height: '500px', backgroundColor: '#f9f9f9', borderRadius: '20px', overflow: 'hidden', border: '1px solid #eee' }}>
          {product.imageUrl ? (
            <Image src={product.imageUrl} alt={product.name} fill style={{ objectFit: 'contain', padding: '20px' }} />
          ) : (
             <div style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>لا توجد صورة</div>
          )}
        </div>

        {/* التفاصيل */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '15px', color: '#222' }}>{product.name}</h1>
          <p style={{ fontSize: '1.2rem', color: '#666', lineHeight: '1.8', marginBottom: '20px' }}>{product.description}</p>
          
          {/* 🔥 عرض السعر المحسوب (الأصلي والنهائي) 🔥 */}
          <div style={{ marginBottom: '30px' }}>
            {product.discount > 0 ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <h2 style={{ color: '#d4af37', fontSize: '2.5rem', margin: 0 }}>{finalPrice} ج.م</h2>
                <span style={{ color: '#999', fontSize: '1.5rem', textDecoration: 'line-through' }}>{product.price} ج.م</span>
                <span style={{ backgroundColor: '#ff4d4d', color: 'white', padding: '2px 8px', borderRadius: '5px', fontSize: '0.9rem', fontWeight: 'bold' }}>خصم {product.discount}%</span>
              </div>
            ) : (
              <h2 style={{ color: '#d4af37', fontSize: '2.2rem', margin: 0 }}>{product.price} ج.م</h2>
            )}
          </div>
          
          {/* الأزرار */}
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <button onClick={handleAddToCart} style={{ flex: 1, padding: '15px', backgroundColor: '#fff', color: '#d4af37', border: '2px solid #d4af37', borderRadius: '50px', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold' }}>🛒 أضف للسلة</button>
            <button onClick={() => window.open(`https://wa.me/201002410037?text=أريد طلب ${product.name}`, '_blank')} style={{ flex: 1, padding: '15px', backgroundColor: '#000', color: '#d4af37', border: 'none', borderRadius: '50px', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold' }}>📱 طلب سريع</button>
          </div>
        </div>
      </div>

      {/* التقييمات (نفس الكود السابق، اختصرته هنا للتركيز على السعر) */}
      <div style={{ backgroundColor: '#f8f8f8', padding: '60px 20px', marginTop: '40px' }}>
         {/* ... (كود التقييمات كما هو في الملفات السابقة) ... */}
         <p style={{textAlign:'center'}}>... التقييمات ...</p>
      </div>
    </div>
  );
}

// ⚠️ جلب البيانات: لاحظ أننا نطلب discount الآن
export const getStaticPaths = async () => {
  const query = `*[_type == "product"] { slug { current } }`;
  const products = await client.fetch(query);
  const paths = products.map((product) => ({ params: { slug: product.slug.current } }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps = async ({ params: { slug } }) => {
  // ✅ نطلب discount هنا
  const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]{
    _id, name, description, price, discount, "imageUrl": image.asset->url, slug
  }`;
  
  const product = await client.fetch(productQuery);

  if (!product) return { props: { error: slug } };

  // جلب التقييمات والمنتجات المقترحة
  const reviewsQuery = `*[_type == "review" && product._ref == '${product._id}'] | order(_createdAt desc)`;
  const reviews = await client.fetch(reviewsQuery);
  const relatedQuery = `*[_type == "product" && _id != '${product._id}'] | order(_createdAt desc)[0...4]{
    _id, name, price, discount, slug, "imageUrl": image.asset->url
  }`;
  const relatedProducts = await client.fetch(relatedQuery);

  return { props: { product, reviews, relatedProducts }, revalidate: 1 };
};