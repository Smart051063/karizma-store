import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { client } from '../src/sanity/lib/client';

export default function Home() {
  const [banner, setBanner] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // 1. جلب البنر
    client.fetch(`*[_type == "banner" && isActive == true][0]{title, link, "imageUrl": image.asset->url}`).then(setBanner);
    // 2. جلب المنتجات
    client.fetch(`*[_type == "product"]{_id, name, price, "imageUrl": image.asset->url, slug}`).then(setProducts);
  }, []);

  return (
    <div style={{ minHeight: '100vh', direction: 'rtl', backgroundColor: 'white', fontFamily: 'Arial, sans-serif' }}>
      
      {/* 1️⃣ قسم البنر العلوي الذكي */}
      {banner && (
        <div style={{ backgroundColor: '#fff', textAlign: 'center', borderBottom: '1px solid #eee', boxShadow: '0 4px 8px rgba(0,0,0,0.05)' }}>
          <Link href={banner.link || '/search'}>
            <img src={banner.imageUrl} alt={banner.title} style={{ width: '100%', height: 'auto', maxHeight: '350px', objectFit: 'cover', cursor: 'pointer' }} />
          </Link>
        </div>
      )}

      {/* 2️⃣ الشاشة الرئيسية (Hero Section) */}
      <div style={{ 
        backgroundImage: 'url("https://images.unsplash.com/photo-1615634260167-c8cdede054de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
        height: '60vh', backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
        position: 'relative', color: 'white', textAlign: 'center'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)' }}></div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#d4af37', fontWeight: 'bold' }}>كاريزما للعطور</h1>
          <p style={{ fontSize: '1rem', marginBottom: '20px' }}>عطرك.. بصمتك التي لا تُنسى ✨</p>
          <Link href="/oriental"><button style={ctaButtonStyle}>تسوق الآن</button></Link>
        </div>
      </div>

      {/* 3️⃣ تصفح مجموعاتنا (7 دوائر أنيقة ورشيقة) */}
      <div style={{ padding: '40px 10px', textAlign: 'center' }}>
        <h2 style={{ color: '#333', marginBottom: '30px', fontSize: '1.6rem' }}>تصفح مجموعاتنا</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <CategoryCircle href="/men" emoji="🤵" label="رجالي" />
          <CategoryCircle href="/women" emoji="💃" label="نسائي" />
          <CategoryCircle href="/unisex" emoji="👫" label="جنسين" />
          <CategoryCircle href="/niche" emoji="💎" label="نيش" />
          <CategoryCircle href="/oud" emoji="🪵" label="أعواد" />
          <CategoryCircle href="/gulf" emoji="🕌" label="خليجي" />
          <CategoryCircle href="/musks" emoji="🧴" label="مسكات" />
        </div>
      </div>

      {/* 4️⃣ وصلنا حديثاً (النسخة فائقة الصغر - Micro Mode ✨) */}
      <div style={{ padding: '10px 10px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333', fontSize: '1.6rem' }}>وصلنا حديثاً ✨</h2>
        
        {/* تقليل الفجوة (gap) لأقل درجة لزيادة الانسيابية */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
          {products.map((product) => {
            if (!product.slug || !product.slug.current) return null;
            return (
              <Link href={`/product/${product.slug.current}`} key={product._id} style={{ textDecoration: 'none' }}>
                <div style={productCardStyle}>
                  {/* 👇 ارتفاع الصورة 90 بكسل فقط ليكون "ميني" تماماً */}
                  <div style={{ height: '90px', overflow: 'hidden', borderRadius: '8px 8px 0 0' }}>
                     {product.imageUrl && <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                  </div>
                  <div style={{ padding: '5px', textAlign: 'center' }}>
                    <h3 style={productNameStyle}>{product.name}</h3>
                    <p style={productPriceStyle}>{product.price} ج.م</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ✅ مكون الدوائر (CategoryCircle) مدمج لمنع أخطاء التعريف
function CategoryCircle({ href, emoji, label }) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div style={circleStyle}>
        <span style={{ fontSize: '1.6rem' }}>{emoji}</span>
        <p style={{ marginTop: '5px', fontWeight: 'bold', color: '#333', fontSize: '0.75rem' }}>{label}</p>
      </div>
    </Link>
  );
}

// --- التنسيقات الفائقة الرشاقة (The Ultimate Micro Styles) ---
const ctaButtonStyle = { padding: '10px 25px', fontSize: '0.9rem', backgroundColor: '#d4af37', color: 'black