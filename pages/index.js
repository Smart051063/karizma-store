import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { client } from '../src/sanity/lib/client';

export default function Home() {
  const [banner, setBanner] = useState(null);
  const [products, setProducts] = useState([]); // 👈 استرجعنا مخزن المنتجات

  useEffect(() => {
    // 1. جلب البنر
    const bannerQuery = `*[_type == "banner" && isActive == true][0]{
      title, link, "imageUrl": image.asset->url
    }`;
    client.fetch(bannerQuery).then((data) => setBanner(data));

    // 2. جلب المنتجات (ليعود الموقع ممتلئاً كما كان)
    const productQuery = `*[_type == "product"]{
      _id,
      name,
      price,
      "imageUrl": image.asset->url,
      slug
    }`;
    client.fetch(productQuery).then((data) => setProducts(data));
  }, []);

  return (
    <div style={{ minHeight: '100vh', direction: 'rtl', backgroundColor: 'white' }}>
      
      {/* 1️⃣ قسم البنر (يظهر فقط عند التفعيل) */}
      {banner && (
        <div style={{ backgroundColor: '#f0f0f0', textAlign: 'center' }}>
          <Link href={banner.link || '/search'}>
            <img 
              src={banner.imageUrl} 
              alt={banner.title} 
              style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', cursor: 'pointer' }} 
            />
          </Link>
        </div>
      )}

      {/* 2️⃣ الشاشة الرئيسية (Hero Section) */}
      <div style={{ 
        backgroundImage: 'url("https://images.unsplash.com/photo-1615634260167-c8cdede054de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
        height: '70vh', backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
        position: 'relative', color: 'white', textAlign: 'center'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}></div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '10px', color: '#d4af37' }}>كاريزما للعطور</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>عطرك.. بصمتك التي لا تُنسى ✨</p>
          <Link href="/search"><button style={ctaButtonStyle}>تسوق الآن</button></Link>
        </div>
      </div>

      {/* 3️⃣ الأقسام (الدوائر كما طلبت) 🟢 */}
      <div style={{ padding: '50px 20px', textAlign: 'center' }}>
        <h2 style={{ color: '#333', marginBottom: '40px' }}>الأقسام</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
          
          <Link href="/men" style={{ textDecoration: 'none' }}>
            <div style={circleCardStyle}>
              <span style={{ fontSize: '2.5rem' }}>🤵</span>
              <p style={{ marginTop: '10px', fontWeight: 'bold', color: '#333' }}>رجالي</p>
            </div>
          </Link>

          <Link href="/women" style={{ textDecoration: 'none' }}>
            <div style={circleCardStyle}>
              <span style={{ fontSize: '2.5rem' }}>💃</span>
              <p style={{ marginTop: '10px', fontWeight: 'bold', color: '#333' }}>نسائي</p>
            </div>
          </Link>

          <Link href="/oriental" style={{ textDecoration: 'none' }}>
            <div style={circleCardStyle}>
              <span style={{ fontSize: '2.5rem' }}>🕌</span>
              <p style={{ marginTop: '10px', fontWeight: 'bold', color: '#333' }}>شرقي</p>
            </div>
          </Link>

        </div>
      </div>

      {/* 4️⃣ شبكة المنتجات (التي كانت مفقودة) 🛍️ */}
      <div style={{ padding: '20px 20px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#333' }}>أحدث العطور</h2>
        
        <div style={{ 
          display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' 
        }}>
          {products.map((product) => (
            <Link href={`/product/${product.slug.current}`} key={product._id} style={{ textDecoration: 'none' }}>
              <div style={productCardStyle}>
                <div style={{ height: '250px', overflow: 'hidden', borderRadius: '10px 10px 0 0' }}>
                   {product.imageUrl && (
                     <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                   )}
                </div>
                <div style={{ padding: '15px', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.1rem', color: '#333', margin: '0 0 10px' }}>{product.name}</h3>
                  <p style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '1.2rem' }}>{product.price} جنيه</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}

// --- التنسيقات (Styles) ---

const ctaButtonStyle = {
  padding: '12px 30px', fontSize: '1.1rem', backgroundColor: '#d4af37', color: 'black',
  border: 'none', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold'
};

// تنسيق الدوائر (Circles)
const circleCardStyle = {
  width: '120px', height: '120px', borderRadius: '50%', backgroundColor: '#f9f9f9',
  display: 'flex', flexDirection: 'column', alignItems: '