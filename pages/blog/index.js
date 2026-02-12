import React from 'react';
import { client } from '../src/sanity/lib/client';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

// مكون البانر (يمكنك فصله في ملف خاص إذا أردت)
const HeroBanner = () => (
  <div className="hero-banner-container" style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: '#fff' }}>
    <h2 style={{ color: '#d4af37', fontSize: '2.5rem', marginBottom: '20px' }}>اكتشف عالم كاريزما 🎥</h2>
    <div style={{ position: 'relative', width: '100%', maxWidth: '1000px', margin: '0 auto', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
      {/* هنا الفيديو أو صورة البانر */}
      <img src="/banner.jpg" alt="Karizma Banner" style={{ width: '100%', height: 'auto', display: 'block' }} /> 
      {/* (استبدل src برابط الصورة الفعلي لديك) */}
    </div>
  </div>
);

export default function Home({ products, bannerData, reviews }) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fdfdfd', fontFamily: 'Tajawal, Arial', direction: 'rtl' }}>
      <Head>
        <title>كاريزما للعطور | الصفحة الرئيسية</title>
        <meta name="description" content="أفضل العطور المستوحاة بجودة عالية وثبات ممتاز" />
      </Head>

      <HeroBanner />

      {/* --- قسم المنتجات المميزة --- */}
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h2 style={{ color: '#333', marginBottom: '10px' }}>🔥 العروض والمنتجات المميزة</h2>
        <p style={{ color: '#777', marginBottom: '40px' }}>تصفح أحدث تشكيلة من العطور الفاخرة</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '25px' }}>
          {products?.map((product) => (
            <Link href={`/product/${product.slug.current}`} key={product._id} style={{ textDecoration: 'none' }}>
              <div style={{ width: '220px', backgroundColor: 'white', borderRadius: '15px', padding: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', transition: '0.3s', cursor: 'pointer' }}>
                <div style={{ position: 'relative', height: '180px', marginBottom: '15px' }}>
                  {product.imageUrl && <Image src={product.imageUrl} alt={product.name} fill style={{ objectFit: 'contain' }} />}
                </div>
                <h3 style={{ fontSize: '1.1rem', color: '#333', margin: '0 0 10px 0' }}>{product.name}</h3>
                
                {/* السعر */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                  {product.discount > 0 ? (
                    <>
                      <span style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '1.1rem' }}>
                        {Math.round(product.price - (product.price * product.discount / 100))} ج.م
                      </span>
                      <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '0.9rem' }}>
                        {product.price}
                      </span>
                    </>
                  ) : (
                    <span style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '1.1rem' }}>
                      {product.price} ج.م
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* --- 🔥 قسم "ماذا قال عملاؤنا" (الجديد) --- */}
      <div style={{ backgroundColor: '#fff', padding: '60px 20px', marginTop: '40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ color: '#333', fontSize: '2rem', marginBottom: '40px' }}>⭐ ماذا قال عملاؤنا؟</h2>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
            {reviews?.length > 0 ? (
              reviews.map((review) => (
                <div key={review._id} style={{ 
                    flex: '1 1 300px', maxWidth: '350px', 
                    backgroundColor: '#f9f9f9', padding: '25px', 
                    borderRadius: '15px', textAlign: 'right',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.03)',
                    border: '1px solid #eee'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <h4 style={{ margin: 0, color: '#333' }}>{review.name}</h4>
                    <div style={{ color: '#FFD700' }}>{"★".repeat(review.rating)}</div>
                  </div>
                  <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    "{review.comment}"
                  </p>
                  <div style={{ marginTop: '15px', fontSize: '0.8rem', color: '#999' }}>
                    عن منتج: <span style={{ color: '#d4af37' }}>{review.productName}</span>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: '#777' }}>لا توجد تقييمات حتى الآن. كن أول من يشاركنا رأيه!</p>
            )}
          </div>
          
          <div style={{ marginTop: '40px' }}>
            <Link href="/shop">
              <button style={{ padding: '12px 30px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer' }}>
                تصفح المتجر واكتب رأيك
              </button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}

// ⚠️ جلب البيانات من Sanity
export const getServerSideProps = async () => {
  // 1. جلب المنتجات
  const productQuery = `*[_type == "product"] | order(_createdAt desc) [0...8] {
    _id, name, price, discount, slug, "imageUrl": image.asset->url
  }`;
  const products = await client.fetch(productQuery);

  // 2. جلب آخر 6 تقييمات (مع اسم المنتج المرتبط بها)
  // لاحظ كيف نجلب اسم المنتج المرتبط بالتقييم (product->name)
  const reviewsQuery = `*[_type == "review"] | order(_createdAt desc) [0...6] {
    _id, name, rating, comment, "productName": product->name
  }`;
  const reviews = await client.fetch(reviewsQuery);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData, reviews }
  };
};