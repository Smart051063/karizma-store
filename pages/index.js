import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { client } from '../src/sanity/lib/client';

export default function Home() {
  const [banner, setBanner] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // جلب البنر
    client.fetch(`*[_type == "banner" && isActive == true][0]{title, link, "imageUrl": image.asset->url}`).then(setBanner);
    // جلب المنتجات
    client.fetch(`*[_type == "product"]{_id, name, price, "imageUrl": image.asset->url, slug}`).then(setProducts);
  }, []);

  return (
    <div style={{ minHeight: '100vh', direction: 'rtl', backgroundColor: 'white', fontFamily: 'Arial, sans-serif' }}>
      
      {/* 1️⃣ قسم البنر العلوي */}
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
        height: '70vh', backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
        position: 'relative', color: 'white', textAlign: 'center'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)' }}></div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '10px', color: '#d4af37', fontWeight: 'bold' }}>كاريزما للعطور</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>عطرك.. بصمتك التي لا تُنسى ✨</p>
          <Link href="/oriental"><button style={ctaButtonStyle}>تسوق الآن</button></Link>
        </div>
      </div>

      {/* 3️⃣ تصفح مجموعاتنا (التشكيلة الموسعة بـ 7 أقسام) 🟢 */}
      <div style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h2 style={{ color: '#333', marginBottom: '50px', fontSize: '2rem' }}>تصفح مجموعاتنا</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          
          <CategoryCircle href="/men" emoji="🤵" label="رجالي" />
          <CategoryCircle href="/women" emoji="💃" label="نسائي" />
          <CategoryCircle href="/unisex" emoji="👫" label="جنسين" />
          <CategoryCircle href="/niche" emoji="💎" label="نيش" />
          <CategoryCircle href="/oud" emoji="🪵" label="أعواد" />
          <CategoryCircle href="/gulf" emoji="🕌" label="خليجي" />
          <CategoryCircle href="/musks" emoji="🧴" label="مسكات" /> {/* 👈 القسم الجديد */}

        </div>
      </div>

      {/* 4️⃣ وصلنا حديثاً ✨ (الصور الصغيرة الأنيقة) */}
      <div style={{ padding: '20px 20px 100px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '50px', color: '#333', fontSize: '2rem' }}>وصلنا حديثاً ✨</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
          {products.map((product) => {
            if (!product.slug || !product.slug.current) return null;
            return (
              <Link href={`/product/${product.slug.current}`} key={product._id} style={{ textDecoration: 'none' }}>
                <div style={productCardStyle}>
                  <div style={{ height: '160px', overflow: 'hidden', borderRadius: '12px 12px 0 0' }}>
                     {product.imageUrl && <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                  </div>
                  <div style={{ padding: '12px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1rem', color: '#1a1a1a', margin: '0 0 8px', fontWeight: '600' }}>{product.name}</h3>
                    <p style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '1.1rem' }}>{product.price} جنيه</p>
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

// ✅ 5️⃣ المكون الذي كان مفقوداً وسبب الخطأ الأحمر
function CategoryCircle({ href, emoji, label }) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div style={circleStyle}>
        <span style={{ fontSize: '2rem' }}>{emoji}</span>
        <p style={{ marginTop: '10px', fontWeight: 'bold', color: '#333', fontSize: '0.9rem' }}>{label}</p>
      </div>
    </Link>
  );
}

// --- التنسيقات (Styles) ---
const ctaButtonStyle = { padding: '12px 35px', fontSize: '1.1rem', backgroundColor: '#d4af37', color: 'black', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold' };

const circleStyle = { 
  width: '130px', // تصغير بسيط ليناسب الـ 7 أقسام في سطر واحد
  height: '130px', 
  borderRadius: '50%', 
  backgroundColor: 'white',
  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
  boxShadow: '0 6px 15px rgba(0,0,0,0.06)', border: '1px solid #eee', cursor: 'pointer', transition: '0.3s'
};

const productCardStyle = { 
  width: '180px', backgroundColor: 'white', borderRadius: '12px', 
  boxShadow: '0 5px 15px rgba(0,0,0,0.05)', border: '1px solid #f5f5f5', cursor: 'pointer' 
};